import React from "react";
import { useAuth } from "./use-auth";

const useRefreshToken = () => {
  const { token, setToken } = useAuth();

  const forceRefreshToken = async func => {
    try {
      const res = await func();

      const newToken = window.localStorage.getItem("token");
      setToken(newToken);

      return res;
    } catch (error) {
      return error;
    }
  };

  return { forceRefreshToken };
};

export default useRefreshToken;
