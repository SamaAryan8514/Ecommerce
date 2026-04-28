import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import './OrdersPage.css';

import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({ cartItems, loadCart }) {
    const location = useLocation();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        };
        fetchOrders();
    }, []);

    return (
        <>
            <Helmet key={location.pathname}>
                <title>Orders</title>
                <link rel="icon" type="image/png" href="/orders-icon.png" />
            </Helmet>

            <Header cartItems={cartItems} />


            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    )
}