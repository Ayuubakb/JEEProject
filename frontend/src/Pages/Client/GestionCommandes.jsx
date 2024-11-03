// src/Pages/Client/GestionCommandes.jsx
import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const GestionCommandes = () => {
  return (
    <Box sx={{ padding: '20px', marginTop: '64px' }}>
      <Typography
        variant='h4'
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Gestion de commandes
      </Typography>
      {/* Contenu de la page */}
    </Box>
  );
};

export default GestionCommandes;
