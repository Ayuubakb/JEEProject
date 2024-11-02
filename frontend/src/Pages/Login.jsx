// src/Pages/Login.jsx
import React, { useState } from 'react'; 
import { Button, Card, CardContent, Container, Typography, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import { Email as EmailIcon, Visibility, VisibilityOff, Lock as LockIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {login} from '../Actions/authAction';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Zoom, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../assets/img/brand/COLLIFAST.png";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (inputs.email && inputs.password) {
          const res = await dispatch(login(inputs.email, inputs.password));
          if (res.err) {
            const errorText = res.err || "Erreur de connexion, veuillez réessayer.";
            setErrorMessage(errorText);
            toast.error(errorText, {
              position: "top-center",
              transition: Slide,
              autoClose: 5000,
              style: {
                backgroundColor: '#f8d7da',
                color: '#721c24',
                fontWeight: 'bold',
                boxShadow: '0px 0px 10px rgba(128, 0, 0, 0.3)',
              },
            });
          } else {
            toast.success("Connexion réussie !", {
              position: "top-center",
              transition: Zoom,
              autoClose: 3000,
              onClose: () => {
                const userId = res.userId;
                if (res.role === "Client") {
                  navigate(`/client/${userId}`);
                } else if (res.role === "Manager") {
                  navigate(`/manager/${userId}`);
                } else if (res.role === "Driver") {
                  navigate(`/driver/${userId}`);
                } else {
                  navigate("/"); // Redirection par défaut si le rôle n'est pas reconnu
                }
              },
              style: {
                backgroundColor: '#d4edda',
                color: '#155724',
                fontWeight: 'bold',
                boxShadow: '0px 0px 10px rgba(0, 128, 0, 0.3)',
              },
            });
          }
        } else {
          toast.warn("Veuillez remplir tous les champs.", {
            position: "top-center",
            autoClose: 3000,
            style: {
              backgroundColor: '#fff3cd',
              color: '#856404',
              fontWeight: 'bold',
              boxShadow: '0px 0px 10px rgba(255, 193, 7, 0.3)',
            },
          });
        }
      };
      
  return (
    <Box sx={{ 
      backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/003/340/097/original/courier-with-the-parcel-on-the-background-of-the-delivery-service-van-vector.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Container maxWidth="sm">
        <Card 
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '300px', marginBottom: '20px' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
              Connexion
            </Typography>

            {errorMessage && (
              <Typography color="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Typography>
            )}

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={inputs.email}
                onChange={(e) => setInputs((prev) => ({ ...prev, email: e.target.value }))}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Mot de passe"
                name="password"
                type={showPassword ? "text" : "password"}
                value={inputs.password}
                onChange={(e) => setInputs((prev) => ({ ...prev, password: e.target.value }))}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  backgroundColor: 'green',
                  ':hover': {
                    backgroundColor: '#006400',
                  },
                }}
              >
                Connexion
              </Button>
            </form>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Pas encore de compte ? 
              <Link 
                to="/auth/register" 
                style={{ 
                  color: 'green', 
                  marginLeft: '5px', 
                  fontWeight: 'bold', 
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
              >
                Inscrivez-vous
              </Link>
            </Typography>
            <ToastContainer />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;