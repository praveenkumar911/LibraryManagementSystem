import React, { useState, useEffect } from 'react';
import { Container, Button, TextField, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogTitle, TableContainer, TableSortLabel, TablePagination, Paper } from '@mui/material';
import axios from 'axios';

export default function Borrowers() {
  const [borrowers, setBorrowers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [membershipDate, setMembershipDate] = useState('');
  const [editing, setEditing] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const fetchBorrowers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/borrowers');
      setBorrowers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenDialog = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setMembershipDate('');
    setEditing(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddBorrower = async () => {
    try {
      const newBorrower = {
        name,
        email,
        phone,
        address,
        membershipDate,
      };

      await axios.post('http://localhost:8080/borrowers', newBorrower);
      fetchBorrowers();
      handleCloseDialog();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditBorrower = (id) => {
    const borrower = borrowers.find((borrower) => borrower.id === id);
    setName(borrower.name);
    setEmail(borrower.email);
    setPhone(borrower.phone);
    setAddress(borrower.address);
    setMembershipDate(borrower.membershipDate);
    setEditing(id);
    setOpenDialog(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedBorrower = {
        name,
        email,
        phone,
        address,
        membershipDate,
      };

      await axios.put(`http://localhost:8080/borrowers/${editing}`, updatedBorrower);
      fetchBorrowers();
      handleCloseDialog();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBorrower = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/borrowers/${id}`);
      fetchBorrowers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4">Borrowers Management</Typography>
      <Button variant="contained" onClick={handleOpenDialog} sx={{ margin: '20px 0' }}>
        Add Borrower
      </Button>

      {/* Borrowers Table with Pagination and Sorting */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel> Name </TableSortLabel>
              </TableCell>
              <TableCell> Email </TableCell>
              <TableCell> Phone </TableCell>
              <TableCell> Address </TableCell>
              <TableCell> Membership Date </TableCell>
              <TableCell> Actions </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrowers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((borrower) => (
                <TableRow key={borrower.id}>
                  <TableCell>{borrower.name}</TableCell>
                  <TableCell>{borrower.email}</TableCell>
                  <TableCell>{borrower.phone}</TableCell>
                  <TableCell>{borrower.address}</TableCell>
                  <TableCell>{borrower.membershipDate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditBorrower(borrower.id)}>Edit</Button>
                    <Button onClick={() => handleDeleteBorrower(borrower.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={borrowers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for Add/Edit Borrower */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editing ? 'Edit Borrower' : 'submit borrower'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              label="Membership Date"
              type="date"
              value={membershipDate}
              onChange={(e) => setMembershipDate(e.target.value)}
              sx={{ marginBottom: '10px' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={editing ? handleSaveEdit : handleAddBorrower}
            color="primary"
            variant="contained"
          >
            {editing ? 'Save Changes' : 'Submit Borrower'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
