import React, { useEffect, useState } from 'react';
import {
<<<<<<< HEAD
  Typography, Box, CircularProgress, Card, CardContent, Divider, Grid, Chip, Tooltip, Button, Drawer, Avatar, Stack, Paper, Dialog, DialogTitle, DialogActions
=======
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  Grid,
  Chip,
  Tooltip,
  Button,
  Drawer,
  Avatar,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
} from '@mui/material';
import axios from 'axios';
import { getAuthConfig } from '../../Actions/config';
import { motion } from 'framer-motion';
import Select from 'react-select';
<<<<<<< HEAD
import { FaShippingFast, FaRegCalendarAlt, FaMoneyBillWave, FaTruck, FaCheckCircle, FaCircle, FaTrashAlt } from 'react-icons/fa';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';  // Importer useSnackbar
=======
import {
  FaShippingFast,
  FaRegCalendarAlt,
  FaMoneyBillWave,
  FaTruck,
  FaCheckCircle,
  FaCircle,
  FaTrashAlt,
} from 'react-icons/fa';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack'; // Importer useSnackbar
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14

// Couleurs spécifiques pour chaque statut
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

// Options de statut
const statusOptions = [
  { value: 'All', label: '🟢 All' },
  { value: 'ProcessingOrder', label: '🔄 Processing Order' },
  { value: 'CollectingFromSender', label: '📦 Collecting From Sender' },
  { value: 'InCollectingAgency', label: '🏢 In Collecting Agency' },
  { value: 'Shipping', label: '🚚 Shipping' },
  { value: 'InReceivingAgency', label: '🏠 In Receiving Agency' },
  { value: 'DeliveringToReceiver', label: '🚛 Delivering to Receiver' },
  { value: 'Delivered', label: '✅ Delivered' },
  { value: 'Aborted', label: '❌ Aborted' },
];

// Statuts dans l'ordre d'avancement
const statusSteps = [
  'ProcessingOrder',
  'CollectingFromSender',
  'InCollectingAgency',
  'Shipping',
  'InReceivingAgency',
  'DeliveringToReceiver',
  'Delivered',
];

// Styles pour le Stepper
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderColor: '#4CAF50',
    borderTopWidth: 4,
  },
}));

const SuiviCommande = () => {
<<<<<<< HEAD
  const { enqueueSnackbar } = useSnackbar();  // Initialiser useSnackbar
=======
  const { enqueueSnackbar } = useSnackbar(); // Initialiser useSnackbar
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/order/client/${userId}`, getAuthConfig());
=======
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/order/client/${userId}`,
        getAuthConfig()
      );
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
      setOrders(response.data);
      setFilteredOrders(response.data);
      setLoading(false);
    } catch (error) {
<<<<<<< HEAD
      console.error("Erreur lors de la récupération des commandes :", error);
=======
      console.error('Erreur lors de la récupération des commandes :', error);
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleStatusChange = (selectedOption) => {
=======
  const handleStatusChange = selectedOption => {
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    setSelectedStatus(selectedOption.value);
    if (selectedOption.value === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.tracking_status === selectedOption.value));
    }
  };

