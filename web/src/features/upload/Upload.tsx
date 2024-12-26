import { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { FileUploader } from '../../components';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    console.log('Selected file:', selectedFile);
  };

  return (
    <Container maxWidth='md'>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant='h5' gutterBottom>
          Upload Document
        </Typography>
        <Typography color='textSecondary' paragraph>
          Upload PDF, Word Document, or PowerPoint files for analysis
        </Typography>
        <FileUploader
          onFileSelect={handleFileSelect}
          accept='.pdf,.doc,.docx,.ppt,.pptx'
          maxSize={10 * 1024 * 1024}
        />
      </Paper>
    </Container>
  );
}
