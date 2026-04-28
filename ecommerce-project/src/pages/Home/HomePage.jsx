import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header.jsx';
import './HomePage.css';
import { ProductsGrid } from './ProductsGrid.jsx';
import { Helmet } from 'react-helmet-async';
import { useLocation, useSearchParams } from 'react-router-dom';

export function HomePage({ cartItems, loadCart }) {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');


    useEffect(() => {
        const fetchProducts = async () => {
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        };
        fetchProducts();
    }, [search]);
    return (
        <>
            <Helmet key={location.pathname}>
                <title>Ecommerce Project</title>
                <link rel="icon" type="image/png" href="/home-favicon.png" />
            </Helmet>
            <Header cartItems={cartItems} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    )
}