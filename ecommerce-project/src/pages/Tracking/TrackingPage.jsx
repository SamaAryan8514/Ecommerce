import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { Header } from '../../components/Header';
import './TrackingPage.css';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export function TrackingPage({ cartItems }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`${API_URL}/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        };

        fetchTrackingData();
    }, [orderId]);
    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });

    const totalDeliveryTimeMS = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMS;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMS;
    let deliveryPercent = (timePassedMs / totalDeliveryTimeMS) * 100;
    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return (
        <>
        <Helmet key={location.pathname}>
            <title>Tracking</title>
            <link rel="icon" type="image/png" href="/tracking.png" />
        </Helmet>

            <Header cartItems={cartItems} />


            <div className="tracking-page">
                <div className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </a>

                    <div className="delivery-date">
                        Arriving on {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on '}


                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
