// src/layouts/LayoutClient.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbars/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import Footer from '../Components/Footers/Footer';

const LayoutClient = () => {
  return (
    <div style={styles.layout}>
      <Navbar />
      <div style={styles.main}>
        <Sidebar /> {/* Sidebar affichée ici pour toutes les pages */}
        <div style={styles.content}>
          <Outlet />  {/* Charge la page courante */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    display: 'flex',
    flex: 1,
    marginTop: '60px', // Hauteur approximative de la navbar
    marginBottom: '40px', // Hauteur approximative du footer
  },
  content: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f5f5f5',
    marginLeft: '250px', // Largeur de la sidebar
  },
};

export default LayoutClient;