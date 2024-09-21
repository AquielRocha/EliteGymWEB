"use client";
import React, { createContext, useContext, useState } from "react";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider/ReactQueryClientProvider";
import { CookiesProvider } from "next-client-cookies/server";
import { setCookie, getCookie } from "cookies-next";

const Context = createContext<any>(null);

export const ContextWrapper = ({ children }: { children: React.ReactNode }) => {


  return (
    <ReactQueryClientProvider>
      <Context.Provider
        value={{
          
          cookie: getCookie("UP"),
        }}
      >
        {children}
      </Context.Provider>
    </ReactQueryClientProvider>
  );
};

export const useUser = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
