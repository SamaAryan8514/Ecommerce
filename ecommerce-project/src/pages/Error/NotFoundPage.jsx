import { Helmet } from 'react-helmet-async';
import './NotFoundPage.css';
import { useLocation } from 'react-router-dom';

export function NotFoundPage() {
    const location = useLocation();
    return (
        <>
            <Helmet key={location.pathname}>
                <title>404 Page Not Found</title>
                <link rel="icon" type="image/png" href="/404.png" />
            </Helmet>

            <div className="not-found-message">
                Page not found
            </div>
        </>
    );
}
