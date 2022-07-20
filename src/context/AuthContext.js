import { createContext, useReducer } from "react";
import AuthService from "../services/auth";

export const AuthContext = createContext();

// const initialState= {
//     isAuthenticated: false,
//     user: AuthService.getUser(),
// }

export const authReducer = (state, action) => {
    switch (action) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
              };
            
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
    
        default:
            return state
    
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer( authReducer , {user: AuthService.getUser(),});

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
          {children}
        </AuthContext.Provider>
      );
}