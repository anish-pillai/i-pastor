import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { ChatMessage } from '../../components';
import { Message } from './types';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm a placeholder response. The backend integration is pending.",
        isUser: false,
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1000);
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
      </Box>
      <Box
        sx={{
          display: 'flex',
          padding: 2,
          borderTop: '1px solid #ccc',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
        }}
      >
        <TextField
          variant='outlined'
          placeholder='Type your message...'
          fullWidth
        />
        <Button
          variant='contained'
          color='primary'
          sx={{ marginLeft: 2 }}
          onClick={() => handleSendMessage('Hello!')}
          disabled={isLoading}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
