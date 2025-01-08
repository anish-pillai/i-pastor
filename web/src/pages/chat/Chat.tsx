import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, useTheme } from '@mui/material';
import { ChatMessage } from '../../components';
import { Message } from './types';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const { createChat, createChatHistory, createMessage } = useChat();
  const [chatId, setChatId] = useState<string | null>(null);
  const { isAuthenticated, userInfo, authToken } = useAuth();
  const { id: userId } = userInfo || {};

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }

    const newMessage = {
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
        const chat = await createChat({ title: 'New Chat' });
        currentChatId = chat.id;
        setChatId(currentChatId);

        // Create chat history for the new chat
        if (currentChatId) {
          await createChatHistory({ chatId: currentChatId, userId });
        }
      }

      if (!authToken) {
        console.error('Auth token is missing');
        return;
      }

      // Open an EventSource for real-time chat streaming
      const reader = await createEventSource(
        `${process.env.REACT_APP_API_URL}/chatStream?prompt=${content}`,
        authToken
      );

      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let combinedMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let boundary = buffer.indexOf('\n\n');
        while (boundary !== -1) {
          const eventString = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          boundary = buffer.indexOf('\n\n');

          try {
            // Strip out the "data:" and "event:" prefixes
            const cleanedEventString = eventString
              .replace(/^data: /, '')
              .replace(/^event: /, '');

            // Check if the cleaned string is valid JSON
            if (
              cleanedEventString.trim().startsWith('{') &&
              cleanedEventString.trim().endsWith('}')
            ) {
              const event = JSON.parse(cleanedEventString);
              combinedMessage += event.message;

              const updatedCombinedMessage = combinedMessage;
              setMessages((prev) => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage && !lastMessage.isUser) {
                  return [
                    ...prev.slice(0, -1),
                    { ...lastMessage, content: updatedCombinedMessage },
                  ];
                } else {
                  return [
                    ...prev,
                    {
                      id: uuidv4(),
                      content: updatedCombinedMessage,
                      isUser: false,
                    },
                  ];
                }
              });
            } else {
              console.warn('Received non-JSON data:', cleanedEventString);
            }
          } catch (error) {
            console.error('Failed to parse event data', error);
          }
        }
      }

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

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to send message', error);
      setIsLoading(false);
    }
  };

  const createEventSource = async (url: string, token: string) => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }
    return response.body.getReader();
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
