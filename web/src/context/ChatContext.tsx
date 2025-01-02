import { createContext, useContext, ReactNode } from 'react';
import axios from 'axios';

interface CreateChatData {
  topic: string;
}

interface CreateChatHistoryData {
  userId: string;
  chatId: string;
}

interface CreateMessageData {
  chatId: string;
  prompt: string;
  response: string;
  totalTokens: number;
  totalCost?: number;
}

interface ChatContextProps {
  createChat: (data: CreateChatData) => Promise<any>;
  createChatHistory: (data: CreateChatHistoryData) => Promise<any>;
  createMessage: (data: CreateMessageData) => Promise<any>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  if (!apiUrl) {
    throw new Error('REACT_APP_API_URL environment variable is not defined');
  }

  const apiCall = async <T,>(url: string, data: T): Promise<any> => {
    try {
      const response = await axios.post(`${apiUrl}${url}`, data);
      return response.data;
    } catch (error) {
      console.error(`API call failed: ${error}`);
      throw error;
    }
  };

  const createChat = (data: CreateChatData) =>
    apiCall<CreateChatData>('/chat', data);

  const createChatHistory = (data: CreateChatHistoryData) =>
    apiCall<CreateChatHistoryData>('/chatHistory', data);

  const createMessage = async (data: CreateMessageData) => {
    const payload = {
      ...data,
      chatId: data.chatId, // Ensure chatId is part of the payload
    };
    const response = await axios.post(`${apiUrl}/message`, payload);
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
