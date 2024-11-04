import React, { useState, useEffect } from 'react';
import '../../css/managerStyle.css';
import { PieChart } from '@mui/x-charts';
import OrderTypeChart from './Charts/OrderTypeChart';
import OrderStatusChart from './Charts/OrderStatusChart';
import MissionTypeChart from './Charts/MissionTypeChart';
import { useDispatch, useSelector } from 'react-redux';
import GroupIcon from '@mui/icons-material/Group';
import SavingsIcon from '@mui/icons-material/Savings';
import { getClients } from '../../Actions/clientAction';

const TableauDeBord = () => {
  const dispatch = useDispatch();
  const city = useSelector(state => state.authReducer.user?.city);
  const clients = useSelector(state => state.clientReducer.clients);
  const [sortedClients, setSortedClients] = useState([]);
  useEffect(() => {
    const sortedClients = clients.sort((a, b) => b.numOrders - a.numOrders);
    setSortedClients(sortedClients.slice(0, 3));
  }, [clients]);
  useEffect(() => {
    const clientFilter = {
      company: '',
      sortByOrders: '',
      sortByDate: '',
      city: city,
    };
    dispatch(getClients(clientFilter));
  }, []);
  return (
    <section className='dashboard'>
      <div className='nbreUsers div'>
        <div className='element'>
          <div className='title'>Nombre d'utilisateurs sur {city}</div>
          <div className='data'>
            <GroupIcon fontSize='large' /> {clients.length}
          </div>
        </div>
        <div className='element'>
          <div className='title'>Finance</div>
          <div className='data'>
            <SavingsIcon fontSize='large' /> 15000 DH
          </div>
        </div>
      </div>
      <OrderStatusChart />
      <OrderTypeChart />
      <MissionTypeChart />
      <div className='tableContainer'>
        <div className='title'>
          <p>Nos Meuilleurs Clients : </p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Enteprise</th>
              <th>N° de commandes</th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.map(sc => {
              return (
                <tr>
                  <td>{sc.first_name}</td>
                  <td>{sc.last_name}</td>
                  <td>{sc.company}</td>
                  <td>{sc.numOrders}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableauDeBord;
