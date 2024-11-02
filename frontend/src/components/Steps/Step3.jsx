import React from 'react';
import { TextField, Button, Grid, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Step3 = ({
  formData,
  handleInputChange,
  showPassword,
  toggleShowPassword,
  validatePassword,
  prevStep,
  handleSubmit,
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
          Création de mot de passe
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextField
          fullWidth
          label='Mot de passe'
          name='password'
          type={showPassword.password ? 'text' : 'password'}
          value={formData.password}
          onChange={handleInputChange}
          variant='outlined'
          margin='normal'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LockIcon color='action' />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => toggleShowPassword('password')}>
                  {showPassword.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
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
          label='Confirmer le mot de passe'
          name='confirmPassword'
          type={showPassword.confirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          variant='outlined'
          margin='normal'
          error={!validatePassword()}
          helperText={!validatePassword() ? 'Les mots de passe ne correspondent pas' : ''}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LockIcon color='action' />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => toggleShowPassword('confirmPassword')}>
                  {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyContent='space-between'
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
          type='submit'
          onClick={handleSubmit}
          sx={{
            width: '45%',
            backgroundColor: 'green',
            borderRadius: '8px',
            ':hover': {
              backgroundColor: '#006400',
            },
          }}
        >
          S'inscrire
        </Button>
      </Grid>
    </Grid>
  );
};

export default Step3;
