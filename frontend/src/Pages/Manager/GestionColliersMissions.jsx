import React, { useEffect, useState } from 'react';
import {
  Typography, Box, CircularProgress, Card, CardContent, Divider, Grid, Chip, Tooltip, Button, Drawer, Avatar, Stack, Paper, Dialog, DialogTitle, DialogActions
} from '@mui/material';
import axios from 'axios';
import { getAuthConfig } from '../../Actions/config';
import { motion } from 'framer-motion';
import Select from 'react-select';
import { FaShippingFast, FaRegCalendarAlt, FaMoneyBillWave, FaTruck, FaCheckCircle, FaCircle, FaTrashAlt } from 'react-icons/fa';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/system';
import { useSnackbar } from 'notistack';  
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Actions/ordersAction';

const GestionColliersMissions = () => {
    const { enqueueSnackbar } = useSnackbar(); 
    const [filteredOrders, setFilteredOrders] = useState([]);
    const dispatch=useDispatch()
    const city=useSelector(state=>state.authReducer.user?.city)
    const ordersTmp=useSelector(state=>state.ordersReducers.orders)
    const drivers=useSelector(state=>state.driverReducer.drivers)
    const statusColors = {
        ProcessingOrder: '#FFA726',
        CollectingFromSender: '#29B6F6',
        InCollectingAgency: '#AB47BC',
        Shipping: '#FF7043',
        InReceivingAgency: '#66BB6A',
        DeliveringToReceiver: '#42A5F5',
        Delivered: '#8BC34A',
        Aborted: '#E57373',
      };
    const statusOptions = [
        { value: 'All', label: '🟢 All' },
        { value: 'ProcessingOrder', label: '🔄 Processing Order' },
        { value: 'CollectingFromSender', label: '📦 Collecting From Sender' },
        { value: 'InCollectingAgency', label: '🏢 In Collecting Agency' },
        { value: 'Shipping', label: '🚚 Shipping' },
        { value: 'InReceivingAgency', label: '🏠 In Receiving Agency' },
        { value: 'DeliveringToReceiver', label: '🚛 Delivering to Receiver' },
        { value: 'Delivered', label: '✅ Delivered' },
        { value: 'Aborted', label: '❌ Aborted' },
    ];
    const orderFilter={
        tracking_status:null,
        company:"",
        sortByPriority:"",
        sortByDate:"",
        city:city
    }
    const statusSteps = [
        'ProcessingOrder',
        'CollectingFromSender',
        'InCollectingAgency',
        'Shipping',
        'InReceivingAgency',
        'DeliveringToReceiver',
        'Delivered',
      ];
      const CustomConnector = styled(StepConnector)(({ theme }) => ({
        '& .MuiStepConnector-line': {
          borderColor: '#4CAF50',
          borderTopWidth: 4,
        },
      }));
    const [missionFilter,setMissionFilter]=useState({tracking_status:null})
    const [dialogOpen, setDialogOpen] = useState(false);
    const [orders,setOrders]=useState([])
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [updatingOrder,setUpdatingOrder]=useState(false)
    const [availableDrivers,setAvailableDrivers]=useState([])
    const [possibleDrivers,setPossibleDrivers]=useState([])
    const [selectedDriver,setSelectedDriver]=useState(0)
    const [nextStep,setNextStep]=useState("")
    const [err,setErr]=useState({msg:null,is_created:null})
    const handleNextStep=(selectedOrder,tracking_status)=>{
        if(tracking_status==="ProcessingOrder"){
            setPossibleDrivers(availableDrivers.filter((ad)=>ad.driver_type==="In_City"))
            setNextStep("CollectingFromSender")
        }else if(tracking_status==="InCollectingAgency"){
            if(selectedOrder.to===city){
                setPossibleDrivers(availableDrivers.filter((ad)=>ad.driver_type==="In_City"))
                setNextStep("DeliveringToReceiver")
            }else{
                setPossibleDrivers(availableDrivers.filter((ad)=>ad.driver_type==="Inter_agency"))
                setNextStep("Shipping")
            }
        }else if(tracking_status==="InReceivingAgency"){
            setPossibleDrivers(availableDrivers.filter((ad)=>ad.driver_type==="In_City"))
            setNextStep("DeliveringToReceiver")
        }
        setUpdatingOrder(true)
    }
    const handleDesign=async()=>{
        if(selectedDriver !== 0 && selectedOrder!==null){
            const config=getAuthConfig()
            let mission={
                mission_type:"In_City",
                driver:{
                    id_user:selectedDriver
                },
                orders:[
                    {idOrder:selectedOrder.idOrder}
                ]
            }
            if(nextStep==="Shipping")
                mission={...mission,mission_type:"Inter_agency",from_city:selectedOrder.from,to_city:selectedOrder.to}
            else if(nextStep==="DeliveringToReceiver")
                mission={...mission,from_city:selectedOrder.to,to_city:selectedOrder.to}
            else if(nextStep==="CollectingFromSender")
                mission={...mission,from_city:selectedOrder.from,to_city:selectedOrder.from}
            console.log(mission);
            
            try{
                const response=await fetch(`${process.env.REACT_APP_SERVER_URI}/missions/add`,{
                    method:"POST",
                    ...config,
                    body:JSON.stringify(mission)
                })
                if(!response.ok){
                    setErr({msg:"Une Erreur est survenu",is_created:false})
                }else{
                    try{
                        const res2=await fetch(`${process.env.REACT_APP_SERVER_URI}/order/updateStatus/${selectedOrder.idOrder}/${nextStep}`,{
                            method:"PUT",
                            ...config,
                        })
                        if(!res2.ok)
                            setErr({msg:"Une Erreur est survenu",is_created:true})
                    }catch{
                        setErr({msg:"Mission Créer mais status non màj",is_created:true})
                    }
                    dispatch(getOrders(orderFilter))
                    setErr({msg:"Mission Créer",is_created:true})
                }
            }catch{
                setErr({msg:"Une Erreur est survenu",is_created:false})
            }
            setSelectedDriver(0)
            setUpdatingOrder(false)
        }
    }
    const handleDecline=()=>{
        
    }
    const handleInputChange=(e)=>{
        if(e.target.value=="All")
            setOrders(ordersTmp)
        else
            setOrders(ordersTmp.filter((o)=>o.tracking_status===e.target.value))
    }
    const handleOpenDrawer = (order) => {
        setSelectedOrder(order);
        setDrawerOpen(true);
    };
    
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedOrder(null);
    setErr({msg:null,is_created:null})
  };
    useEffect(()=>{
        if(ordersTmp!==null)
            setOrders(ordersTmp)
    },[ordersTmp])
    useEffect(()=>{
        if(drivers!=null)
            setAvailableDrivers(drivers.filter((d)=>d.is_available===true))
    },[drivers])
    const handleOpenDialog = (orderId) => {
        setOrderToDelete(orderId);
        setDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setOrderToDelete(null);
    };
    const handleDeleteOrder = async () => {
        try {
          await axios.delete(
            `${process.env.REACT_APP_SERVER_URI}/order/delete/${orderToDelete}`,
            getAuthConfig()
          );
          setFilteredOrders(filteredOrders.filter(order => order.idOrder !== orderToDelete));
          enqueueSnackbar('Commande supprimée avec succès!', { variant: 'success' }); // Afficher message succès
          dispatch(getOrders(orderFilter))
          handleCloseDialog();
          handleCloseDrawer();
        } catch (error) {
          enqueueSnackbar('Échec de la suppression de la commande.', { variant: 'error' }); // Afficher message échec
          console.error('Erreur lors de la suppression de la commande :', error);
        }
    };
  return (
    <section className='gestionMissions'>
        <div className='filterMissions'>
            <select name='tracking_status' onChange={(e)=>handleInputChange(e)}>
                {
                    statusOptions.map((s)=>{
                        return(
                            <option value={s.value}>{s.label}</option>
                        )
                    })
                }
            </select>
        </div>
        <div className='missionsContainer'>
        {
            orders.length===0?
                <div style={{marginTop:"25px",textAlign:"center",padding:'15px',backgroundColor:"blue",fontSize:"20px",fontFamily:"Trebuchet MS",color:"white",width:"75%",marginLeft:"12.5%",borderRadius:"15px"}}>
                    Il n'y a pas d'ordres de ce status pour le moment
                </div>
            :orders.map((order)=>{
                return(
                    <div className='card'>
                        <Card
                        sx={{
                            background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                            borderRadius: 5,
                            overflow: 'hidden',
                            height:"400px"
                        }}
                        >
                        <CardContent sx={{ padding: 3 }}>
                            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                            <Avatar sx={{ bgcolor: '#1E88E5', mr: 1 }}>
                                <FaTruck />
                            </Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#333' }}>
                                {order.receiver} - {order.to}
                            </Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" flexDirection="column" gap={1}>
                            <Chip
                                label={order.tracking_status}
                                sx={{
                                backgroundColor: statusColors[order.tracking_status],
                                color: 'white',
                                fontWeight: 'bold',
                                }}
                            />
                            <Box display="flex" alignItems="center" gap={1}>
                                <FaShippingFast style={{ color: '#1E88E5', fontSize: '1.3em' }} />
                                <Typography variant="body1">
                                <strong>Type :</strong> {order.orderType}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FaRegCalendarAlt style={{ color: '#1E88E5', fontSize: '1.3em' }} />
                                <Typography variant="body1">
                                <strong>Date :</strong> {new Date(order.date).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <FaMoneyBillWave style={{ color: '#388e3c', fontSize: '1.3em' }} />
                                <Typography variant="body1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                                Prix : {order.price} MAD
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={() => handleOpenDrawer(order)}
                            >
                                Détails
                            </Button>
                            {order.tracking_status === "ProcessingOrder" && (
                                <Button
                                variant="contained"
                                color="error"
                                sx={{ mt: 2 }}
                                startIcon={<FaTrashAlt />}
                                onClick={() => handleOpenDialog(order.idOrder)}
                                >
                                Supprimer
                                </Button>
                            )}
                            </Box>
                        </CardContent>
                    </Card>
                    </div>
                )
            })
        }
        </div>
        <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <Box sx={{width: 600, padding: 4, backgroundColor: '#f8f9fa', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)', borderRadius: 2 }}>
          {selectedOrder && (
            <>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#1E88E5', textAlign: 'center' }}>
                Détails de la Commande
              </Typography>
              <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#ffffff', borderRadius: 3, mb: 4 }}>
                <Stack spacing={2}>
                  <Typography variant="body1">
                    <strong>Destinataire :</strong> {selectedOrder.receiver}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Ville :</strong> {selectedOrder.to}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Type de Commande :</strong> {selectedOrder.orderType}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Date :</strong> {new Date(selectedOrder.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Prix :</strong> {selectedOrder.price} MAD
                  </Typography>
                  <Typography variant="body1">
                    <strong>Poids :</strong> {selectedOrder.weight} kg
                  </Typography>
                </Stack>
              </Paper>
              <Box sx={{ my: 4 }}>
                <Stepper alternativeLabel activeStep={statusSteps.indexOf(selectedOrder.tracking_status)} connector={<CustomConnector />}>
                  {statusSteps.map((status, index) => (
                    <Step key={status}>
                      <StepLabel
                        icon={
                          statusSteps.indexOf(selectedOrder.tracking_status) > index ? (
                            <FaCheckCircle style={{ color: '#4CAF50', fontSize: '1.5em' }} />
                          ) : statusSteps.indexOf(selectedOrder.tracking_status) === index ? (
                            <FaCircle style={{ color: '#4CAF50', fontSize: '1.5em' }} />
                          ) : (
                            <FaCircle style={{ color: '#e0e0e0', fontSize: '1.2em' }} />
                          )
                        }
                      >
                        {status.replace(/([A-Z])/g, ' $1').trim()}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              {
                ((selectedOrder.tracking_status==="ProcessingOrder" && city===selectedOrder.from)
                ||(selectedOrder.tracking_status==="InCollectingAgency" && selectedOrder.from===city)
                || (selectedOrder.tracking_status==="InReceivingAgency" && selectedOrder.to===city)) 
                && !updatingOrder  ?
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>handleNextStep(selectedOrder,selectedOrder.tracking_status)}
                    sx={{ mt: 3, display: 'block', mx: 'auto', width: '50%' }}
                >
                    Màj à l'étape suivante
                </Button> : null
                }
                {
                    updatingOrder ?
                    <div style={{display:"flex", alignItems:"center",justifyContent:"space-around"}}>
                        <select style={{flex:"0 0 70%", padding:"10px", borderRadius:"10px"}} name="selectedDriver" onChange={(e)=>setSelectedDriver(e.target.value)}>
                            <option value={0}>Choisit un conducteur</option>
                            {
                                possibleDrivers.map((ad)=>{
                                    return(
                                        <option value={ad.id_user}>{ad.first_name} {ad.last_name}</option>  
                                    )
                                })
                            }
                        </select>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDesign}
                            sx={{mx: 'auto', width: '25%' }}
                        >
                            Créer
                        </Button>
                    </div>:null
                }
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseDrawer}
                sx={{ mt: 3, display: 'block', mx: 'auto', width: '50%' }}
              >
                Fermer
              </Button>
            </>
          )}
        </Box>
        
            {
            err.msg!==null?
                <p style={{marginTop:"20px",padding:"5px",borderRadius:"7px",backgroundColor:err.is_created?"green":"red",width:"75%",marginLeft:"12.5%",textAlign:"center",color:"white"}}>
                    {err.msg}
                </p>
            :null
            }
      </Drawer>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle sx={{ textAlign: 'center', color: '#d32f2f', fontWeight: 'bold' }}>
          Confirmer la suppression
        </DialogTitle>
        <DialogActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
          <Button
            onClick={handleCloseDialog}
            color='primary'
            variant='outlined'
          >
            Annuler
          </Button>
          <Button
            onClick={handleDeleteOrder}
            color='error'
            variant='contained'
            sx={{
              backgroundColor: '#d32f2f',
              color: 'white',
              ':hover': { backgroundColor: '#b71c1c' },
            }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  )
}

export default GestionColliersMissions
