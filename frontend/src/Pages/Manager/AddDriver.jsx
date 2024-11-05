import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

const AddDriver = () => {
  const [driverData, setDriverData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    driver_type: 'In_City', // Default value for dropdown
  });
  const [idAgency, setIdAgency] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');

  // Fetch the id_agency for the manager
  useEffect(() => {
    const fetchManagerAgencyId = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URI}/manager/get/id/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIdAgency(response.data.id_agency);
        console.log(response.data.id_agency);
      } catch (error) {
        console.error("Error fetching manager's agency ID:", error);
      }
    };

    if (userId && token) fetchManagerAgencyId();
  }, [userId, token]);

  // Handle input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();

    const driverPayload = {
      ...driverData,
      agency: { id_agency: idAgency },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/driver/save`,
        driverPayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      alert(response.data);
    } catch (error) {
      console.error('Error saving driver:', error);
      alert('Failed to add driver.');
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
        Add Driver
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label='First Name'
          name='first_name'
          value={driverData.first_name}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        />

        <TextField
          label='Last Name'
          name='last_name'
          value={driverData.last_name}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        />

        <TextField
          label='Email'
          name='email'
          value={driverData.email}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        />

        <TextField
          label='Password'
          name='password'
          type='password'
          value={driverData.password}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        />

        {/* Dropdown for driver type */}
        <TextField
          select
          label='Driver Type'
          name='driver_type'
          value={driverData.driver_type}
          onChange={handleInputChange}
          fullWidth
          variant='outlined'
          margin='normal'
        >
          <MenuItem value='In_City'>In City</MenuItem>
          <MenuItem value='Inter_agency'>Inter Agency</MenuItem>
        </TextField>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 3 }}
          disabled={!idAgency} // Disable button if idAgency hasn't loaded
        >
          Add Driver
        </Button>
      </form>
    </Box>
  );
};

export default AddDriver;
