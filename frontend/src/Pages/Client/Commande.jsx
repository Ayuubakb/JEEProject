import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const Commande = () => {
  const [orderData, setOrderData] = useState({
    orderType: '',
    priority: '',
    weight: '',
    receiverId: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const clientId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/order/save`,
        {
          ...orderData,
          client: { id_user: clientId },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setResponseMessage(`Order created successfully! Order ID: ${response.data}`);
    } catch (error) {
      console.error('Error creating order', error);
      setResponseMessage('Failed to create order.');
    }
  };

  return (
    <Box sx={{ padding: '20px', marginTop: '64px' }}>
      <Typography
        variant='h4'
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Commande
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Order Type'
          name='orderType'
          value={orderData.orderType}
          onChange={handleInputChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Priority'
          name='priority'
          value={orderData.priority}
          onChange={handleInputChange}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Weight'
          name='weight'
          value={orderData.weight}
          onChange={handleInputChange}
          type='number'
          fullWidth
          margin='normal'
        />
        <TextField
          label='Receiver ID'
          name='receiverId'
          value={orderData.receiverId}
          onChange={handleInputChange}
          fullWidth
          margin='normal'
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
        >
          Submit Order
        </Button>
      </form>
      {responseMessage && (
        <Typography
          variant='body1'
          sx={{ mt: 2, color: 'green' }}
        >
          {responseMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Commande;
