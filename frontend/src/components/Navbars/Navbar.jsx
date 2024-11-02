import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, InputBase, Menu, MenuItem, Tooltip, Fade } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../../assets/img/brand/COLLIFAST.png';

const Navbar = ({ sidebarExpanded }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
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
          startAdornment={<SearchIcon sx={styles.searchIcon} />}
          sx={styles.searchInput}
        />
      </Box>

      <Box sx={styles.userSection}>
        <Tooltip title="Notifications" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
          <IconButton sx={styles.icon}>
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Paramètres" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
          <IconButton sx={styles.icon}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Compte Utilisateur" arrow TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
          <Box sx={styles.userInfo} onClick={handleMenuOpen}>
            <AccountCircleIcon sx={styles.userIcon} />                                      
          </Box>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ sx: styles.menu }}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Profil</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/change-password">Changer Mot de Passe</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/auth/logout">Déconnexion</MenuItem>
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

export default Navbar;