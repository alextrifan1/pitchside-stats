import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

    const token = useSelector((state: any) => state.auth.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};