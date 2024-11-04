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
    const { cardnum, cvv, expiry_y, expiry_m } = newBank;

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
      await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/bank/save`,
        { ...newBank, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Card added successfully');
      window.location.reload();
    } catch (error) {
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
        onChange={e => setNewBank({ ...newBank, name: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label='Address'
        fullWidth
        onChange={e => setNewBank({ ...newBank, address: e.target.value })}
        sx={{ mb: 2 }}
      />
      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor='card-number'
          style={{ display: 'block', marginBottom: '8px' }}
        >
          Card Number
        </label>
        <input
          id='card-number'
          onChange={e => setNewBank({ ...newBank, cardnum: e.target.value })}
          type='text'
          maxLength={16}
          minLength={16}
          pattern='\\d{16}' // Ensures only digits
          required
          autoComplete='cc-number'
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor='cvv'
          style={{ display: 'block', marginBottom: '8px' }}
        >
          CVV
        </label>
        <input
          id='cvv'
          onChange={e => setNewBank({ ...newBank, cvv: e.target.value })}
          type='text'
          maxLength={3}
          minLength={3}
          pattern='\\d{3}' // Ensures only digits
          required
          autoComplete='cc-cvv'
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor='expiry-year'
          style={{ display: 'block', marginBottom: '8px' }}
        >
          Expiry Year
        </label>
        <input
          id='expiry-year'
          onChange={e => setNewBank({ ...newBank, expiry_y: e.target.value })}
          type='number'
          max={9999}
          min={1000}
          maxLength={4}
          minLength={4}
          pattern='\\d{4}' // Ensures only digits
          required
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label
          htmlFor='expiry-month'
          style={{ display: 'block', marginBottom: '8px' }}
        >
          Expiry Month
        </label>
        <input
          id='expiry-month'
          onChange={e => setNewBank({ ...newBank, expiry_m: e.target.value })}
          type='number'
          max={12}
          min={1}
          maxLength={2}
          minLength={1}
          pattern='^(0[1-9]|1[0-2])$' // Ensures valid month format
          required
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

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
