import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from "../views/LoginScreen";
import RegistroScreen from "../views/RegistroScreen";
import HomeScreen from "../views/HomeScreen";
import LikesScreen from "../views/LikesScreen";
import PerfilScreen from "../views/PerfilScreen";
import ProductoScreen from "../views/ProductoScreen";
import CarritoScreen from "../views/CarritoScreen";
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#353c59",
                tabBarStyle: {
                    backgroundColor: '#f0f1f5',
                    display: 'flex',
                    height: 90,
                    padding: 20,
                }
            }}>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }} />
            <Tab.Screen name="Likes" component={LikesScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    ),

                }} />
            <Tab.Screen name="Profile" component={PerfilScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),

                }} />
        </Tab.Navigator>
    )
}
const Routes = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="TabNavigator" component={TabNavigator}></Stack.Screen>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Registro" component={RegistroScreen} />
                    <Stack.Screen name="Producto" component={ProductoScreen} />
                    <Stack.Screen name="Carrito" component={CarritoScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default Routes;