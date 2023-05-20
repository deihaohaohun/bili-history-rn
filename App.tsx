import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import DoingScreen from "./pages/DoingScreen";
import TodoScreen from "./pages/TodoScreen";
import DoneScreen from "./pages/DoneScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Doing"
        component={DoingScreen}
        options={{
          headerShown: false,
          title: "正在追",
          tabBarActiveTintColor: "deeppink",
          tabBarIcon: focused =>
            focused ? (
              <Icon name="home" size={22} />
            ) : (
              <Icon name="home-outline" size={22} />
            ),
        }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          headerShown: false,
          title: "准备追",
          tabBarActiveTintColor: "deeppink",
          tabBarIcon: focused =>
            focused ? (
              <Icon name="md-list-circle" size={26} />
            ) : (
              <Icon name="md-list-circle-outline" size={26} />
            ),
        }}
      />
      <Tab.Screen
        name="Done"
        component={DoneScreen}
        options={{
          headerShown: false,
          title: "已追完",
          tabBarActiveTintColor: "deeppink",
          tabBarIcon: focused =>
            focused ? (
              <Icon name="md-list-circle" size={26} />
            ) : (
              <Icon name="md-list-circle-outline" size={26} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MyTabs}
            options={{ title: "首页" }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
