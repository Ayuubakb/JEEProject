import { Add, Delete, SearchOff, SearchSharp } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthConfig } from '../../Actions/config';
import { getClients } from '../../Actions/clientAction';
import { getDrivers } from '../../Actions/driverAction';

const GestionUtilisateurs = () => {
  const dispatch = useDispatch();
  const city = useSelector(state => state.authReducer.user?.city);
  const clients = useSelector(state => state.clientReducer.clients);
  const drivers = useSelector(state => state.driverReducer.drivers);
  const [clientsToShow, setClientsToShow] = useState([]);
  const [driversToShow, setDriversToShow] = useState([]);
  const [clientFilters, setClientFilters] = useState({
    sortByDate: '',
    sortByOrders: '',
    city: null,
    company: '',
  });
  const [driverFilters, setDriverFilters] = useState({
    name: '',
    sortByDate: '',
    sortByMissions: '',
    city: null,
    driver_type: null,
    is_available: '',
  });

  const handleInputChange = (e, setFilter) => {
    setFilter(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    if (city != null) {
      setClientFilters(prev => {
        return { ...prev, city: city };
      });
      setDriverFilters(prev => {
        return { ...prev, city: city };
      });
    }
  }, [city]);
  const handleGetClients = () => {
    dispatch(getClients(clientFilters));
  };
  const handleGetDrivers = () => {
    let driverTmp = driverFilters;
    if (driverFilters.driver_type === '') driverTmp = { ...driverFilters, driver_type: null };
    dispatch(getDrivers(driverTmp));
  };
  const handleDelete = async (id, role) => {
    const config = getAuthConfig();
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/user/is_active/${id}/false`, {
      method: 'PUT',
      ...config,
    });
    if (response.ok) {
      if (role === 'Client') dispatch(getClients(clientFilters));
      else dispatch(getDrivers(driverFilters));
    }
  };
  const handleActivate = async (id, role) => {
    const config = getAuthConfig();
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/user/is_active/${id}/true`, {
      method: 'PUT',
      ...config,
    });
    if (response.ok) {
      if (role === 'Client') dispatch(getClients(clientFilters));
      else dispatch(getDrivers(driverFilters));
    }
  };
  useEffect(() => {
    setClientsToShow(clients);
    setDriversToShow(drivers);
  }, [clients, drivers]);
  return (
    <section className='manageUsers'>
      <div className='clients'>
        <h1>Gestions Des Clients : </h1>
        <div className='filters'>
          <div>
            <label>Trier par ordres : </label>
            <select
              name='sortByOrders'
              value={clientFilters.sortByOrders}
              onChange={e => handleInputChange(e, setClientFilters)}
            >
              <option value=''>--par defaut--</option>
              <option value='DESC'>Desc</option>
              <option value='ASC'>Asc</option>
            </select>
          </div>
          <div>
            <label>Entreprise : </label>
            <input
              type='text'
              name='company'
              value={clientFilters.company}
              onChange={e => handleInputChange(e, setClientFilters)}
            />
          </div>
          <div>
            <button onClick={handleGetClients}>
              <SearchSharp />
            </button>
          </div>
        </div>
        <div className='tables'>
          <table className='styled-table'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>Company</th>
                <th>Address</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clientsToShow.map(user => {
                return (
                  <tr>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.city}</td>
                    <td>{user.company}</td>
                    <td>{user.address}</td>
                    <td>{user.email}</td>
                    <td>{user.numOrders}</td>
                    {user.is_active ? (
                      <td
                        style={{
                          color: 'red',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}
                        onClick={() => handleDelete(user.id_user, 'Client')}
                      >
                        <Delete />
                      </td>
                    ) : (
                      <td
                        style={{
                          color: 'green',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}
                        onClick={() => handleActivate(user.id_user, 'Client')}
                      >
                        <Add />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='drivers'>
        <h1>Gestion des Conducteurs : </h1>
        <div className='filters'>
          <div>
            <label>Trier par missions : </label>
            <select
              name='sortByMissions'
              value={driverFilters.sortByMissions}
              onChange={e => handleInputChange(e, setDriverFilters)}
            >
              <option value=''>--par defaut--</option>
              <option value='DESC'>Desc</option>
              <option value='ASC'>Asc</option>
            </select>
          </div>
          <div>
            <label>Type : </label>
            <select
              name='driver_type'
              value={driverFilters.driver_type}
              onChange={e => handleInputChange(e, setDriverFilters)}
            >
              <option value=''>--par default--</option>
              <option value='Inter_agency'>Cargaison</option>
              <option value='In_City'>Même ville</option>
            </select>
          </div>
          <div>
            <label>Disponibilité : </label>
            <select
              name='is_available'
              value={driverFilters.is_available}
              onChange={e => handleInputChange(e, setDriverFilters)}
            >
              <option value=''>--par defaut--</option>
              <option value={true}>Oui</option>
              <option value={false}>Non</option>
            </select>
          </div>
          <div>
            <button onClick={handleGetDrivers}>
              <SearchSharp />
            </button>
          </div>
        </div>
        <div className='tables'>
          <table className='styled-table'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>City</th>
                <th>Driver Type</th>
                <th>Availability</th>
                <th>Email</th>
                <th>Missions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {driversToShow.map(user => {
                return (
                  <tr>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.city}</td>
                    <td>{user.driver_type}</td>
                    <td>{user.is_available ? 'disponible' : 'indisponible'}</td>
                    <td>{user.email}</td>
                    <td>{user.numMissions}</td>
                    {user.is_active ? (
                      <td
                        style={{
                          color: 'red',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}
                        onClick={() => handleDelete(user.id_user, 'Driver')}
                      >
                        <Delete />
                      </td>
                    ) : (
                      <td
                        style={{
                          color: 'green',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}
                        onClick={() => handleActivate(user.id_user, 'Driver')}
                      >
                        <Add />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default GestionUtilisateurs;
