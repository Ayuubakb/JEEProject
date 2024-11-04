import { PieChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const OrderTypeChart = () => {
  const Orders = useSelector(state => state.ordersReducers.orders);
  const [ordersToShow, setOrdersToShow] = useState({ express: 0, normal: 0 });
  useEffect(() => {
    const normalOrders = Orders.filter(o => o.orderType === 'Normal');
    const expressOrders = Orders.filter(o => o.orderType === 'Express');
    setOrdersToShow({ express: expressOrders.length, normal: normalOrders.length });
  }, [Orders]);
  return (
    <div className='chart'>
      <div className='title'>
        <p>Type d'Ordre</p>
      </div>
      <div className='chartDiagram'>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: ordersToShow.express, label: 'Express' },
                { id: 1, value: ordersToShow.normal, label: 'Normal' },
              ],
            },
          ]}
          width={500}
          height={200}
        />
      </div>
    </div>
  );
};

export default OrderTypeChart;
