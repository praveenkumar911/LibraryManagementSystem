import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Box, Typography, Card, CardContent, Grid, Divider, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books');
      setBooks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddBook = async () => {
    try {
      await axios.post('http://localhost:8080/books', { 
        title, author, status, isbn, publishedDate, category, description, price, quantity 
      });
      fetchBooks();
      resetForm();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditBook = (id) => {
    const book = books.find((book) => book.id === id);
    setTitle(book.title);
    setAuthor(book.author);
    setStatus(book.status);
    setIsbn(book.isbn);
    setPublishedDate(book.publishedDate);
    setCategory(book.category);
    setDescription(book.description);
    setPrice(book.price);
    setQuantity(book.quantity);
    setEditing(id);
    setOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/books/${editing}`, { 
        title, author, status, isbn, publishedDate, category, description, price, quantity 
      });
      fetchBooks();
      resetForm();
      setEditing(null);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setStatus('');
    setIsbn('');
    setPublishedDate('');
    setCategory('');
    setDescription('');
    setPrice('');
    setQuantity('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date to "MM/DD/YYYY"
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Books Management
      </Typography>
      <Button onClick={() => setOpen(true)} variant="contained" sx={{ marginBottom: '20px' }}>
        Add Book
      </Button>

      {/* Dialog for Adding/Editing Book */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{editing ? 'Edit Book' : 'Submit Book'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Published Date"
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={editing ? handleSaveEdit : handleAddBook} variant="contained">
            {editing ? 'Save Changes' : 'Submit Book'}
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ padding: '20px', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body1"><strong>Author:</strong> {book.author}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {book.status}</Typography>
                <Typography variant="body1"><strong>ISBN:</strong> {book.isbn}</Typography>
                <Typography variant="body1"><strong>Published Date:</strong> {formatDate(book.publishedDate)}</Typography>
                <Typography variant="body1"><strong>Category:</strong> {book.category}</Typography>
                <Typography variant="body1"><strong>Description:</strong> {book.description}</Typography>
                <Typography variant="body1"><strong>Price:</strong> ${book.price}</Typography>
                <Typography variant="body1"><strong>Quantity:</strong> {book.quantity}</Typography>
                <Divider sx={{ margin: '10px 0' }} />
                <Button onClick={() => handleEditBook(book.id)} variant="outlined" sx={{ marginRight: '10px' }}>
                  Edit
                </Button>
                <Button onClick={() => handleDeleteBook(book.id)} variant="outlined" color="error">
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
