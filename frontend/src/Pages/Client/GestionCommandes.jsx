// src/Pages/Client/GestionCommandes.jsx
import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const GestionCommandes = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get('/api/commandes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCommandes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };
    fetchCommandes();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Gestion des Commandes
      </Typography>

      {commandes.length > 0 ? (
        commandes.map((commande) => (
          <Card key={commande.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Commande ID: {commande.id}</Typography>
              <Typography>Statut: {commande.status}</Typography>
              <Typography>Date: {new Date(commande.date).toLocaleDateString()}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                  Suivre la commande
                </Button>
                <Button variant="outlined" color="secondary">
                  Annuler la commande
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          Aucune commande active.
        </Typography>
      )}
    </Box>
  );
};

export default GestionCommandes;