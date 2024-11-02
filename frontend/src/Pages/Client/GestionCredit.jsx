import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const GestionCredits = () => {
  const [amount, setAmount] = useState('');

  const handleBalanceUpdate = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken'); // Retrieve the token

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URI}/client/update/${userId}/${amount}`,
        {}, // No body content for this PUT request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to headers
          },
        }
      );
      alert(response.data); // Alert success message
    } catch (error) {
      alert('Error updating balance');
    }
  };

  return (
    <Box sx={{ padding: '20px', marginTop: '64px' }}>
      <Typography
        variant='h4'
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Gestion des Crédits
      </Typography>
      <TextField
        label='Montant à ajouter'
        variant='outlined'
        fullWidth
        value={amount}
        onChange={e => setAmount(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant='contained'
        color='primary'
        onClick={handleBalanceUpdate}
      >
        Ajouter au solde
      </Button>
    </Box>
  );
};

export default GestionCredits;
