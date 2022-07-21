import { createContext, useReducer } from "react";
import AuthService from "../services/auth";

export const AuthContext = createContext();

const initialState= {
    isAuthenticated: false,
    user: AuthService.getUser(),
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.payload, "dispatched");
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer,initialState );

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
