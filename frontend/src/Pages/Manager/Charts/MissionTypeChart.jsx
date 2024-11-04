import React ,{useEffect,useState} from 'react'
import { PieChart } from '@mui/x-charts'
import { useSelector } from 'react-redux'


const MissionTypeChart = () => {
    const city=useSelector(state=>state.authReducer.user?.city)
    const Orders=useSelector(state=>state.ordersReducers.orders)
    const [ordersToShow,setOrdersToShow]=useState({in_city:0,inter_agency:0})
    useEffect(()=>{
        const in_city=Orders.filter((o)=> o.from===o.to)
        const inter_agency=Orders.filter((o)=> o.from!==o.to)
        setOrdersToShow({in_city:in_city.length,inter_agency:inter_agency.length})
    },[Orders])
    return (
        <div className='chart'>
             <div className='title'>
                <p>Types de missions</p>
            </div>
            <div className='chartDiagram'>
                <PieChart
                    series={[
                        {
                        data: [
                            { id: 0, value: ordersToShow.in_city, label: `sur ${city}`, color: '#4CAF50' },
                            { id: 1, value: ordersToShow.inter_agency, label: 'vers autres villes', color: '#FF9800' },
                        ],
                        },
                    ]}
                    width={600}
                    height={200}
                />
            </div>
        </div>
      )
}

export default MissionTypeChart
