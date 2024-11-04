import React, { useEffect, useState } from 'react';
import {
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
} from '@mui/material';
import axios from 'axios';
import { getAuthConfig } from '../../Actions/config';
import { motion } from 'framer-motion';
import Select from 'react-select';
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
  const { enqueueSnackbar } = useSnackbar(); // Initialiser useSnackbar
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
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URI}/order/client/${userId}`,
        getAuthConfig()
      );
      setOrders(response.data);
      setFilteredOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error);
      setLoading(false);
    }
  };

  const handleStatusChange = selectedOption => {
    setSelectedStatus(selectedOption.value);
    if (selectedOption.value === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.tracking_status === selectedOption.value));
    }
  };

  const handleOpenDrawer = order => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedOrder(null);
  };

  const handleOpenDialog = orderId => {
    setOrderToDelete(orderId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setOrderToDelete(null);
  };

  const handleDeleteOrder = async () => {
    try {
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
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  return (
    <Box sx={{ padding: '20px', marginTop: '64px', textAlign: 'center' }}>
      <Typography
        variant='h3'
        sx={{ fontWeight: 'bold', mb: 4, color: '#1E88E5' }}
      >
        Suivi de Commande
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Select
          options={statusOptions}
          defaultValue={statusOptions[0]}
          onChange={handleStatusChange}
          placeholder='Filtrer par Statut'
          styles={{
            container: base => ({
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
                        {order.receiver} - {order.to}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box
                      display='flex'
                      flexDirection='column'
                      gap={1}
                    >
                      <Chip
                        label={order.tracking_status}
                        sx={{
                          backgroundColor: statusColors[order.tracking_status],
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      />
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
                          Prix : {order.price} MAD
                        </Typography>
                      </Box>
                      <Button
                        variant='contained'
                        color='primary'
                        sx={{ mt: 2 }}
                        onClick={() => handleOpenDrawer(order)}
                      >
                        Détails
                      </Button>
                      {order.tracking_status === 'ProcessingOrder' && (
                        <Button
                          variant='contained'
                          color='error'
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
        <Typography
          variant='body1'
          color='textSecondary'
          sx={{ textAlign: 'center', mt: 4 }}
        >
          Aucune commande trouvée pour ce statut.
        </Typography>
      )}

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
                    <strong>Poids :</strong> {selectedOrder.weight} kg
                  </Typography>
                </Stack>
              </Paper>
              <Box sx={{ my: 4 }}>
                <Stepper
                  alternativeLabel
                  activeStep={statusSteps.indexOf(selectedOrder.tracking_status)}
                  connector={<CustomConnector />}
                >
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
                variant='contained'
                color='secondary'
                onClick={handleCloseDrawer}
                sx={{ mt: 3, display: 'block', mx: 'auto', width: '50%' }}
              >
                Fermer
              </Button>
            </>
          )}
        </Box>
      </Drawer>

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
            Annuler
          </Button>
          <Button
            onClick={handleDeleteOrder}
            color='error'
            variant='contained'
            sx={{
              backgroundColor: '#d32f2f',
              color: 'white',
              ':hover': { backgroundColor: '#b71c1c' },
            }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SuiviCommande;
