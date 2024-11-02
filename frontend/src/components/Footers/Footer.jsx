import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={styles.footer}>
      <Typography variant="body2" sx={styles.text}>
        © 2024 COLLIFAST. Tous droits réservés.
      </Typography>
    </Box>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '12px 20px',
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1000,
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#E5E7EB',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
    fontSize: '14px',
    color: '#6B7280',
    letterSpacing: '0.5px',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#1F2937',
    },
    '&::before, &::after': {
      content: '""',
      display: 'inline-block',
      width: '20px',
      height: '1px',
      backgroundColor: '#9CA3AF',
      margin: '0 8px',
    },
  },
};

export default Footer;