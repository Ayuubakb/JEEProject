import React, { useState } from 'react';
<<<<<<< HEAD
import { Link  , useNavigate } from 'react-router-dom';
=======
import { Link, useNavigate } from 'react-router-dom';
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
import { useDispatch } from 'react-redux';
import { Box, IconButton, InputBase, Menu, MenuItem, Tooltip, Fade } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/img/brand/COLLIFAST.png';
<<<<<<< HEAD
import {logout} from '../../Actions/authAction';
=======
import { logout } from '../../Actions/authAction';
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14

const Navbar = ({ sidebarExpanded }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
<<<<<<< HEAD
  const userId = localStorage.getItem("userId");
  const handleMenuOpen = (event) => {
=======
  const userId = localStorage.getItem('userId');
  const handleMenuOpen = event => {
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfiledriver = () => {
    handleMenuClose();
    navigate(`/driver/${userId}/profildriver`);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
<<<<<<< HEAD
    <Box sx={{ 
        ...styles.navbar, 
        width: sidebarExpanded ? 'calc(100% - 250px)' : '100%', 
        left: sidebarExpanded ? '250px' : '0' 
      }}
    >
      <Box sx={styles.logoContainer}>
        {sidebarExpanded && <img src={logo} alt="Logo COLLIFAST" style={styles.logo} />}
      </Box>

      <Box sx={{
        ...styles.searchContainer,
        marginLeft: sidebarExpanded ? 'auto' : '30px',
      }}>
        <InputBase
          placeholder="Recherche..."
=======
    <Box
      sx={{
        ...styles.navbar,
        width: sidebarExpanded ? 'calc(100% - 250px)' : '100%',
        left: sidebarExpanded ? '250px' : '0',
      }}
    >
      <Box sx={styles.logoContainer}>
        {sidebarExpanded && (
          <img
            src={logo}
            alt='Logo COLLIFAST'
            style={styles.logo}
          />
        )}
      </Box>

      <Box
        sx={{
          ...styles.searchContainer,
          marginLeft: sidebarExpanded ? 'auto' : '30px',
        }}
      >
        <InputBase
          placeholder='Recherche...'
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
          startAdornment={<SearchIcon sx={styles.searchIcon} />}
          sx={styles.searchInput}
        />
      </Box>

      <Box sx={styles.userSection}>
<<<<<<< HEAD
        <Tooltip title="Notifications" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
=======
        <Tooltip
          title='Notifications'
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
          <IconButton sx={styles.icon}>
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
<<<<<<< HEAD
        <Tooltip title="Paramètres" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
=======
        <Tooltip
          title='Paramètres'
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
          <IconButton sx={styles.icon}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>

<<<<<<< HEAD
        <Tooltip title="Compte Utilisateur" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
          <Box sx={styles.userInfo} onClick={handleMenuOpen}>
            <AccountCircleIcon sx={styles.userIcon} />                                      
=======
        <Tooltip
          title='Compte Utilisateur'
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <Box
            sx={styles.userInfo}
            onClick={handleMenuOpen}
          >
            <AccountCircleIcon sx={styles.userIcon} />
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
          </Box>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: styles.menu }}
        >
          <MenuItem onClick={handleProfiledriver}>Profil</MenuItem>
          <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    zIndex: 1000,
    transition: 'width 0.3s, left 0.3s',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  logo: {
    height: '40px',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
    padding: '0 10px',
    width: '320px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#E5E7EB',
    },
  },
  searchIcon: {
    color: '#9CA3AF',
    marginRight: '5px',
  },
  searchInput: {
    flex: 1,
    fontSize: '14px',
    color: '#374151',
    '&::placeholder': {
      color: '#9CA3AF',
    },
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    paddingRight: '30px',
  },
  icon: {
    color: '#4B5563',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#2563EB',
    },
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  userIcon: {
    color: '#4B5563',
    fontSize: '28px',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#2563EB',
      transform: 'scale(1.1)',
    },
  },
  menu: {
    mt: '45px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    '& .MuiMenuItem-root': {
      color: '#374151',
      '&:hover': {
        backgroundColor: '#E0F2FE',
        color: '#2563EB',
      },
    },
  },
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> 7aeb38a1638abbc301b259cc0a2178696bbc8e14
