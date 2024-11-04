import { useDispatch,useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbars/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import Footer from '../Components/Footers/Footer';
import { getOrders } from '../Actions/ordersAction';
import { getClients } from '../Actions/clientAction';
import { getConnectedUser } from '../Actions/authAction';
import { getAgencies } from '../Actions/agencyAction';
import { getDrivers } from '../Actions/driverAction';

const LayoutManager = () => {
    const connectedManager=useSelector(state=>state.authReducer.user)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getConnectedUser())
    },[])
    useEffect(()=>{
        if(connectedManager!=null){
            const orderFilter={
                tracking_status:null,
                company:"",
                sortByPriority:"",
                sortByDate:"",
                city:connectedManager?.city
            }
            const clientFilter={
                company:"",
                sortByOrders:"",
                sortByDate:"",
                city:connectedManager?.city
            }
            const driverFilter={
                name:"",
                sortByMissions:"",
                sortByDate:"",
                city:connectedManager?.city,
                driver_type:null,
                is_available:""
            }
            dispatch(getOrders(orderFilter));
            dispatch(getClients(clientFilter))
            dispatch(getAgencies())
            dispatch(getDrivers(driverFilter))
        }
    },[connectedManager])
  return (
    <div style={styles.layout}>
      <Navbar />
      <div style={styles.main}>
        <Sidebar /> 
        <div style={styles.content}>
          <Outlet /> 
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
export default LayoutManager  