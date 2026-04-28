import { Link, useNavigate, useSearchParams } from 'react-router';
import './header.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function Header({ cartItems }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');
    const [search, setSearch] = useState(searchText || '');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout } = useAuth();

    const updateSearchInput = (event) => {
        setSearch(event.target.value);
    };

    const searchProducts = () => {
        navigate(`/home?search=${search}`);
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    let totalquantity = 0;

    cartItems.forEach((item) => {
        totalquantity += item.quantity;
    });
    const SearchQuantityKeyDown = (event) => {
        const searchKey = event.key;
        if (searchKey === 'Enter') {
            searchProducts();
        } else if (searchKey === 'Escape') {
            setSearch('');
            navigate(`/home`);
        }
    };
    const clearStatus = () => {
        setSearch('');
    };
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <Link to="/home" className="header-link">
                        <img className="logo"
                            src="../public/images/shopZY-logo.png" onClick={clearStatus} />
                        <img className="mobile-logo"
                            src="../public/images/shopZY-logo.png" onClick={clearStatus} />
                    </Link>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" value={search} onChange={updateSearchInput}
                        onKeyDown={SearchQuantityKeyDown} />

                    <button className="search-button" onClick={searchProducts}>
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>
                <div className="right-section">
                    {user ? (
                        <div className="user-menu-container">
                            <button
                                className="user-button header-link"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                title={`${user.firstName} ${user.lastName}`}
                            >
                                <span className="user-avatar">{user.firstName?.[0]}{user.lastName?.[0]}</span>
                            </button>
                            {showUserMenu && (
                                <div className="user-menu-dropdown">
                                    <div className="user-menu-header">
                                        <p className="user-name">{user.firstName} {user.lastName}</p>
                                        <p className="user-email">{user.email}</p>
                                    </div>
                                    <button className="logout-button" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link className="auth-link header-link" to="/auth">
                            <span className="auth-text">Sign In</span>
                        </Link>
                    )}

                    <Link className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </Link>

                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">{totalquantity}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>

            </div>
            <div className="nav-bar">
                <Link className="home header-link" to="/home">
                    <span className="home-text">Home</span>
                </Link>
                <Link className="electronics header-link" to="/home?search=appliances">
                    <span className="electronics-text">Electronics</span>
                </Link>
                <Link className="clothing header-link" to="/home?search=apparel">
                    <span className="clothing-text">Clothing</span>
                </Link>
                <Link className="accessories header-link" to="/home?search=accessories">
                    <span className="accessories-text">Accessories</span>
                </Link>
            </div>
        </>
    )
}