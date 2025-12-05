import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPageComponent = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <h1 className="display-1 text-danger fw-bold">404</h1>
            <h2 className="text-dark">Oops! Page Not Found</h2>
            <p className="text-muted text-center">
                The page you're looking for doesn't exist or has been moved. 
                Please check the URL or return to the homepage.
            </p>
            <button 
                className="btn btn-primary mt-3"
                onClick={() => navigate('/')}
            >
                Go Back to Home
            </button>
        </div>
    );
};

export default ErrorPageComponent;
