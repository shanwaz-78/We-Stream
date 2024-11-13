
import React from 'react';
import { Navigate } from 'react-router-dom';

const Protected_route = ({ children,isProtected }) => {
    const token = localStorage.getItem('token');

    if (isProtected) {
        if (!token) {
            return <Navigate to="/" replace />;
        }
    } else {
        if (token) {
            return <Navigate to="/dashboard" replace />; 
        }
    }

    return children;
};

export default Protected_route;
