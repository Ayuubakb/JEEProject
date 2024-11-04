import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarDriver from '../Components/Navbars/NavbarDriver';
import SidebarDriver from '../Components/Sidebar/SidebarDriver';
import Footer from '../Components/Footers/Footer';

const LayoutDriver = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavbarDriver />
      <div style={{ display: 'flex', flex: 1, marginTop: '60px', marginBottom: '40px' }}>
        <SidebarDriver />
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5', marginLeft: '250px' }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutDriver;
