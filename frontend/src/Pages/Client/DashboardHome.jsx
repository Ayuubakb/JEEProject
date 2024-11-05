import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, CardContent, Grid, CircularProgress, Divider } from '@mui/material';
import axios from 'axios';
import { getAuthConfig } from '../../Actions/config';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { FaMoneyBill, FaShoppingCart, FaExchangeAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/DashboardHome.css';

Chart.register(BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardHome = () => {
  const [client, setClient] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authConfig = getAuthConfig();

        const clientResponse = await axios.get(`${process.env.REACT_APP_SERVER_URI}/client/get/id/${userId}`, authConfig);
        setClient(clientResponse.data);

        const commandesResponse = await axios.get(`${process.env.REACT_APP_SERVER_URI}/order/client/${userId}`, authConfig);
        setCommandes(commandesResponse.data);

        const transactionsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URI}/transactions/get/client/${userId}`, authConfig);
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

  const transactionData = {
    labels: transactions.map(tx => new Date(tx.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Montant des transactions (MAD)',
        data: transactions.map(tx => tx.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.6,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const monthlyOrderCounts = Array(12).fill(0);
  commandes.forEach((commande) => {
    const month = new Date(commande.date).getMonth();
    monthlyOrderCounts[month] += 1;
  });

  const monthlyOrderData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Commandes par Mois',
        data: monthlyOrderCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const trackingStatusCounts = {
    ProcessingOrder: 0,
    CollectingFromSender: 0,
    InCollectingAgency: 0,
    Shipping: 0,
    InReceivingAgency: 0,
    DeliveringToReceiver: 0,
    Delivered: 0,
    Aborted: 0,
  };

  commandes.forEach((commande) => {
    trackingStatusCounts[commande.tracking_status] += 1;
  });

  const orderStatusData = {
    labels: Object.keys(trackingStatusCounts),
    datasets: [
      {
        label: 'Statut des Commandes',
        data: Object.values(trackingStatusCounts),
        backgroundColor: [
          '#42a5f5', '#66bb6a', '#ffca28', '#ab47bc', '#29b6f6', '#ff7043', '#8d6e63', '#bdbdbd'
        ],
        hoverOffset: 8,
      },
    ],
  };

  return (
    <Box className="dashboard-container" sx={{ backgroundColor: '#f9f9fb', padding: '20px' }}>
      <Typography variant="h4" className="dashboard-title" sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}>
        Tableau de Bord du Client
      </Typography>
      
      <Grid container spacing={3} className="dashboard-cards">
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card balance-card" sx={{ backgroundColor: '#e3f2fd', boxShadow: 3 }}>
            <CardContent>
              <FaMoneyBill className="card-icon" style={{ color: '#1976d2' }} />
              <Typography variant="h6">Solde actuel</Typography>
              <Typography variant="h4" className="card-value">{client?.balance} MAD</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card orders-card" sx={{ backgroundColor: '#e8f5e9', boxShadow: 3 }}>
            <CardContent>
              <FaShoppingCart className="card-icon" style={{ color: '#388e3c' }} />
              <Typography variant="h6">Nombre de Commandes</Typography>
              <Typography variant="h4" className="card-value">{commandes.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="dashboard-card transactions-card" sx={{ backgroundColor: '#fff3e0', boxShadow: 3 }}>
            <CardContent>
              <FaExchangeAlt className="card-icon" style={{ color: '#f57c00' }} />
              <Typography variant="h6">Transactions</Typography>
              <Typography variant="h4" className="card-value">{transactions.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider className="dashboard-divider" sx={{ my: 4, color: '#666' }}>Analyses</Divider>

      <Grid container spacing={3} className="charts-section">
        <Grid item xs={12} md={6}>
          <Card className="chart-card" sx={{ boxShadow: 4, borderRadius: 2, maxHeight: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>Transactions Mensuelles</Typography>
              <Box sx={{ height: 300 }}>
                <Bar data={transactionData} options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: { y: { beginAtZero: true } },
                }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="chart-card" sx={{ boxShadow: 4, borderRadius: 2, maxHeight: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>Commandes par Mois</Typography>
              <Box sx={{ height: 300 }}>
                <Line data={monthlyOrderData} options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: { y: { beginAtZero: true } },
                }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="chart-card" sx={{ boxShadow: 4, borderRadius: 2, maxHeight: 400 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>Statut des Commandes</Typography>
              <Box sx={{ height: 300 }}>
                <Pie data={orderStatusData} options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;