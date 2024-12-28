import { useState } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const theme = useTheme();

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
        backgroundColor: theme.palette.background.paper, // Adjust background color for dark mode
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
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: theme.palette.background.default, // Adjust input background color for dark mode
            color: theme.palette.text.primary, // Adjust text color for dark mode
          },
          '& .MuiOutlinedInput-input': {
            color: theme.palette.text.primary, // Ensure text color is visible in dark mode
          },
          '& .MuiInputBase-input::placeholder': {
            color: theme.palette.text.secondary, // Ensure placeholder text color is visible in dark mode
            opacity: 1, // Override default opacity
          },
        }}
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
