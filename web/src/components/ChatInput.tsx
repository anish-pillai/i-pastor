import { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { Send } from '@mui/icons-material';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 1,
        p: 2,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type your message...'
        disabled={disabled}
        multiline
        maxRows={4}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
      />
      <IconButton
        type='submit'
        disabled={disabled || !message.trim()}
        color='primary'
      >
        <Send />
      </IconButton>
    </Box>
  );
}
