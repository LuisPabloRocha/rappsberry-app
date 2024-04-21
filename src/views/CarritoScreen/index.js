import React, {useEffect, useState} from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../components/HeaderComponent";
import ItemCartComponent from "../../components/ItemCartComponent";
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from "react-native-flash-message";

const CarritoScreen = () => {
    const [carrito, setCarrito] = useState([]);
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

    useEffect(() => {
        usuario && cargarCarrito();
    }, [usuario]);

    const cargarCarrito = async () => {
        try {
            const carritoGuardado = await AsyncStorage.getItem('carrito');
            if (carritoGuardado) {
                const carritoParseado = JSON.parse(carritoGuardado);
                const carritodeUsuario = carritoParseado.filter(item => { 
                    return item.usuario.email === usuario.email
                })
                setCarrito(carritodeUsuario);
            }
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
        }
    };

    const cargaCarrito = async () => {
        cargarCarrito();
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
    };

    const handleCompraAhora = async () => {
        try {
            if (!usuario) {
                console.error('Usuario no definido');
                return;
            }
    
            const carritoActual = await AsyncStorage.getItem('carrito');
            let carrito = [];
    
            if (carritoActual) {
                carrito = JSON.parse(carritoActual);
    
                const carritoRestante = carrito.filter(item => item.usuario.email !== usuario.email);
                
                await AsyncStorage.setItem('carrito', JSON.stringify(carritoRestante));
                showMessage({
                    message: "Compra realizada exitosamente",
                    type: "success",
                });
                cargaCarrito();
                
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error);
        }
    };
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlashMessage position="top" />
            <HeaderComponent />
            <ScrollView style={styles.containerItems}>
                {carrito.length === 0 ? (
                      <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No tienes productos en tu carrito</Text>
                  </View>
                ) : (
                    carrito.map((item, index) => (
                        <ItemCartComponent key={index} item={item} cargaCarrito={cargaCarrito} />
                    ))
                )}
            </ScrollView>
    
            {carrito.length !== 0 && (
                <View style={styles.buttonContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.leftText}>Total</Text>
                        <Text style={styles.rightText}>${calcularTotal()}</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button
                            onPress={handleCompraAhora}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                        >
                            Comprar Ahora
                        </Button>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop:20
    },
    containerItems: {
        flex: 1,
        padding: 15,
    },
    buttonContainer: {
        alignItems: 'center',
        padding: 15,
    },
    buttonWrapper: {
        width: '100%',    
    },
    button: {
        borderRadius: 10,
        height: 50,
        backgroundColor: "#CD256A",
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom:20
    },
    leftText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '600',
    },
    rightText: {
        textAlign: 'right',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#353c59',
    },
    emptyContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        marginTop: 100
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CarritoScreen;
