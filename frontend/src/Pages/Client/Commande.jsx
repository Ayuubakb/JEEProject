import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, MenuItem, Button } from '@mui/material';
import axios from 'axios';

const cities = ['tanger', 'tetouan', 'rabat', 'casablanca', 'fes', 'marrakech', 'agadir'];

const Commande = () => {
  const [clientCity, setClientCity] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchClientCity = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/client/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClientCity(response.data.agency.city); // Assuming the agency object has a city field
      } catch (error) {
        console.error("Error fetching client's city:", error);
      }
    };

    if (userId && token) fetchClientCity();
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

  // Calculate price based on weight, cities, and order type
  const calculatePrice = () => {
    const weight = parseFloat(orderData.weight) || 0;
    const receiverCity = orderData.receiver.city;

    if (weight > 0 && receiverCity) {
      const pricePerKg = receiverCity === clientCity ? 15.0 : 50.0;
      let basePrice = weight * pricePerKg;

      // Add 50 if order type is Express
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
    const clientId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');

    const orderPayload = {
      ...orderData,
      client: { id_user: clientId },
      priority: 0,
      receiver: {
        ...orderData.receiver,
      },
    };

    try {
      const receiverResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/receiver/save`,
        orderData.receiver,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Receiver submitted successfully');

      orderPayload.receiver.id_receiver = receiverResponse.data;

      await axios.post(`${process.env.REACT_APP_SERVER_URI}/order/save`, orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Order submitted successfully');
    } catch (error) {
      console.error('Error submitting order:', error);
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

      {/* Live price display */}
      <Typography
        variant='h6'
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
    </Box>
  );
};

export default Commande;