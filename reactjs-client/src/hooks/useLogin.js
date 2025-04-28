import { useState } from "react";
import api from "../api/axiosConfig";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setIsLoading(false);
        setError(null);
        const user = {
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          token: response.data.user.token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: user });
        return true;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.message);
      setError(error.response.data.message);
      return false;
    }
  };

  return { login, isLoading, error };
};
