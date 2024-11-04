import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
} from '@mui/material';
import axios from 'axios';
import { getAuthConfig } from '../../Actions/config';
import moment from 'moment';
import 'moment/locale/fr';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';
import { useSnackbar } from 'notistack'; // Pour afficher des notifications

moment.locale('fr');

const statusSteps = [
  'ProcessingOrder',
  'CollectingFromSender',
  'InCollectingAgency',
  'Shipping',
  'InReceivingAgency',
  'DeliveringToReceiver',
  'Delivered',
];

const statusColors = {
  ProcessingOrder: '#FFA726',
  CollectingFromSender: '#29B6F6',
  InCollectingAgency: '#AB47BC',
  Shipping: '#FF7043',
  InReceivingAgency: '#66BB6A',
  DeliveringToReceiver: '#42A5F5',
  Delivered: '#8BC34A',
  Aborted: '#E57373',
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderColor: '#4CAF50',
    borderTopWidth: 4,
  },
}));

const MissionsAVenir = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const { enqueueSnackbar } = useSnackbar(); // Initialisation du Snackbar

  const driverId = localStorage.getItem('userId');

  useEffect(() => {
    fetchMissions();
  }, [driverId]);

  const fetchMissions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/missions/driver/${driverId}`,
        getAuthConfig()
      );
      const ongoingMissions = response.data.filter(mission => !mission.is_done);
      setMissions(ongoingMissions);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des missions :', error);
      setLoading(false);
    }
  };

  const currentDate = moment().format('dddd, LL');
  const currentTime = moment().format('HH:mm');

  const handleDetailsClick = mission => {
    setSelectedMission(mission);
  };

  const handleClose = () => {
    setSelectedMission(null);
    setSelectedOrder(null);
    setNewStatus('');
  };

  const handleStatusChange = async () => {
    if (selectedOrder && newStatus) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_SERVER_URI}/missions/updateTrackingStatus/${driverId}/${selectedOrder.idOrder}`,
          null,
          {
            params: { newStatus },
            ...getAuthConfig(),
          }
        );

        // Afficher le message de succès
        enqueueSnackbar(`Mission ${selectedMission.id_mission} mise à jour avec succès`, {
          variant: 'success',
          icon: <FaCheckCircle />,
        });

        // Supprimer la mission si l'état est "Delivered"
        if (newStatus === 'Delivered') {
          setMissions(prevMissions =>
            prevMissions.filter(mission => mission.id_mission !== selectedMission.id_mission)
          );
        }

        handleClose();
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de suivi :', error);
        alert('Erreur lors de la mise à jour du statut.');
      }
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant='h4'
          sx={{ fontWeight: 'bold', color: '#1565C0', mb: 1 }}
        >
          Bienvenue, cher livreur !
        </Typography>
        <Typography
          variant='h6'
          color='textSecondary'
        >
          Aujourd'hui, nous sommes le {currentDate}, il est {currentTime}. Voici vos missions :
        </Typography>
      </Box>

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
                        bgcolor: '#1565C0',
                        width: 56,
                        height: 56,
                        mb: 2,
                        mx: 'auto',
                      }}
                    >
                      {mission.to_city[0]}
                    </Avatar>
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
                      Départ : {moment(mission.start_date).format('LLL')}
                    </Typography>
                    <Chip
                      label='En cours'
                      sx={{
                        backgroundColor: '#ff9800',
                        color: '#fff',
                        fontWeight: 'bold',
                        mt: 1,
                      }}
                    />
                    <Button
                      variant='outlined'
                      color='primary'
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
          <Typography
            variant='body1'
            color='textSecondary'
            sx={{ mt: 4 }}
          >
            Aucune mission à venir pour le moment.
          </Typography>
        )}
      </Grid>

      {/* Modal pour les détails de la mission */}
      {selectedMission && (
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
              <strong>Départ :</strong> {moment(selectedMission.start_date).format('LLLL')}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant='h6'
              sx={{ mb: 2 }}
            >
              Ordres dans cette mission :
            </Typography>
            {selectedMission.orders && selectedMission.orders.length > 0 ? (
              selectedMission.orders.map((order, index) => (
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
                    Prix : {order.price} MAD - Poids : {order.weight} kg
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Stepper
                      alternativeLabel
                      activeStep={statusSteps.indexOf(order.tracking_status)}
                      connector={<CustomConnector />}
                    >
                      {statusSteps.map((status, index) => (
                        <Step key={status}>
                          <StepLabel
                            icon={
                              statusSteps.indexOf(order.tracking_status) > index ? (
                                <FaCheckCircle style={{ color: '#4CAF50', fontSize: '1.5em' }} />
                              ) : statusSteps.indexOf(order.tracking_status) === index ? (
                                <FaCircle style={{ color: '#4CAF50', fontSize: '1.5em' }} />
                              ) : (
                                <FaCircle style={{ color: '#e0e0e0', fontSize: '1.2em' }} />
                              )
                            }
                          >
                            {status.replace(/([A-Z])/g, ' $1').trim()}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                  <Select
                    value={newStatus}
                    onChange={e => {
                      setNewStatus(e.target.value);
                      setSelectedOrder(order);
                    }}
                    displayEmpty
                    sx={{
                      mb: 1,
                      width: '100%',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '5px',
                      padding: '5px',
                    }}
                  >
                    <MenuItem
                      value=''
                      disabled
                    >
                      Sélectionner un statut
                    </MenuItem>
                    {order.tracking_status === 'CollectingFromSender' && (
                      <MenuItem value='InCollectingAgency'>In Collecting Agency</MenuItem>
                    )}
                    {order.tracking_status === 'DeliveringToReceiver' && (
                      <MenuItem value='Delivered'>Delivered</MenuItem>
                    )}
                    {['Shipping'].includes(order.tracking_status) && (
                      <MenuItem value='InReceivingAgency'>In Receiving Agency</MenuItem>
                    )}
                  </Select>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleStatusChange}
                    disabled={
                      !newStatus ||
                      ['InCollectingAgency', 'InReceivingAgency'].includes(order.tracking_status)
                    }
                    sx={{ width: '100%' }}
                  >
                    Mettre à jour
                  </Button>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))
            ) : (
              <Typography
                variant='body2'
                color='textSecondary'
              >
                Aucun ordre associé à cette mission.
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color='primary'
            >
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default MissionsAVenir;
