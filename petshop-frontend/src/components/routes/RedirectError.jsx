import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToError = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/error');
    }, [navigate]);

    return null; // No UI is rendered
};

export default RedirectToError;
