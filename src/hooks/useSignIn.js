import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth";
import { useAuthContext } from "./useAuthContext";
import { warning } from "../components/toast/toast";

const useSignIn = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isAborted, setIsAborted] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signIn = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await AuthService.login(email, password);
      const{response_code, user} = res
      if (response_code === "100") {
        // console.log("100 rs code");
        warning("Incorrect Email or Password");
        setIsLoading(false);
        throw new Error("Error signing in. Incorrect Email or Password")
      };
      // console.log(res, "useSignIn res")
      dispatch({ type: "LOGIN", payload: user });
      setIsLoading(false);
      // console.log(user, 'after login')

      history.push(`/dashboard`);

      if (!isAborted) {
        setIsLoading(false);
        setError(null);
      }
    } catch (error) {
      if (!isAborted) {
        console.log(error, "error");

        if (error.response.status === 404) {
          warning("Email or Password is incorrect");
        } else {
          warning("Error signing in");
        }
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsAborted(true);
    };
  }, []);

  return { isLoading, error, signIn };
};

export default useSignIn;
