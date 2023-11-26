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
import Analytics from "./Analytics";
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('uaqjHpPi1HUwWir9lGFA5JjVXyQ9kBx0q9yo1aJG', 'MeUD3QR79OFTfLwBOvwBTWcVrOKleju08058MJYm');
Parse.serverURL = 'https://parseapi.back4app.com/';

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
        <Stack.Screen name="Analytics" component={Analytics} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}