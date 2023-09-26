import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUser } from "./redux/action/user";
import Toast from "react-native-toast-message";

const Main = () => {
  const dispatch = useDispatch();
  // const [token, setToken] = useState({});

  // useEffect(() => {
  //   const getTokenFromAsyncStorage = async () => {
  //     try {
  //       // Use await to get the value from AsyncStorage
  //       const storedToken = await AsyncStorage.getItem("token");

  //       // Check if the token exists
  //       if (storedToken !== null) {
  //         // Token exists, you can use it here
  //         // console.log("Token:", storedToken);

  //         setToken({ token: storedToken }); // Set the token in the component state
  //       } else {
  //         // Token doesn't exist in AsyncStorage
  //         console.log("Token not found.");
  //       }
  //     } catch (error) {
  //       // Handle errors, e.g., AsyncStorage is not available
  //       console.log("Error retrieving token:", error);
  //     }
  //   };

  //   getTokenFromAsyncStorage(); // Call the function to retrieve the token
  // }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    // Dispatch the loadUser action only when the token is available
    // if (token) {
    // console.log(token);
    dispatch(loadUser());
    // }
  }, [dispatch]); // Include 'token' as a dependency

  return (
    <NavigationContainer>
      <AuthStack />
      <Toast position="bottom" />
    </NavigationContainer>
  );
};

export default Main;
