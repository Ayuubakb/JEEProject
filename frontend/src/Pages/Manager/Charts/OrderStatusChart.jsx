import { BarChart } from '@mui/x-charts'
import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

const OrderStatusChart = () => {
    const Orders=useSelector(state=>state.ordersReducers.orders)
    const [ordersToShow,setOrdersToShow]=useState({en_attente:0,en_cargaison:0,en_attente_de_collection:0,collecter:0,en_livraison:0,livrer:0,annuler:0})
    useEffect(()=>{
        const en_attente=Orders.filter((o)=> o.tracking_status==="ProcessingOrder")
        const en_cargaison=Orders.filter((o)=> o.tracking_status==="Shipping")
        const en_attente_de_collection=Orders.filter((o)=> o.tracking_status==="CollectingFromSender")
        const collecter=Orders.filter((o)=> o.tracking_status==="InCollectingAgency")
        const en_livraison=Orders.filter((o)=> o.tracking_status==="DeliveringToReceiver")
        const livrer=Orders.filter((o)=> o.tracking_status==="Delivered")
        const annuler=Orders.filter((o)=> o.tracking_status==="Aborted")
        setOrdersToShow({
            en_attente:en_attente.length,
            en_cargaison:en_cargaison.length,
            en_attente_de_collection: en_attente_de_collection.length,
            collecter:collecter.length,
            en_livraison:en_livraison.length,
            livrer:livrer.length,
            annuler:annuler.length})
    },[Orders])
    return (
        <div className='chart'>
            <div className='title'>
                <p>Status des ordres</p>
            </div>
            <div className='chartDiagram'>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['En attente', 'Collection...','En cargaison', 'Collecter', 'En livraison', 'Livrer', 'Annuler'] }]}
                    series={[
                        {
                        data: [
                            ordersToShow.en_attente,
                            ordersToShow.en_attente_de_collection,
                            ordersToShow.en_cargaison,
                            ordersToShow.collecter,
                            ordersToShow.en_livraison,
                            ordersToShow.livrer,
                            ordersToShow.annuler,
                        ],
                        },
                    ]}
                    width={750}
                    height={300}
                />
            </div>
        </div>
      )
}

export default OrderStatusChart
