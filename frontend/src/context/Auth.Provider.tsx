/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { LoginForm } from "../types/typesFetch/Login.Form.Type";
import { RegisterForm } from "../types/typesFetch/Register.Form.Type";
import { AuthContextType } from "../types/typesContext/Auth.Context.type";
import { backendFetch } from "../services/api";

export const AuthContext = createContext<AuthContextType>({
  login: async (data: LoginForm) => false,
  register: async (data: RegisterForm) => false,
  isAuthenticated: false,
  userLogged: null,
  isLoading: false,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userLogged, setUserLogged] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginForm) => {
    setIsLoading(true);
    console.log("data", data);
    const { fetchResult, responseBody, responseDetails } = await backendFetch(
      "/login",
      "post",
      data
    );
    console.log("details", responseDetails);

    if (fetchResult.ok) {
      setUserLogged(responseBody.data);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const { fetchResult, responseBody } = await backendFetch(
        "/account/register",
        "post",
        data
      );
      console.log("Risposta registrazione", fetchResult.status, responseBody);

      if (fetchResult.ok) {
        return true;
      } else {
        console.error("Errore server:", responseBody);
        return false;
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      setIsLoading(false);
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!userLogged,
        userLogged,
        isLoading,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
