import React, { createContext, useContext, ReactNode } from 'react';
import axios from 'axios';

interface ChatContextProps {
  createChat: (data: any) => Promise<any>;
  createChatHistory: (data: any) => Promise<any>;
  createMessage: (data: any) => Promise<any>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const createChat = async (data: any) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/chat`,
      data
    );
    return response.data;
  };

  const createChatHistory = async (data: any) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/chatHistory`,
      data
    );
    return response.data;
  };

  const createMessage = async (data: any) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/message`,
      data
    );
    return response.data;
  };

  return (
    <ChatContext.Provider
      value={{ createChat, createChatHistory, createMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
