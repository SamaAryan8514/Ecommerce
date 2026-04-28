import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import './AuthPage.css';

export function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login, register, error } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormError('');
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setLoading(true);

        try {
            if (isLogin) {
                // Login validation
                if (!formData.email || !formData.password) {
                    setFormError('Please fill in all fields');
                    return;
                }
                if (!validateEmail(formData.email)) {
                    setFormError('Invalid email format');
                    return;
                }

                await login(formData.email, formData.password);
                navigate('/home');
            } else {
                // Register validation
                if (
                    !formData.email ||
                    !formData.password ||
                    !formData.confirmPassword ||
                    !formData.firstName ||
                    !formData.lastName
                ) {
                    setFormError('Please fill in all fields');
                    return;
                }
                if (!validateEmail(formData.email)) {
                    setFormError('Invalid email format');
                    return;
                }
                if (formData.password.length < 6) {
                    setFormError('Password must be at least 6 characters');
                    return;
                }
                if (formData.password !== formData.confirmPassword) {
                    setFormError('Passwords do not match');
                    return;
                }

                await register({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                });
                navigate('/home');
            }
        } catch (err) {
            setFormError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormError('');
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
        });
    };

    return (
        <>
            <Helmet key={location.pathname}>
                <title>Auth</title>
                <link rel="icon" type="image/png" href="/auth-icon.png" />
            </Helmet>
            <div className="auth-page">
                <div className="auth-container">
                    <div className="auth-card">
                        <h1 className="auth-title">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="auth-subtitle">
                            {isLogin
                                ? 'Sign in to your account'
                                : 'Sign up to get started'}
                        </p>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {(formError || error) && (
                                <div className="error-message">
                                    {formError || error}
                                </div>
                            )}

                            {!isLogin && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />
                            </div>

                            {!isLogin && (
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                    />
                                </div>
                            )}
                            <button
                                type="submit"
                                className="auth-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        {isLogin ? 'Signing in...' : 'Creating account...'}
                                    </>
                                ) : (
                                    isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                {isLogin
                                    ? "Don't have an account? "
                                    : 'Already have an account? '}
                                <button
                                    type="button"
                                    className="toggle-button"
                                    onClick={toggleMode}
                                >
                                    {isLogin ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                        </div>
                    </div>

                    <div className="auth-info">
                        <div className="info-item">
                            <h3>🛍️ Easy Shopping</h3>
                            <p>Browse and buy your favorite products</p>
                        </div>
                        <div className="info-item">
                            <h3>📦 Fast Delivery</h3>
                            <p>Track your orders in real-time</p>
                        </div>
                        <div className="info-item">
                            <h3>🔒 Secure</h3>
                            <p>Your data is safe with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
