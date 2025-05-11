// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Books from './components/Books';
import Borrowers from './components/Borrowers';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

// Redirect to dashboard if already logged in
function RedirectIfLoggedIn({ children }) {
  const isLoggedIn = localStorage.getItem('loginStatus') === 'Login successful';
  return isLoggedIn ? <Navigate to="/dashboard" /> : children;
}

// Protect routes from unauthenticated access
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('loginStatus') === 'Login successful';
  return isLoggedIn ? children : <Navigate to="/" />;
}

// Common Layout with Navigation Bar
function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loginStatus');
    navigate('/');
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            Library System
          </Typography>
          <Box>
            <Button color="inherit" onClick={() => navigate('/books')}>Books</Button>
            <Button color="inherit" onClick={() => navigate('/borrowers')}>Borrowers</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2 }}>
        {children}
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <RedirectIfLoggedIn>
            <Login />
          </RedirectIfLoggedIn>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/books" element={
          <ProtectedRoute>
            <Layout>
              <Books />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/borrowers" element={
          <ProtectedRoute>
            <Layout>
              <Borrowers />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
