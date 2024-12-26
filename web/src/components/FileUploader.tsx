import { useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept: string;
  maxSize?: number; // in bytes
}

export default function FileUploader({
  onFileSelect,
  accept,
  maxSize = 10 * 1024 * 1024,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    if (!file.type.match(accept.replace(/,/g, '|'))) {
      setError('Invalid file type');
      return false;
    }
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / 1024 / 1024}MB`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  return (
    <Box
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      sx={{
        border: 2,
        borderRadius: 2,
        borderStyle: 'dashed',
        borderColor: dragActive ? 'primary.main' : 'divider',
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        bgcolor: dragActive ? 'action.hover' : 'background.paper',
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
      <Typography variant='h6' gutterBottom>
        Drag and drop your file here
      </Typography>
      <Typography color='textSecondary' gutterBottom>
        or
      </Typography>
      <Button variant='contained' component='span'>
        Browse Files
      </Button>
      <Typography variant='caption' display='block' sx={{ mt: 1 }}>
        Supported formats: {accept}
      </Typography>
      {error && (
        <Typography
          color='error'
          variant='caption'
          display='block'
          sx={{ mt: 1 }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
