import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListItemsComponent from "../../components/ListItemsComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TopTab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    const navigation = useNavigation();
    const [categoria, setCategoria] = useState('todos');
    const [usuario, setUsuario] = useState(null);

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

    const handleCategoryPress = (categoriaSeleccionada) => {
        setCategoria(categoriaSeleccionada);
    };

    const vaciarCarrito = async () => {
        try {
            await AsyncStorage.removeItem('carrito');
            setCarrito([]);
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
        }
    };
    
    const handlegoToCart = () => {
        //vaciarCarrito();
        navigation.navigate('Carrito');
    };

    return (
        <SafeAreaView>
            <View>
                <View style={styles.containerIconCart}>
                    <TouchableOpacity onPress={handlegoToCart}>
                        <Ionicons name="cart" size={30} color="#CD256A" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.greetingText}>
                        <Text styles={styles.nameUser}>
                        Hola {usuario ? usuario.nombre : ''}
                        </Text>
                    </Text>
                    <Text style={styles.subtitle}>¿Vamos a comprar algo?</Text>
                </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20, paddingLeft: 15, height: 55 }}>
                <Button
                    onPress={() => handleCategoryPress('todos')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#CD256A', marginRight:10 }}
                >
                    <Text style={styles.textBtn}>Todo
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('electronica')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#CD256A' , marginRight:10}}
                >
                    <Text style={styles.textBtn}>Electrónica
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('moda')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#CD256A', marginRight:10 }}

                >
                    <Text style={styles.textBtn}>Moda
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('ocio')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#CD256A', marginRight:10 }}
                >
                    <Text style={styles.textBtn}>Juguetes
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('hogar')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#CD256A' , marginRight:10}}
                >
                    <Text style={styles.textBtn}>Hogar
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('alimentos')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#CD256A', marginRight:10 }}
                >
                    <Text style={styles.textBtn}>Alimentos
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('limpieza')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#CD256A', marginRight:10 }}
                >
                    <Text style={styles.textBtn}>Limpieza
                    </Text>
                </Button>
            </ScrollView>
            <ListItemsComponent categoria={categoria}></ListItemsComponent>
        </SafeAreaView>

    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    containerIconCart: {
        paddingLeft: 15,
        paddingRight: 15,
        alignContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    container: {
        padding: 15,
    },
    TitleContainer: {
        paddingLeft: 12,
        paddingTop: 20,
    },
    Title: {
        fontSize: 18,
    },
    greetingText: {
        fontSize: 22
    },
    nameUser: {
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 15
    },
    buttonCategory: {
        paddingRight: 10,
    },
    textBtn: {
        fontSize: 15,
        color: 'white'
    }


})