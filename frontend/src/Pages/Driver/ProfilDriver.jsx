// src/Pages/Driver/ProfilDriver.jsx
import React, { useEffect, useState } from 'react';
import {
<<<<<<< HEAD
  Typography, Box, CircularProgress, Avatar, Paper, Divider, Chip, Stack, TextField, Button, Snackbar, Alert, IconButton, InputAdornment, Grid, Select, MenuItem, FormControl, InputLabel
=======
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Paper,
  Divider,
  Chip,
  Stack,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthConfig } from '../../Actions/config';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PhoneIcon from '@mui/icons-material/Phone';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { indigo, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

const ProfilDriver = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [agency, setAgency] = useState(null);
  const [agencies, setAgencies] = useState([]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const userId = localStorage.getItem('userId');

  const fetchDriverData = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/driver/get/id/${id}`, getAuthConfig());
=======
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/driver/get/id/${id}`,
        getAuthConfig()
      );
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
      if (response.ok) {
        const data = await response.json();
        setDriver(data);
        if (data.id_agency) {
<<<<<<< HEAD
          const agencyResponse = await fetch(`${process.env.REACT_APP_SERVER_URI}/agency/get/id/${data.id_agency}`, getAuthConfig());
=======
          const agencyResponse = await fetch(
            `${process.env.REACT_APP_SERVER_URI}/agency/get/id/${data.id_agency}`,
            getAuthConfig()
          );
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
          if (agencyResponse.ok) {
            const agencyData = await agencyResponse.json();
            setAgency(agencyData);
          }
        }
      } else {
        navigate('/auth/login');
      }
    } catch (error) {
<<<<<<< HEAD
      console.error("Erreur réseau", error);
=======
      console.error('Erreur réseau', error);
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    } finally {
      setLoading(false);
    }
  };

  const fetchAgencies = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/agency/get`, getAuthConfig());
=======
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URI}/agency/get`,
        getAuthConfig()
      );
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
      if (response.ok) {
        const agenciesData = await response.json();
        setAgencies(agenciesData);
      } else {
<<<<<<< HEAD
        console.error("Erreur lors de la récupération des agences");
      }
    } catch (error) {
      console.error("Erreur réseau lors de la récupération des agences", error);
=======
        console.error('Erreur lors de la récupération des agences');
      }
    } catch (error) {
      console.error('Erreur réseau lors de la récupération des agences', error);
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    }
  };

  useEffect(() => {
    if (!userId || userId !== id) {
      navigate('/auth/login');
      return;
    }
    fetchDriverData();
    fetchAgencies();
  }, [id, navigate, userId]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

<<<<<<< HEAD
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDriver((prevDriver) => ({
=======
  const handleInputChange = event => {
    const { name, value } = event.target;
    setDriver(prevDriver => ({
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
      ...prevDriver,
      [name]: value,
    }));
  };

<<<<<<< HEAD
  const handlePasswordChange = (event) => {
=======
  const handlePasswordChange = event => {
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

<<<<<<< HEAD
  const handleAgencyChange = (event) => {
    const agencyId = event.target.value;
    const selectedAgency = agencies.find((agency) => agency.id_agency === agencyId);
=======
  const handleAgencyChange = event => {
    const agencyId = event.target.value;
    const selectedAgency = agencies.find(agency => agency.id_agency === agencyId);
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    setAgency(selectedAgency);
  };

  const handleSave = async () => {
    try {
      const updatedDriver = {
        ...driver,
        agency,
        ...(password && { password }),
      };

      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/driver/update`, {
        method: 'POST',
        body: JSON.stringify(updatedDriver),
        ...getAuthConfig(),
      });
      if (response.ok) {
        setSnackbarMessage('Profil mis à jour avec succès !');
        setSnackbarSeverity('success');
        setEditing(false);
        setPassword('');
        await fetchDriverData();
      } else {
        setSnackbarMessage('Erreur lors de la mise à jour du profil.');
        setSnackbarSeverity('error');
      }
    } catch (error) {
<<<<<<< HEAD
      console.error("Erreur réseau", error);
=======
      console.error('Erreur réseau', error);
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
      setSnackbarMessage('Erreur réseau lors de la mise à jour.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;
<<<<<<< HEAD
  if (!driver) return <Typography variant="h6">Aucune information trouvée</Typography>;
=======
  if (!driver) return <Typography variant='h6'>Aucune information trouvée</Typography>;
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: grey[100],
        padding: theme.spacing(4),
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: '85%',
          width: '100%',
          padding: theme.spacing(6),
          borderRadius: 4,
          bgcolor: grey[50],
          boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.15)',
          textAlign: 'center',
          overflow: 'hidden',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Box sx={{ position: 'relative', mb: 3, mt: -4 }}>
          <Avatar
            sx={{
              width: 130,
              height: 130,
              mx: 'auto',
              bgcolor: indigo[700],
              fontSize: 42,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid white',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
<<<<<<< HEAD
            {driver.first_name[0]}{driver.last_name[0]}
          </Avatar>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 'bold', color: indigo[800], mb: 3 }}>
=======
            {driver.first_name[0]}
            {driver.last_name[0]}
          </Avatar>
        </Box>

        <Typography
          variant='h4'
          sx={{ fontWeight: 'bold', color: indigo[800], mb: 3 }}
        >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
          Bienvenue, {driver.first_name} {driver.last_name} !
        </Typography>

        <Button
<<<<<<< HEAD
          variant="outlined"
          color="primary"
=======
          variant='outlined'
          color='primary'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
          startIcon={editing ? <SaveIcon /> : <EditIcon />}
          onClick={editing ? handleSave : handleEditToggle}
          sx={{ mb: 4 }}
        >
          {editing ? 'Enregistrer les modifications' : 'Modifier mon profil'}
        </Button>

        <Divider sx={{ mb: 4 }}>
<<<<<<< HEAD
          <Chip label="Informations Personnelles" color="primary" variant="outlined" />
        </Divider>

        <Box sx={{ textAlign: 'left', mb: 4, px: 4 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Prénom :</Typography>
              {editing ? (
                <TextField
                  label="Prénom"
                  name="first_name"
                  variant="outlined"
                  size="small"
=======
          <Chip
            label='Informations Personnelles'
            color='primary'
            variant='outlined'
          />
        </Divider>

        <Box sx={{ textAlign: 'left', mb: 4, px: 4 }}>
          <Grid
            container
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <Typography
                variant='body1'
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                Prénom :
              </Typography>
              {editing ? (
                <TextField
                  label='Prénom'
                  name='first_name'
                  variant='outlined'
                  size='small'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                  value={driver.first_name || ''}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
<<<<<<< HEAD
                <Typography variant="h6" sx={{ backgroundColor: grey[200], padding: '8px', borderRadius: 1 }}>
=======
                <Typography
                  variant='h6'
                  sx={{ backgroundColor: grey[200], padding: '8px', borderRadius: 1 }}
                >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                  {driver.first_name}
                </Typography>
              )}
            </Grid>
<<<<<<< HEAD
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Nom :</Typography>
              {editing ? (
                <TextField
                  label="Nom"
                  name="last_name"
                  variant="outlined"
                  size="small"
=======
            <Grid
              item
              xs={12}
              md={6}
            >
              <Typography
                variant='body1'
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                Nom :
              </Typography>
              {editing ? (
                <TextField
                  label='Nom'
                  name='last_name'
                  variant='outlined'
                  size='small'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                  value={driver.last_name || ''}
                  onChange={handleInputChange}
                  fullWidth
                />
              ) : (
<<<<<<< HEAD
                <Typography variant="h6" sx={{ backgroundColor: grey[200], padding: '8px', borderRadius: 1 }}>
=======
                <Typography
                  variant='h6'
                  sx={{ backgroundColor: grey[200], padding: '8px', borderRadius: 1 }}
                >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                  {driver.last_name}
                </Typography>
              )}
            </Grid>
          </Grid>

<<<<<<< HEAD
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <EmailIcon sx={{ color: indigo[400] }} />
            {editing ? (
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                size="small"
=======
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            sx={{ mb: 2 }}
          >
            <EmailIcon sx={{ color: indigo[400] }} />
            {editing ? (
              <TextField
                label='Email'
                name='email'
                variant='outlined'
                size='small'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                value={driver.email || ''}
                onChange={handleInputChange}
                fullWidth
              />
            ) : (
<<<<<<< HEAD
              <Typography variant="body1"><strong>Email :</strong> {driver.email}</Typography>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <PhoneIcon sx={{ color: indigo[400] }} />
            {editing ? (
              <TextField
                label="Téléphone"
                name="phone"
                variant="outlined"
                size="small"
                value={driver.phone || ''}
                onChange={handleInputChange}
                fullWidth
              />
            ) : (
              <Typography variant="body1"><strong>Téléphone :</strong> {driver.phone}</Typography>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <BusinessIcon sx={{ color: indigo[400] }} />
            {editing ? (
              <TextField
                label="Entreprise"
                name="company"
                variant="outlined"
                size="small"
                value={driver.company || ''}
                onChange={handleInputChange}
                fullWidth
              />
            ) : (
              <Typography variant="body1"><strong>Entreprise :</strong> {driver.company}</Typography>
            )}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <LocationOnIcon sx={{ color: indigo[400] }} />
            {editing ? (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="agency-select-label">Agence</InputLabel>
                <Select
                  labelId="agency-select-label"
                  value={agency?.id_agency || ''}
                  onChange={handleAgencyChange}
                  label="Agence"
                >
                  {agencies.map((agency) => (
                    <MenuItem key={agency.id_agency} value={agency.id_agency}>
=======
              <Typography variant='body1'>
                <strong>Email :</strong> {driver.email}
              </Typography>
            )}
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            sx={{ mb: 2 }}
          >
            {editing ? (
              <FormControl
                fullWidth
                variant='outlined'
              >
                <InputLabel id='agency-select-label'>Agence</InputLabel>
                <Select
                  labelId='agency-select-label'
                  value={agency?.id_agency || ''}
                  onChange={handleAgencyChange}
                  label='Agence'
                >
                  {agencies.map(agency => (
                    <MenuItem
                      key={agency.id_agency}
                      value={agency.id_agency}
                    >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
                      {agency.city} - {agency.address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
<<<<<<< HEAD
              <Typography variant="body1"><strong>Agence :</strong> {agency ? `${agency.city} - ${agency.address}` : 'Non spécifiée'}</Typography>
=======
              <Typography variant='body1'>
                <strong>Agence :</strong>{' '}
                {agency ? `${agency.city} - ${agency.address}` : 'Non spécifiée'}
              </Typography>
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
            )}
          </Stack>
        </Box>

<<<<<<< HEAD
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
=======
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

<<<<<<< HEAD
export default ProfilDriver;
=======
export default ProfilDriver;
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
