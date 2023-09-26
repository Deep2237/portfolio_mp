import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "./CustomDrawer";

import Ionicons from "react-native-vector-icons/Ionicons";

import AboutUs from "../screens/AboutUs";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgotPassword from "../screens/ForgotPassword";
import Chart from "../screens/Chart";
import CustomHeader from "./CustomHeader";
import CustomHeaderLogin from "./CustomHeaderLogin";
import StockDetail from "../screens/StockDetail";
import Search from "../screens/Search";
import ContactUs from "../screens/ContactUs";
import Portfolio from "../screens/Portfolio";
import { useSelector } from "react-redux";
import Profile from "../screens/Profile";
import Verify from "../screens/Verify";
import WatchList from "../screens/WatchList";

const Drawer = createDrawerNavigator();
const AuthStack = () => {
  const { loading, message, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  console.log(loading, message, error, isAuthenticated, user);
  // const initialRouteName = isAuthenticated ? "Home" : "Register";

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        // headerShown: false,
        header: (props) => <CustomHeader {...props} />,
        drawerActiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: "Roboto-Medium",
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Verify"
        component={Verify}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Chart"
        component={Chart}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="StockDetail"
        component={StockDetail}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="forgotpassword"
        component={ForgotPassword}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="WatchList"
        component={WatchList}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          header: CustomHeaderLogin,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthStack;
