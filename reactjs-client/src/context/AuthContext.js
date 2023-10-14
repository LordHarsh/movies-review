import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: false,
    })

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            dispatch({
                type: 'LOGIN',
                payload: JSON.parse(user),
            });
        }

    }, []);
    console.log("Authentication State: ", state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
};