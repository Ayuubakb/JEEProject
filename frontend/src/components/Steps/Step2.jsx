import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const Step2 = ({ formData, handleInputChange, prevStep, nextStep }) => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get(`/agency/get`);
        setAgencies(response.data);
      } catch (error) {
        console.error('Error fetching agencies', error);
      }
    };
    fetchAgencies();
  });

  return (
    <Grid
      container
      spacing={3}
      sx={{ padding: 2 }}
    >
      <Grid
        item
        xs={12}
      >
        <Typography
          variant='h6'
          align='center'
          sx={{ marginBottom: 2, color: 'green' }}
        >
          Informations sur l'entreprise
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          fullWidth
          label="Nom de l'entreprise"
          name='companyName'
          value={formData.companyName}
          onChange={handleInputChange}
          variant='outlined'
          margin='normal'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <BusinessIcon color='action' />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          fullWidth
          label='Adresse'
          name='address'
          value={formData.address}
          onChange={handleInputChange}
          variant='outlined'
          margin='normal'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <HomeIcon color='action' />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Dropdown for selecting agency */}
      <Grid
        item
        xs={12}
      >
        <FormControl
          fullWidth
          variant='outlined'
          margin='normal'
        >
          <InputLabel>Agence</InputLabel>
          <Select
            label='Agence'
            name='agencyId'
            value={formData.agencyId || ''} // Ensure agencyId is part of formData
            onChange={handleInputChange}
          >
            {agencies.map(agency => (
              <MenuItem
                key={agency.id}
                value={agency.id}
              >
                {agency.city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid
        item
        xs={12}
        container
        justifyContent='space-between'
        alignItems='center'
      >
        <Button
          variant='outlined'
          color='secondary'
          onClick={prevStep}
          sx={{
            width: '45%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            ':hover': {
              backgroundColor: 'rgba(0, 128, 0, 0.1)',
            },
          }}
          startIcon={<ArrowBackIcon />}
        >
          Précédent
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={nextStep}
          sx={{
            width: '45%',
            backgroundColor: 'green',
            borderRadius: '8px',
            ':hover': {
              backgroundColor: '#006400',
            },
          }}
        >
          Suivant
        </Button>
      </Grid>
    </Grid>
  );
};

export default Step2;
