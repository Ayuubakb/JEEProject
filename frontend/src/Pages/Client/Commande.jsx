import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';

const cities = ['tanger', 'tetouan', 'rabat', 'casablanca', 'fes', 'marrakech', 'agadir'];

const Commande = () => {
  const [clientCity, setClientCity] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientResponse = await axios.get(
          `${process.env.REACT_APP_SERVER_URI}/client/get/id/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClientCity(clientResponse.data.city);
        setBalance(clientResponse.data.balance); // Set initial balance
      } catch (error) {
        console.error("Error fetching client's data:", error);
      }
    };

    if (userId && token) fetchClientData();
  }, [userId, token]);

  const [orderData, setOrderData] = useState({
    orderType: 'Normal',
    weight: '',
    receiver: {
      fullname: '',
      email: '',
      city: '',
      phone: '',
      address: '',
    },
  });
  const [price, setPrice] = useState(0);

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name in orderData.receiver) {
      setOrderData({
        ...orderData,
        receiver: { ...orderData.receiver, [name]: value },
      });
    } else {
      setOrderData({ ...orderData, [name]: value });
    }
  };

  const calculatePrice = () => {
    const weight = parseFloat(orderData.weight) || 0;
    const receiverCity = orderData.receiver.city;

    if (weight > 0 && receiverCity) {
      const pricePerKg = receiverCity === clientCity ? 15.0 : 50.0;
      let basePrice = weight * pricePerKg;
      if (orderData.orderType === 'Express') {
        basePrice += 50.0;
      }
      setPrice(basePrice);
    } else {
      setPrice(0);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [orderData.weight, orderData.receiver.city, orderData.orderType]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (price > balance) {
      alert('Insufficient balance for purchase');
      return;
    }

    setOpenConfirm(true); // Show confirmation dialog
  };

  const confirmOrder = async () => {
    const clientId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');
    const orderPayload = {
      ...orderData,
      client: { id_user: clientId },
      priority: 0,
      receiver: { ...orderData.receiver },
    };

    try {
      const existingReceiverResponse = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/receiver/get/mail/${orderData.receiver.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let receiverId;
      if (existingReceiverResponse.data && existingReceiverResponse.data.id_receiver) {
        receiverId = existingReceiverResponse.data.id_receiver;
        await axios.put(
          `${process.env.REACT_APP_SERVER_URI}/receiver/update/${receiverId}`,
          orderData.receiver,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        const receiverResponse = await axios.post(
          `${process.env.REACT_APP_SERVER_URI}/receiver/save`,
          orderData.receiver,
          {
            headers: { Authorization: `Bearer ${token}` },
            'Content-Type': 'application/json',
          }
        );
        receiverId = receiverResponse.data;
      }

      orderPayload.receiver.id_receiver = receiverId;
      await axios.post(`${process.env.REACT_APP_SERVER_URI}/order/save`, orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Initiate transaction after order is successfully saved
      await axios.post(`${process.env.REACT_APP_SERVER_URI}/transactions/save`, null, {
        params: {
          amount: price,
          clientId: clientId,
          type: 'Purchase',
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Order and transaction completed successfully');
      setOpenConfirm(false);
      window.location.reload();
    } catch (error) {
      console.error('Error submitting order or transaction:', error);
    }
  };

  return (
    <Box
      sx={{
        padding: '40px',
        margin: '60px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant='h4'
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Commande
      </Typography>
      <Typography
        variant='h5'
        color='primary'
      >
        Estimated Price: {price.toFixed(2)} MAD
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          select
          label='Order Type'
          name='orderType'
          value={orderData.orderType}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        >
          <MenuItem value='Normal'>Normal</MenuItem>
          <MenuItem value='Express'>Express</MenuItem>
        </TextField>

        <TextField
          label='Weight (kg)'
          name='weight'
          type='number'
          value={orderData.weight}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        />

        <Typography
          variant='h6'
          sx={{ mt: 2 }}
        >
          Receiver Information
        </Typography>

        <TextField
          label='Full Name'
          name='fullname'
          value={orderData.receiver.fullname}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        />

        <TextField
          label='Email'
          name='email'
          type='email'
          value={orderData.receiver.email}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        />

        <TextField
          select
          label='City'
          name='city'
          value={orderData.receiver.city}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        >
          {cities.map(city => (
            <MenuItem
              key={city}
              value={city}
            >
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label='Phone'
          name='phone'
          value={orderData.receiver.phone}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        />

        <TextField
          label='Address'
          name='address'
          value={orderData.receiver.address}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 3 }}
        >
          Submit Order
        </Button>
      </form>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          Are you sure you want to proceed with this order for {price.toFixed(2)} MAD?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenConfirm(false)}
            color='secondary'
          >
            Cancel
          </Button>
          <Button
            onClick={confirmOrder}
            color='primary'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Commande;
