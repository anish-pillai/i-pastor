import { Routes, Route } from 'react-router-dom';
import { Chat } from '../features/chat';
import { Upload } from '../features/upload';
import { WebSearch } from '../features/web-search';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/web-search" element={<WebSearch />} />
    </Routes>
  );
}