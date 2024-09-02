import { createContext, useContext, useEffect, useState } from "react";
import { isUserLoggedInAPI } from "../constants/apiURLS";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const [userDetails, setUserDetails] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // IIFE - Immediately Invoked Function Expression
    ; (async () => {
      try {

        const response = await fetch(isUserLoggedInAPI, {
          method: "GET",
          credentials: "include"
        });

        const userData = await response.json();
        
        if (response.ok) {
          setIsLoggedIn(true);
          setUserDetails(userData.data)
        } else {
          setIsLoggedIn(false);
          setUserDetails({})
        }

      } catch (error) {
        console.log("An error occured", error);
      } finally {
        setLoading(false);
      }

    })()
  }, [isLoggedIn]);


  return <AppContext.Provider value={{ userDetails, setUserDetails, isLoggedIn, setIsLoggedIn, loading }}>
    {children}
  </AppContext.Provider>
}

export const useGlobalAppContext = () => {
  return useContext(AppContext);
}