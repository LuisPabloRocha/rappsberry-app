import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = () => {
    const [usuario, setUsuario] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        cargarUsuario();
    }, []);

    const cargarUsuario = async () => {
        try {
            const usuarioGuardado = await AsyncStorage.getItem('usuario');
            if (usuarioGuardado) {
                const usuarioParseado = JSON.parse(usuarioGuardado);
                setUsuario(usuarioParseado);
            }
        } catch (error) {
            console.error('Error al cargar el usuario:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('usuario');
            setUsuario(null);
            navigation.navigate("Login");
        } catch (error) {
            console.error('Error al intentar cerrar sesión:', error);
        }
    };

    return (
        <ScrollView>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.title}>Perfil de Usuario</Text>
                    {usuario && (
                        <View>
                            <Text>Nombre: {usuario.nombre}</Text>
                            <Text>Email: {usuario.email}</Text>
                            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                                <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#353c59',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign:'center'
    },
});

export default PerfilScreen;

