"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type GlobalContextProps = {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedIsLogged = localStorage.getItem("isLogged");
    const savedUserId = localStorage.getItem("userId");

    if (savedIsLogged) {
      setIsLogged(savedIsLogged === "true");
    }

    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isLogged", isLogged.toString());
    }
  }, [isLogged]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (userId !== null) {
        localStorage.setItem("userId", userId);
      } else {
        localStorage.removeItem("userId");
      }
    }
  }, [userId]);

  return (
    <GlobalContext.Provider
      value={{ isLogged, setIsLogged, userId, setUserId }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
