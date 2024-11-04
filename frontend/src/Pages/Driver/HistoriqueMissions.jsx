// src/Pages/Driver/HistoriqueMissions.jsx
import React, { useEffect, useState } from 'react';
import {
<<<<<<< HEAD
  Box, Typography, Card, CardContent, CircularProgress, Grid, Avatar, Chip, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions,
=======
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Avatar,
  Chip,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
} from '@mui/material';
import axios from 'axios';
import { getAuthConfig } from '../../Actions/config';
import moment from 'moment';
import { motion } from 'framer-motion';

const HistoriqueMissions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState(null); // Pour la mission sélectionnée
  const driverId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCompletedMissions = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/missions/driver/${driverId}`, getAuthConfig());
=======
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URI}/missions/driver/${driverId}`,
          getAuthConfig()
        );
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
        const completedMissions = response.data.filter(mission => mission.is_done); // Filtrer les missions complétées
        setMissions(completedMissions);
        setLoading(false);
      } catch (error) {
<<<<<<< HEAD
        console.error("Erreur lors du chargement des missions :", error);
=======
        console.error('Erreur lors du chargement des missions :', error);
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
        setLoading(false);
      }
    };

    fetchCompletedMissions();
  }, [driverId]);

<<<<<<< HEAD
  const handleDetailsClick = (mission) => {
=======
  const handleDetailsClick = mission => {
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    setSelectedMission(mission);
  };

  const handleClose = () => {
    setSelectedMission(null);
  };

  if (loading) {
    return <CircularProgress sx={{ mt: 5 }} />;
  }

  return (
    <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
<<<<<<< HEAD
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1565C0', mb: 4 }}>
        Historique des Missions Complétées
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {missions.length > 0 ? (
          missions.map((mission) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={mission.id_mission}>
=======
      <Typography
        variant='h4'
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1565C0', mb: 4 }}
      >
        Historique des Missions Complétées
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent='center'
      >
        {missions.length > 0 ? (
          missions.map(mission => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={mission.id_mission}
            >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: '#4caf50',
                        width: 56,
                        height: 56,
                        mb: 2,
                        mx: 'auto',
                      }}
                    >
                      {mission.to_city[0]}
                    </Avatar>
<<<<<<< HEAD
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      Mission ID: {mission.id_mission}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
                      Destination : {mission.to_city}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      Terminée le : {moment(mission.end_date).format('LLL')}
                    </Typography>
                    <Chip
                      label="Complétée"
=======
                    <Typography
                      variant='h6'
                      fontWeight='bold'
                      sx={{ mb: 1 }}
                    >
                      Mission ID: {mission.id_mission}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='textSecondary'
                      sx={{ mb: 2 }}
                    >
                      Destination : {mission.to_city}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      sx={{ mb: 1 }}
                    >
                      Terminée le : {moment(mission.end_date).format('LLL')}
                    </Typography>
                    <Chip
                      label='Complétée'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                      sx={{
                        backgroundColor: '#4caf50',
                        color: '#fff',
                        fontWeight: 'bold',
                        mt: 1,
                      }}
                    />
                    <Button
<<<<<<< HEAD
                      variant="outlined"
                      color="primary"
=======
                      variant='outlined'
                      color='primary'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                      sx={{ mt: 2 }}
                      onClick={() => handleDetailsClick(mission)}
                    >
                      Détails
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
<<<<<<< HEAD
          <Typography variant="body1" color="textSecondary" sx={{ mt: 4 }}>
=======
          <Typography
            variant='body1'
            color='textSecondary'
            sx={{ mt: 4 }}
          >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
            Aucune mission complétée pour le moment.
          </Typography>
        )}
      </Grid>

      {/* Modal pour les détails de la mission */}
      {selectedMission && (
<<<<<<< HEAD
        <Dialog open={Boolean(selectedMission)} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Détails de la Mission</DialogTitle>
          <DialogContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Mission ID: {selectedMission.id_mission}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Destination :</strong> {selectedMission.to_city}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Date de fin :</strong> {moment(selectedMission.end_date).format('LLLL')}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
=======
        <Dialog
          open={Boolean(selectedMission)}
          onClose={handleClose}
          maxWidth='sm'
          fullWidth
        >
          <DialogTitle>Détails de la Mission</DialogTitle>
          <DialogContent>
            <Typography
              variant='h6'
              sx={{ mb: 2 }}
            >
              Mission ID: {selectedMission.id_mission}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography
              variant='body1'
              sx={{ mb: 1 }}
            >
              <strong>Destination :</strong> {selectedMission.to_city}
            </Typography>
            <Typography
              variant='body1'
              sx={{ mb: 1 }}
            >
              <strong>Date de fin :</strong> {moment(selectedMission.end_date).format('LLLL')}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant='h6'
              sx={{ mb: 2 }}
            >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
              Ordres dans cette mission :
            </Typography>
            {selectedMission.orders && selectedMission.orders.length > 0 ? (
              selectedMission.orders.map((order, index) => (
<<<<<<< HEAD
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Order ID :</strong> {order.idOrder}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
=======
                <Box
                  key={index}
                  sx={{ mb: 2 }}
                >
                  <Typography
                    variant='body1'
                    sx={{ mb: 1 }}
                  >
                    <strong>Order ID :</strong> {order.idOrder}
                  </Typography>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    sx={{ mb: 1 }}
                  >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                    Prix : {order.price} MAD - Poids : {order.weight} kg
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                </Box>
              ))
            ) : (
<<<<<<< HEAD
              <Typography variant="body2" color="textSecondary">
=======
              <Typography
                variant='body2'
                color='textSecondary'
              >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                Aucun ordre associé à cette mission.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
<<<<<<< HEAD
            <Button onClick={handleClose} color="primary">
=======
            <Button
              onClick={handleClose}
              color='primary'
            >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default HistoriqueMissions;
