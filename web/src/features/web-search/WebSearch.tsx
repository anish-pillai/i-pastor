import { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { SearchInput, SearchResults } from '../../components';

export default function WebSearch() {
  const [results, setResults] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setResults(
        '# Search Results\n\nThis is a placeholder for the search results. Backend integration is pending.'
      );
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Container maxWidth='md'>
      <Typography variant='h5' gutterBottom sx={{ mt: 4 }}>
        Web Search
      </Typography>
      <Typography color='textSecondary' paragraph>
        Enter a URL or search query to analyze web content
      </Typography>
      <SearchInput onSearch={handleSearch} disabled={isLoading} />
      <SearchResults results={results} isLoading={isLoading} />
    </Container>
  );
}
