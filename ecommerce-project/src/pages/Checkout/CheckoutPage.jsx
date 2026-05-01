import axios from 'axios';
import { useState, useEffect } from 'react';
import './checkout-header.css';
import './CheckoutPage.css';
import { OrderSummary } from './OrderSummary.jsx';
import { PaymentSummary } from './PaymentSummary.jsx';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export function CheckoutPage({ cartItems, loadCart }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get(`${API_URL}/api/delivery-options?expand=estimatedDeliveryTime`);
            setDeliveryOptions(response.data);

            response = await axios.get(`${API_URL}/api/payment-summary`);
            setPaymentSummary(response.data);
        };
        fetchData();
    }, [cartItems]);
    return (
        <>
            <Helmet key={location.pathname}>
                <title>Checkout</title>
                <link rel="icon" type="image/png" href="/checkout.png" />
            </Helmet>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/home">
                            <img className="logo" src="/images/shopzy-logo.png" />
                            <img className="mobile-logo" src="/images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/home">{cartItems.length} items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cartItems={cartItems} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />

                </div>
            </div>
        </>
    )
}
