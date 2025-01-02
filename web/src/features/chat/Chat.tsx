import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, useTheme } from '@mui/material';
import { ChatMessage } from '../../components';
import { Message } from './types';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../../context/ChatContext';
import { useUser } from '../../context/UserContext';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const { createChat, createChatHistory, createMessage } = useChat();
  const { user } = useUser();
  const userId = user?.id;
  const [chatId, setChatId] = useState<string | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!userId) {
      console.error('User not logged in or userId is missing');
      return;
    }

    const newMessage: Message = {
      id: uuidv4(),
      content,
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    try {
      let currentChatId = chatId;

      // Create a chat if none exists
      if (!currentChatId) {
        const chat = await createChat({ topic: 'New Chat' });
        currentChatId = chat.id;
        setChatId(currentChatId);

        // Create chat history for the new chat
        if (currentChatId) {
          await createChatHistory({ chatId: currentChatId, userId });
        }
      }

      // Open an EventSource for real-time chat streaming
      const eventSource = new EventSource(
        `${process.env.REACT_APP_API_URL}/chatStream?prompt=${content}`
      );

      let combinedMessage = '';

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        combinedMessage += data.message;

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

      // Save the user's message
      if (currentChatId) {
        await createMessage({
          chatId: currentChatId,
          prompt: content,
          response: combinedMessage,
        });
      } else {
        console.error('Chat ID is null');
      }

      eventSource.onerror = () => {
        console.error('Error with EventSource');
        eventSource.close();
        setIsLoading(false);
      };

      eventSource.addEventListener('end', () => {
        eventSource.close();
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Failed to send message', error);
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2 }}>
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
              e.preventDefault();
              handleSendMessage(inputValue.trim());
              setInputValue('');
            }
          }}
        />
        <Button
          variant='contained'
          color='primary'
          sx={{ marginLeft: 2 }}
          onClick={() => {
            handleSendMessage(inputValue.trim());
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
