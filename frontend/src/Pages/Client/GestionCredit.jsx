import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, MenuItem, Select } from '@mui/material';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';

import axios from 'axios';

const GestionCredits = () => {
  const [amount, setAmount] = useState('');
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedBankDetails, setSelectedBankDetails] = useState(null);
  const [newBank, setNewBank] = useState({
    cardnum: '',
    cvv: '',
    expiry_y: '',
    expiry_m: '',
    name: '',
    address: '',
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/bank/get/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        setBanks(response.data);
      })
      .catch(error => console.error('Error fetching bank records:', error));
  }, [userId, token]);

  useEffect(() => {
    if (selectedBank) {
      const bank = banks.find(b => b.id_bank === selectedBank);
      setSelectedBankDetails(bank);
    } else {
      setSelectedBankDetails(null);
    }
  }, [selectedBank, banks]);

  const handleBalanceUpdate = async () => {
    if (selectedBankDetails) {
      const newBalance = selectedBankDetails.balance - amount;
      if (newBalance < 0) {
        alert('Insufficient funds in the selected bank account.');
        return;
      }

      try {
        await axios.put(
          `${process.env.REACT_APP_SERVER_URI}/client/update/${userId}/${amount}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await axios.put(
          `${process.env.REACT_APP_SERVER_URI}/bank/update/${selectedBank}/${newBalance}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert('Balance updated');
        window.location.reload();
      } catch (error) {
        alert('Error updating balance');
      }
    }
  };

  const handleAddBank = async () => {
    const { cardnum, cvv, expiry_y, expiry_m, name, address } = newBank;

    // Card number validation (exactly 16 digits)
    if (!/^\d{16}$/.test(cardnum) || parseInt(cardnum) < 0) {
      alert('Card number must be exactly 16 digits and cannot be negative.');
      return;
    }

    // CVV validation (exactly 3 digits)
    if (!/^\d{3}$/.test(cvv) || parseInt(cvv) < 0) {
      alert('CVV must be exactly 3 digits and cannot be negative.');
      return;
    }

    // Expiry year validation (exactly 4 digits)
    if (!/^\d{4}$/.test(expiry_y) || parseInt(expiry_y) < 0) {
      alert('Expiry year must be exactly 4 digits and cannot be negative.');
      return;
    }

    // Expiry month validation (1 or 2 digits, between 1 and 12)
    if (!/^(0?[1-9]|1[0-2])$/.test(expiry_m) || parseInt(expiry_m) < 0) {
      alert('Expiry month must be between 1 and 12 and cannot be negative.');
      return;
    }

    try {
      const payload = {
        user: {
          id_user: userId,
        },
        name, // Add the bank name from newBank
        address, // Add the address from newBank
        cardnum: parseInt(cardnum), // Ensure cardnum is an integer
        cvv: parseInt(cvv), // Ensure cvv is an integer
        expiry_y: parseInt(expiry_y), // Ensure expiry year is an integer
        expiry_m: parseInt(expiry_m), // Ensure expiry month is an integer
        balance: 5000.0, // Set the initial balance as specified
      };

      await axios.post(`${process.env.REACT_APP_SERVER_URI}/bank/save`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Card added successfully');
      window.location.reload();
    } catch (error) {
      console.log({ ...newBank, id_user: userId });
      alert('Error adding card');
    }
  };

  return (
    <Box sx={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px' }}>
      <Typography
        variant='h4'
        sx={{ mb: 3 }}
      >
        Gestion des Crédits
      </Typography>
      {/* Bank Selection */}
      <Select
        fullWidth
        value={selectedBank}
        onChange={e => setSelectedBank(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem
          value=''
          disabled
        >
          Choose a bank account
        </MenuItem>
        {banks.map(bank => (
          <MenuItem
            key={bank.id_bank}
            value={bank.id_bank}
          >
            {bank.name} - {bank.cardnum} (Balance: {bank.balance})
          </MenuItem>
        ))}
      </Select>
      {/* Charge Amount */}
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
      {/* Add New Bank Form */}
      <Typography
        variant='h6'
        sx={{ mt: 4 }}
      >
        Add a New Bank
      </Typography>
      <TextField
        label='Name'
        fullWidth
        required
        onChange={e => setNewBank({ ...newBank, name: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label='Address'
        fullWidth
        required
        onChange={e => setNewBank({ ...newBank, address: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label='Card Number'
        fullWidth
        onChange={e => setNewBank({ ...newBank, cardnum: e.target.value })}
        required
        autoComplete='cc-number'
        sx={{ mb: 2 }}
      />
      <TextField
        label='CVV'
        fullWidth
        onChange={e => setNewBank({ ...newBank, cvv: e.target.value })}
        required
        autoComplete='cc-cvv'
        sx={{ mb: 2 }}
      />
      <TextField
        label='Expiry Year'
        fullWidth
        onChange={e => setNewBank({ ...newBank, expiry_y: e.target.value })}
        type='number'
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label='Expiry Month'
        fullWidth
        onChange={e => setNewBank({ ...newBank, expiry_m: e.target.value })}
        type='number'
        required
        sx={{ mb: 2 }}
      />

      <Button
        variant='contained'
        color='secondary'
        onClick={handleAddBank}
      >
        Add Bank
      </Button>
    </Box>
  );
};

export default GestionCredits;
