import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth";
import { toast } from "react-toastify";

const useResetPassword = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isAborted, setIsAborted] = useState(false);
  const [error, setError] = useState(null);

  const resetPassword = async (email, token, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await AuthService.resetPassword(email, token, password);
      const { response_code, response_message } = res.data;
      console.log(res);
      if (response_code === "100") {
        toast.warning(`${response_message ? response_message : "Unable to process your request"}`);
        setIsLoading(false);
        throw new Error("Unable to process request");
      }
      toast.success(`${response_message ? response_message : "Password successfully changed"}`);
      setIsLoading(false);
      history.push(`/auth-login`);
    } catch (error) {
      if (!isAborted) {
        console.log(error, "error");
        toast.warning("Error processing request");
        // if (error.response.status === 404) {
        //   warning("Email or Password is incorrect");
        // } else {
        //   warning("Error signing in");
        // }
      }
    }
  };
  useEffect(() => {
    return () => {
      setIsAborted(true);
    };
  }, []);

  return { isLoading, error, resetPassword };
};

export default useResetPassword;
