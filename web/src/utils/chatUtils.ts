import { v4 as uuidv4 } from 'uuid';
import { Message } from '../pages/chat/types';

export const createNewMessage = (content: string): Message => ({
  id: uuidv4(),
  content,
  isUser: true,
});

export const updateMessages = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  combinedMessage: string
) => {
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
        {
          id: uuidv4(),
          content: combinedMessage,
          isUser: false,
        },
      ];
    }
  });
};

export const createEventSource = async (url: string, token: string) => {
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