<<<<<<< HEAD
  const handleOpenDrawer = (order) => {
=======
  const handleOpenDrawer = order => {
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedOrder(null);
  };

<<<<<<< HEAD
  const handleOpenDialog = (orderId) => {
=======
  const handleOpenDialog = orderId => {
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    setOrderToDelete(orderId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setOrderToDelete(null);
  };

  const handleDeleteOrder = async () => {
    try {
<<<<<<< HEAD
      await axios.delete(`${process.env.REACT_APP_SERVER_URI}/order/delete/${orderToDelete}`, getAuthConfig());
      setFilteredOrders(filteredOrders.filter(order => order.idOrder !== orderToDelete));
      enqueueSnackbar('Commande supprimée avec succès!', { variant: 'success' });  // Afficher message succès
      handleCloseDialog();
      handleCloseDrawer();
    } catch (error) {
      enqueueSnackbar('Échec de la suppression de la commande.', { variant: 'error' });  // Afficher message échec
      console.error("Erreur lors de la suppression de la commande :", error);
=======
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/order/delete/${orderToDelete}`,
        getAuthConfig()
      );
      setFilteredOrders(filteredOrders.filter(order => order.idOrder !== orderToDelete));
      enqueueSnackbar('Commande supprimée avec succès!', { variant: 'success' }); // Afficher message succès
      handleCloseDialog();
      handleCloseDrawer();
    } catch (error) {
      enqueueSnackbar('Échec de la suppression de la commande.', { variant: 'error' }); // Afficher message échec
      console.error('Erreur lors de la suppression de la commande :', error);
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  return (
    <Box sx={{ padding: '20px', marginTop: '64px', textAlign: 'center' }}>
<<<<<<< HEAD
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4, color: '#1E88E5' }}>
=======
      <Typography
        variant='h3'
        sx={{ fontWeight: 'bold', mb: 4, color: '#1E88E5' }}
      >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
        Suivi de Commande
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Select
          options={statusOptions}
          defaultValue={statusOptions[0]}
          onChange={handleStatusChange}
<<<<<<< HEAD
          placeholder="Filtrer par Statut"
          styles={{
            container: (base) => ({
=======
          placeholder='Filtrer par Statut'
          styles={{
            container: base => ({
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
              ...base,
              width: '300px',
            }),
            control: (base, state) => ({
              ...base,
              borderRadius: 8,
              borderColor: state.isFocused ? '#1E88E5' : '#cfd8dc',
              boxShadow: state.isFocused ? '0px 0px 5px rgba(25, 118, 210, 0.5)' : 'none',
              '&:hover': { borderColor: '#1E88E5' },
              backgroundColor: '#f5f5f5',
              padding: '2px 8px',
            }),
          }}
        />
      </Box>

      {filteredOrders.length > 0 ? (
<<<<<<< HEAD
        <Grid container spacing={4} justifyContent="center">
          {filteredOrders.map((order) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={order.idOrder}>
=======
        <Grid
          container
          spacing={4}
          justifyContent='center'
        >
          {filteredOrders.map(order => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={order.idOrder}
            >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                    borderRadius: 5,
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
                    overflow: 'hidden',
                    transform: 'translateZ(0)',
                    '&:hover': {
                      boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  <CardContent sx={{ padding: 3 }}>
<<<<<<< HEAD
                    <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                      <Avatar sx={{ bgcolor: '#1E88E5', mr: 1 }}>
                        <FaTruck />
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
=======
                    <Box
                      display='flex'
                      alignItems='center'
                      sx={{ mb: 1 }}
                    >
                      <Avatar sx={{ bgcolor: '#1E88E5', mr: 1 }}>
                        <FaTruck />
                      </Avatar>
                      <Typography
                        variant='body2'
                        sx={{ fontWeight: 'bold', color: '#333' }}
                      >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                        {order.receiver} - {order.to}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
<<<<<<< HEAD
                    <Box display="flex" flexDirection="column" gap={1}>
=======
                    <Box
                      display='flex'
                      flexDirection='column'
                      gap={1}
                    >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                      <Chip
                        label={order.tracking_status}
                        sx={{
                          backgroundColor: statusColors[order.tracking_status],
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      />
<<<<<<< HEAD
                      <Box display="flex" alignItems="center" gap={1}>
                        <FaShippingFast style={{ color: '#1E88E5', fontSize: '1.3em' }} />
                        <Typography variant="body1">
                          <strong>Type :</strong> {order.orderType}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <FaRegCalendarAlt style={{ color: '#1E88E5', fontSize: '1.3em' }} />
                        <Typography variant="body1">
                          <strong>Date :</strong> {new Date(order.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <FaMoneyBillWave style={{ color: '#388e3c', fontSize: '1.3em' }} />
                        <Typography variant="body1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
=======
                      <Box
                        display='flex'
                        alignItems='center'
                        gap={1}
                      >
                        <FaShippingFast style={{ color: '#1E88E5', fontSize: '1.3em' }} />
                        <Typography variant='body1'>
                          <strong>Type :</strong> {order.orderType}
                        </Typography>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        gap={1}
                      >
                        <FaRegCalendarAlt style={{ color: '#1E88E5', fontSize: '1.3em' }} />
                        <Typography variant='body1'>
                          <strong>Date :</strong> {new Date(order.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box
                        display='flex'
                        alignItems='center'
                        gap={1}
                      >
                        <FaMoneyBillWave style={{ color: '#388e3c', fontSize: '1.3em' }} />
                        <Typography
                          variant='body1'
                          sx={{ color: 'success.main', fontWeight: 'bold' }}
                        >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                          Prix : {order.price} MAD
                        </Typography>
                      </Box>
                      <Button
<<<<<<< HEAD
                        variant="contained"
                        color="primary"
=======
                        variant='contained'
                        color='primary'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                        sx={{ mt: 2 }}
                        onClick={() => handleOpenDrawer(order)}
                      >
                        Détails
                      </Button>
<<<<<<< HEAD
                      {order.tracking_status === "ProcessingOrder" && (
                        <Button
                          variant="contained"
                          color="error"
=======
                      {order.tracking_status === 'ProcessingOrder' && (
                        <Button
                          variant='contained'
                          color='error'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                          sx={{ mt: 2 }}
                          startIcon={<FaTrashAlt />}
                          onClick={() => handleOpenDialog(order.idOrder)}
                        >
                          Supprimer
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
<<<<<<< HEAD
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 4 }}>
=======
        <Typography
          variant='body1'
          color='textSecondary'
          sx={{ textAlign: 'center', mt: 4 }}
        >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
          Aucune commande trouvée pour ce statut.
        </Typography>
      )}

<<<<<<< HEAD
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{ width: 550, padding: 4, backgroundColor: '#f8f9fa', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)', borderRadius: 2 }}>
          {selectedOrder && (
            <>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#1E88E5', textAlign: 'center' }}>
                Détails de la Commande
              </Typography>
              <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: 3, mb: 4 }}>
                <Stack spacing={2}>
                  <Typography variant="body1">
                    <strong>Destinataire :</strong> {selectedOrder.receiver}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Ville :</strong> {selectedOrder.to}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Type de Commande :</strong> {selectedOrder.orderType}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Date :</strong> {new Date(selectedOrder.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Prix :</strong> {selectedOrder.price} MAD
                  </Typography>
                  <Typography variant="body1">
=======
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <Box
          sx={{
            width: 550,
            padding: 4,
            backgroundColor: '#f8f9fa',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
            borderRadius: 2,
          }}
        >
          {selectedOrder && (
            <>
              <Typography
                variant='h4'
                sx={{ fontWeight: 'bold', mb: 3, color: '#1E88E5', textAlign: 'center' }}
              >
                Détails de la Commande
              </Typography>
              <Paper
                elevation={3}
                sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: 3, mb: 4 }}
              >
                <Stack spacing={2}>
                  <Typography variant='body1'>
                    <strong>Destinataire :</strong> {selectedOrder.receiver}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Ville :</strong> {selectedOrder.to}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Type de Commande :</strong> {selectedOrder.orderType}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Date :</strong> {new Date(selectedOrder.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Prix :</strong> {selectedOrder.price} MAD
                  </Typography>
                  <Typography variant='body1'>
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                    <strong>Poids :</strong> {selectedOrder.weight} kg
                  </Typography>
                </Stack>
              </Paper>
              <Box sx={{ my: 4 }}>
<<<<<<< HEAD
                <Stepper alternativeLabel activeStep={statusSteps.indexOf(selectedOrder.tracking_status)} connector={<CustomConnector />}>
=======
                <Stepper
                  alternativeLabel
                  activeStep={statusSteps.indexOf(selectedOrder.tracking_status)}
                  connector={<CustomConnector />}
                >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                  {statusSteps.map((status, index) => (
                    <Step key={status}>
                      <StepLabel
                        icon={
                          statusSteps.indexOf(selectedOrder.tracking_status) > index ? (
                            <FaCheckCircle style={{ color: '#4CAF50', fontSize: '1.5em' }} />
                          ) : statusSteps.indexOf(selectedOrder.tracking_status) === index ? (
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
              <Button
<<<<<<< HEAD
                variant="contained"
                color="secondary"
=======
                variant='contained'
                color='secondary'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                onClick={handleCloseDrawer}
                sx={{ mt: 3, display: 'block', mx: 'auto', width: '50%' }}
              >
                Fermer
              </Button>
            </>
          )}
        </Box>
      </Drawer>

<<<<<<< HEAD
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle sx={{ textAlign: 'center', color: '#d32f2f', fontWeight: 'bold' }}>Confirmer la suppression</DialogTitle>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
          <Button onClick={handleCloseDialog} color="primary" variant="outlined">
=======
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle sx={{ textAlign: 'center', color: '#d32f2f', fontWeight: 'bold' }}>
          Confirmer la suppression
        </DialogTitle>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
          <Button
            onClick={handleCloseDialog}
            color='primary'
            variant='outlined'
          >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
            Annuler
          </Button>
          <Button
            onClick={handleDeleteOrder}
<<<<<<< HEAD
            color="error"
            variant="contained"
            sx={{ backgroundColor: '#d32f2f', color: 'white', ':hover': { backgroundColor: '#b71c1c' } }}
=======
            color='error'
            variant='contained'
            sx={{
              backgroundColor: '#d32f2f',
              color: 'white',
              ':hover': { backgroundColor: '#b71c1c' },
            }}
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SuiviCommande;
