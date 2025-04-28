import { useState } from "react";
import api from "../api/axiosConfig";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post("/api/v1/auth/signup", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
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
        throw new Error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
      console.log(error.response.data.message);
      return false;
    }
  };
  return { signup, isLoading, error };
};
