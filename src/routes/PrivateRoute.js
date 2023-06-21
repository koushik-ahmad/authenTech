import React, { useContext } from 'react';
import { AuthContext } from '../contexts/UserContext';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        console.log("loading found");
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && user.uid) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;