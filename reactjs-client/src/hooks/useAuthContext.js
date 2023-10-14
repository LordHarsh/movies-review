import  { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error('useAuthContext must be inside authContextProvider')
    }
    return context;
}