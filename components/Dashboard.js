import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./Welcome"; 
import Timer from "./TimerScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stopwatch from "./Stopwatch";

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { display: 'flex', backgroundColor: "#788F25" },
        tabBarLabelStyle: {
          color: 'rgba(255, 248, 214, 0.50)',
          fontSize: 14,
          fontFamily: 'Inter',
          fontWeight: '700',
          wordBreak: 'break-word', 
        },
      }}
    >
      <Tab.Screen
        name="Alarm" 
        component={Welcome}
        options={{
          tabBarLabel: "Alarm",
          tabBarIcon: ({ color, size }) => (
            <Icon name="alarm" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Timer" 
        component={Timer}
        options={{
          tabBarLabel: "Timer",
          tabBarIcon: ({ color, size }) => (
            <Icon name="timer" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Stopwatch" 
        component={Stopwatch}
        options={{
          tabBarLabel: "Stopwatch",
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});