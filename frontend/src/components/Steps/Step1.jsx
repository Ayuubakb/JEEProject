import React from 'react';
import { TextField, Button, Grid, Typography, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Step1 = ({
  formData,
  handleInputChange,
  validatePhone,
  showPhoneError,
  setShowPhoneError,
  nextStep,
}) => {
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
          Informations personnelles
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <TextField
          fullWidth
          label='Prénom'
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
          variant='outlined'
          margin='normal'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <PersonIcon color='action' />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <TextField
          fullWidth
          label='Nom'
          name='lastName'
          value={formData.lastName}
          onChange={handleInputChange}
          variant='outlined'
          margin='normal'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <PersonIcon color='action' />
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
          label='Email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleInputChange}
          variant='outlined'
          margin='normal'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <EmailIcon color='action' />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <TextField
          fullWidth
          label="Téléphone"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={(e) => {
            handleInputChange(e);
            setShowPhoneError(true);
          }}
          variant="outlined"
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon color="action" />
              </InputAdornment>
            ),
          }}
          error={showPhoneError && !validatePhone()}
          helperText={showPhoneError && !validatePhone() ? "Numéro invalide" : ""}
        />
      </Grid> */}
      <Grid
        item
        xs={12}
        container
        justifyContent='flex-end'
      >
        <Button
          variant='contained'
          color='primary'
          onClick={nextStep}
          sx={{
            width: '45%',
            backgroundColor: 'green',
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

export default Step1;
