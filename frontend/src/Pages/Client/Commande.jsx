import React from 'react';
import { Typography, Box } from '@mui/material';

const Commande = () => {
  console.log(localStorage.getItem('userId'));
  console.log(localStorage.getItem('accessToken'));

  return (
    <Box sx={{ padding: '20px', marginTop: '64px' }}>
      <Typography
        variant='h4'
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Commande
      </Typography>
      {/* Contenu de la page */}
    </Box>
  );
};

export default Commande;
