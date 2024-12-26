import { Paper, Typography, Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface SearchResultsProps {
  results: string | null;
  isLoading: boolean;
}

export default function SearchResults({
  results,
  isLoading,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography>Loading results...</Typography>
      </Box>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <ReactMarkdown>{results}</ReactMarkdown>
    </Paper>
  );
}
