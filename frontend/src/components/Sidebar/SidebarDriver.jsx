import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/brand/COLLIFAST.png';
import { logout } from '../../Actions/authAction';
import { useDispatch } from 'react-redux';

const SidebarDriver = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(
    localStorage.getItem('sidebar-expanded') === 'true'
  );
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  const menuItems = [
    { text: 'Missions à venir', path: `/driver/${userId}`, icon: <AssignmentIcon /> },
    { text: 'Profil', path: `/driver/${userId}/profildriver`, icon: <HomeIcon /> },
    {
      text: 'Historique Missions',
      path: `/driver/${userId}/historique-missions`,
      icon: <HistoryIcon />,
    },
  ];

  return (
    <Box
      sx={{
        width: sidebarExpanded ? '250px' : '70px',
        backgroundColor: '#ffffff',
        boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)',
        height: '100vh',
        position: 'fixed',
        transition: 'width 0.3s',
        borderRadius: '0 12px 12px 0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 15px',
          justifyContent: 'space-between',
        }}
      >
        {sidebarExpanded && (
          <img
            src={logo}
            alt='COLLIFAST Logo'
            style={{ height: '90px' }}
          />
        )}
        <IconButton onClick={() => setSidebarExpanded(!sidebarExpanded)}>
          {sidebarExpanded ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            style={{ textDecoration: 'none', color: '#333' }}
          >
            <ListItem disablePadding>
              <ListItemButton selected={location.pathname === item.path}>
                <ListItemIcon
                  sx={{ color: location.pathname === item.path ? '#2563EB' : '#6B7280' }}
                >
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
      <Divider />
      <ListItemButton
        onClick={handleLogout}
        sx={{ color: '#EF4444', '&:hover': { backgroundColor: '#FEF2F2' } }}
      >
        <ListItemIcon>
          <LogoutIcon sx={{ color: '#EF4444' }} />
        </ListItemIcon>
        {sidebarExpanded && <ListItemText primary='Déconnexion' />}
      </ListItemButton>
    </Box>
  );
};

export default SidebarDriver;
