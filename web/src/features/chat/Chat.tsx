import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, useTheme } from '@mui/material';
import { ChatMessage } from '../../components';
import { Message } from './types';
import { v4 as uuidv4 } from 'uuid';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: uuidv4(), // Use uuid to generate unique ID
      content,
      isUser: true,
    };

    // Add the user's message to the state
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    const eventSource = new EventSource(
      `http://localhost:4500/api/chatStream?prompt=${content}`
    );

    let combinedMessage = '';

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      combinedMessage += data.message;

      // Update the state with the combined message
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && !lastMessage.isUser) {
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, content: combinedMessage },
          ];
        } else {
          return [
            ...prev,
            { id: uuidv4(), content: combinedMessage, isUser: false },
          ];
        }
      });
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsLoading(false);
    };

    eventSource.onopen = () => {
      setIsLoading(false);
    };

    eventSource.addEventListener('end', () => {
      eventSource.close();
      setIsLoading(false);
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 16 }}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isUser={message.isUser}
          />
        ))}
        <div ref={chatEndRef} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          padding: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          position: 'sticky',
          bottom: 0,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <TextField
          variant='outlined'
          placeholder='Type your message...'
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputValue.trim()) {
              e.preventDefault(); // Prevent default form submission
              handleSendMessage(inputValue);
              setInputValue('');
            }
          }}
        />
        <Button
          variant='contained'
          color='primary'
          sx={{ marginLeft: 2 }}
          onClick={() => {
            handleSendMessage(inputValue);
            setInputValue('');
          }}
          disabled={isLoading || !inputValue.trim()}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
