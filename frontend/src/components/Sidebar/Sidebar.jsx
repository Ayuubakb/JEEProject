import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/img/brand/COLLIFAST.png';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(localStorage.getItem("sidebar-expanded") === "true");
  const userId = localStorage.getItem("userId"); // Récupération de l'ID utilisateur

  // Mise à jour des chemins avec l'ID utilisateur
  const menuItems = [
    { text: 'Gestion des Commandes', path: `/client/${userId}`, icon: <HomeIcon /> },
    { text: 'Nouvelle Commande', path: `/client/${userId}/commande`, icon: <AddShoppingCartIcon /> },
    { text: 'Suivi de Commande', path: `/client/${userId}/suivi-commande`, icon: <LocalShippingIcon /> },
    { text: 'Profil', path: `/client/${userId}/profil`, icon: <PersonIcon /> },
    { text: 'Gestion du Crédit', path: `/client/${userId}/gestion-credit`, icon: <CreditScoreIcon /> },
    { text: 'Support', path: `/client/${userId}/support`, icon: <SupportAgentIcon /> },
  ];

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    document.body.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  return (
    <Box
      ref={sidebarRef}
      sx={{
        ...styles.sidebar,
        width: sidebarExpanded ? '250px' : '70px',
        borderRadius: '0 10px 10px 0',
      }}
    >
      <Box sx={styles.logoContainer}>
        {sidebarExpanded && <img src={logo} alt="COLLIFAST Logo" style={styles.logo} />}
        <IconButton
          onClick={() => setSidebarExpanded(!sidebarExpanded)}
          sx={sidebarExpanded ? styles.collapseButtonExpanded : styles.collapseButtonCollapsed}
        >
          {sidebarExpanded ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider sx={styles.divider} />
      <List>
        {menuItems.map((item, index) => (
          <Link to={item.path} style={styles.link} key={index}>
            <ListItem disablePadding>
              <ListItemButton selected={location.pathname === item.path} sx={styles.listItemButton}>
                <ListItemIcon sx={{ color: location.pathname === item.path ? '#2563EB' : '#6B7280' }}>
                  {item.icon}
                </ListItemIcon>
                {sidebarExpanded && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: location.pathname === item.path ? 'bold' : 'medium',
                      color: location.pathname === item.path ? '#2563EB' : '#374151',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Box sx={styles.logoutContainer}>
        <Divider sx={styles.divider} />
        <ListItemButton component={Link} to="/auth/logout" sx={styles.logoutButton}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#EF4444' }} />
          </ListItemIcon>
          {sidebarExpanded && (
            <ListItemText primary="Déconnexion" primaryTypographyProps={{ fontSize: '0.85rem', color: '#EF4444', fontWeight: 'bold' }} />
          )}
        </ListItemButton>
      </Box>
    </Box>
  );
};

// Styles
const styles = {
  sidebar: {
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    paddingTop: '20px',
    zIndex: 1000,
    transition: 'width 0.3s',
    borderRadius: '0 12px 12px 0',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    justifyContent: 'space-between',
  },
  logo: {
    height: '90px',
    transition: 'height 0.3s',
    margin: '0 auto',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
  listItemButton: {
    borderRadius: '12px',
    margin: '5px 10px',
    '&:hover': {
      backgroundColor: '#E0F2FE',
      color: '#3B82F6',
    },
    '& .MuiListItemIcon-root': {
      transition: 'color 0.3s',
      color: '#9CA3AF',
    },
    '&:hover .MuiListItemIcon-root': {
      color: '#2563EB',
    },
  },
  collapseButtonExpanded: {
    color: '#333',
    marginLeft: 'auto',
    padding: '5px',
    '&:hover': {
      backgroundColor: '#F3F4F6',
    },
  },
  collapseButtonCollapsed: {
    color: '#333',
    padding: '10px',
    marginLeft: 'auto',
    transition: 'all 0.3s',
  },
  divider: {
    backgroundColor: '#E5E7EB',
    marginY: '10px',
  },
  logoutContainer: {
    marginTop: 'auto',
  },
  logoutButton: {
    color: '#333',
    '&:hover': {
      backgroundColor: '#FEF2F2',
    },
  },
};

export default Sidebar;