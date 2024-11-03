import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Grid, CircularProgress, Divider } from '@mui/material';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { getAuthConfig } from '../../Actions/config';

// Register necessary Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale);

const GestionCommandes = () => {
  const [client, setClient] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authConfig = getAuthConfig();

        // Fetch client details
        const clientResponse = await axios.get(`/client/get/id/${userId}`, authConfig);
        setClient(clientResponse.data);

        // Fetch client-specific orders using a filter
        const orderFilters = { clientId: userId }; // Modify as needed for your backend filtering
        const commandesResponse = await axios.post(`/order/get`, orderFilters, authConfig);
        setCommandes(commandesResponse.data);

        // Fetch transactions
        const transactionsResponse = await axios.get(`/transactions/get/client/${userId}`, authConfig);
        setTransactions(transactionsResponse.data);

      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <CircularProgress />;

  // Data for the transactions chart
  const transactionData = {
    labels: transactions.map(tx => new Date(tx.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Montant des transactions',
        data: transactions.map(tx => tx.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Tableau de Bord du Client
      </Typography>

      <Grid container spacing={3}>
        {/* Solde et commandes */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Solde actuel</Typography>
              <Typography variant="h4" color="primary">
                {client?.balance} MAD
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Nombre de Commandes</Typography>
              <Typography variant="h4" color="primary">
                {commandes.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Transactions</Typography>
              <Typography variant="h4" color="primary">
                {transactions.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }}>Analyses</Divider>

      <Grid container spacing={3}>
        {/* Transaction chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Graphique des Transactions</Typography>
              <Bar data={transactionData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Latest orders list */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Dernières Commandes</Typography>
              {commandes.slice(0, 5).map((commande) => (
                <Box key={commande.id} sx={{ mb: 2 }}>
                  <Typography variant="body1">Commande ID: {commande.id}</Typography>
                  <Typography variant="body2">Statut: {commande.status}</Typography>
                  <Typography variant="body2">Date: {new Date(commande.date).toLocaleDateString()}</Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GestionCommandes;