import {
  Paper,
  Box,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

export default function ChatMessage({ message, isUser }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      {isUser ? (
        <Box
          sx={{
            maxWidth: '90%',
            pt: 0,
            pb: 0,
            pl: 2,
            pr: 2,
            color: theme.palette.primary.contrastText,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 4,
          }}
        >
          <ReactMarkdown>{message}</ReactMarkdown>
        </Box>
      ) : (
        <Paper
          sx={{
            maxWidth: '90%',
            pt: 0,
            pb: 0,
            pl: 2,
            pr: 2,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const codeString = String(children).replace(/\n$/, '');
                return !inline && match ? (
                  <Box sx={{ borderRadius: 4, overflow: 'hidden' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        bgcolor: 'grey.900',
                        color: 'white',
                        p: 1,
                      }}
                    >
                      <Typography variant='body2' sx={{ ml: 1 }}>
                        {match[1].toUpperCase()}
                      </Typography>
                      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                        <IconButton
                          size='small'
                          onClick={() => handleCopy(codeString)}
                          sx={{ color: 'white' }}
                        >
                          {copied ? (
                            <ThumbUpIcon fontSize='small' />
                          ) : (
                            <ContentCopyIcon fontSize='small' />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <SyntaxHighlighter
                      style={materialDark}
                      language={match[1]}
                      PreTag='div'
                      customStyle={{ borderRadius: 0 }}
                      {...props}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </Box>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message}
          </ReactMarkdown>
        </Paper>
      )}
    </Box>
  );
}
