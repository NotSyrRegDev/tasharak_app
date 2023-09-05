import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "../navigation/AppNavigator";
import { AuthNavigator } from "../navigation/AuthNavigator";
import {  AuthenticationContext } from '../context/AuthContext';


export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <>
  <NavigationContainer>
    {isAuthenticated ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
    </>
   
  );
};
