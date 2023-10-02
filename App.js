import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { Navigation } from "./src/navigation/Navigation";
import { useFonts } from 'expo-font';
import { AuthContextProvider } from './src/context/AuthContext';
import { AppContextProvider } from './src/context/AppContext';

function App() {
 
  const [loaded] = useFonts({

    Alexandria_thin: require('./src/assets/fonts/Alexandria-Thin.ttf'),
    Alexandria_light: require('./src/assets/fonts/Alexandria-Light.ttf'),
    Alexandria_regular: require('./src/assets/fonts/Alexandria-Regular.ttf'),
    Alexandria_medium: require('./src/assets/fonts/Alexandria-Medium.ttf'),
    Alexandria_semi_bold: require('./src/assets/fonts/Alexandria-SemiBold.ttf'),
    Alexandria_bold: require('./src/assets/fonts/Alexandria-Bold.ttf'),

  });

  if (!loaded) { 
    return null;
  }


  return (
     <AuthContextProvider>
        <AppContextProvider  >

        <Navigation />
      
      <ExpoStatusBar style="auto" />
      
      </AppContextProvider>
      </AuthContextProvider>
  );
}

export default App;