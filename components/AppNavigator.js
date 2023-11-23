import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import SignUp from "./SignUp";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import UserInformation from "./UserInformation";
import Password from "./Password";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="UserInformation" component={UserInformation} />
        <Stack.Screen name="Password" component={Password} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}