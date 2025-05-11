// Dashboard.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function Dashboard() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>Welcome, Admin</Typography>
        <Typography>Use the top navigation to manage books and borrowers.</Typography>
      </Box>
    </Container>
  );
}
