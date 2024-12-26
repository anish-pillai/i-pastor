import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchInputProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
}

export default function SearchInput({
  onSearch,
  disabled = false,
}: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Enter URL or search query...'
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                type='submit'
                disabled={disabled || !query.trim()}
                color='primary'
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
