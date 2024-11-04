import React, { useState } from 'react';
import { Card, CardContent, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/img/brand/COLLIFAST.png';
// import backgroundImage from '../assets/img/brand/background.jpg';
import Step1 from '../Components/Steps/Step1';
import Step2 from '../Components/Steps/Step2';
import Step3 from '../Components/Steps/Step3';
import ProgressBar from '../Components/ProgressBar';
import '../assets/css/Register.css';
import axios from 'axios';
import { ToastContainer, toast, Slide, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  // const [showPhoneError, setShowPhoneError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    // phone: '',
    companyName: '',
    address: '',
    password: '',
    confirmPassword: '',
    agencyId: '', // Add agencyId field
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = field => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  // const validatePhone = () => {
  //   const phoneRegex = /^(06|07|08)\d{8}$/;
  //   return phoneRegex.test(formData.phone);
  // };

  const validatePassword = () => formData.password === formData.confirmPassword;

  const nextStep = () => {
    if (currentStep === 1) {
      // setShowPhoneError(false);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URI}/client/save`,
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: 'Client',
            company: formData.companyName,
            address: formData.address,
            agency: { id_agency: formData.agencyId }, // Wrap id_agency in agency object
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        toast.success('Inscription réussie ! Vous allez être redirigé vers la page de connexion.', {
          position: 'top-center',
          transition: Zoom,
          autoClose: 1000,
          onClose: () => {
            window.location.href = '/auth/login';
          },
          style: {
            backgroundColor: '#d4edda',
            color: '#155724',
            fontWeight: 'bold',
            boxShadow: '0px 0px 10px rgba(0, 128, 0, 0.3)',
          },
        });
        setErrorMessage(''); // Clear any previous error messages after success
      } catch (error) {
        const newErrorMessage =
          error.response?.data || "Erreur lors de l'inscription, veuillez réessayer.";

        // Only show a new toast if the message has changed
        if (newErrorMessage !== errorMessage) {
          setErrorMessage(newErrorMessage);
          toast.error(newErrorMessage, {
            position: 'top-center',
            transition: Slide,
            autoClose: 1000,
            style: {
              backgroundColor: '#f8d7da',
              color: '#721c24',
              fontWeight: 'bold',
              boxShadow: '0px 0px 10px rgba(128, 0, 0, 0.3)',
            },
          });
        }
      }
    } else {
      toast.warn('Les mots de passe ne correspondent pas.', {
        position: 'top-center',
        autoClose: 1000,
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
    <Box
      sx={{
        backgroundImage:
          'url(https://static.vecteezy.com/system/resources/previews/003/340/097/original/courier-with-the-parcel-on-the-background-of-the-delivery-service-van-vector.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth='sm'>
        <Card
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <img
              src={logo}
              alt='Logo'
              style={{ width: '300px', marginBottom: '20px' }}
            />
            <ProgressBar currentStep={currentStep} />
            {errorMessage && (
              <Typography
                color='error'
                sx={{ mb: 2 }}
              >
                {errorMessage}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <Step1
                  formData={formData}
                  handleInputChange={handleInputChange}
                  // validatePhone={validatePhone}
                  // showPhoneError={showPhoneError}
                  // setShowPhoneError={setShowPhoneError}
                  nextStep={nextStep}
                />
              )}
              {currentStep === 2 && (
                <Step2
                  formData={formData}
                  handleInputChange={handleInputChange}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              )}
              {currentStep === 3 && (
                <Step3
                  formData={formData}
                  handleInputChange={handleInputChange}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                  validatePassword={validatePassword}
                  prevStep={prevStep}
                  handleSubmit={handleSubmit}
                />
              )}
              <Typography
                variant='body2'
                sx={{ mt: 2 }}
              >
                Vous avez déjà un compte ?
                <Link
                  to='/auth/login'
                  style={{
                    color: 'green',
                    marginLeft: '5px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                  }}
                  onMouseOver={e => (e.target.style.textDecoration = 'underline')}
                  onMouseOut={e => (e.target.style.textDecoration = 'none')}
                >
                  Connectez-vous
                </Link>
              </Typography>
            </form>
            <ToastContainer />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
