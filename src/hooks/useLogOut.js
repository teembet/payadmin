import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth";
import { useAuthContext } from "./useAuthContext";


const useLogOut = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isAborted, setIsAborted] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch , user} = useAuthContext();

  const logout = () => {
    setIsLoading(true);
    setError(null);

    try {
      AuthService.logout();

      dispatch({ type: "LOGOUT" });

      if (!isAborted) {
        setIsLoading(false);
        setError(null);
        // console.log(user, 'before logout')
        history.push(`/auth-login`)
        // window.reload()
      }
    } catch (error) {
      if (!isAborted) {
        setError(error);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsAborted(true);
    };
  }, []);

  return { isLoading, error, logout };
};

export default useLogOut;
