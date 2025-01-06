import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat } from '../features/chat';
import { Upload } from '../features/upload';
import { WebSearch } from '../features/web-search';
import SignIn from '../features/auth/SignIn';
import SignUp from '../features/auth/SignUp';
import PrivateRoute from '../components/PrivateRoute';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />

      <Route path='/' element={<PrivateRoute element={<Chat />} />} />
      <Route path='/upload' element={<PrivateRoute element={<Upload />} />} />
      <Route
        path='/web-search'
        element={<PrivateRoute element={<WebSearch />} />}
      />
      <Route path='/profile' element={<PrivateRoute element={<Profile />} />} />

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}
