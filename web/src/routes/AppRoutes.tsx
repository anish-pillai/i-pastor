import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat } from '../pages/chat';
import { Upload } from '../pages/upload';
import { WebSearch } from '../pages/web-search';
import PrivateRoute from '../components/PrivateRoute';
import Profile from '../pages/Profile';
import Layout from '../Layout';
import AuthLayout from '../pages/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Layout>
      <Routes>
        <Route path='/' element={<PrivateRoute element={<Chat />} />} />
        <Route path='/upload' element={<PrivateRoute element={<Upload />} />} />
        <Route
          path='/web-search'
          element={<PrivateRoute element={<WebSearch />} />}
        />
        <Route
          path='/profile'
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Layout>
  ) : (
    <Routes>
      <Route path='/sign-in' element={<AuthLayout />} />
      <Route path='*' element={<Navigate to='/sign-in' />} />
    </Routes>
  );
}
