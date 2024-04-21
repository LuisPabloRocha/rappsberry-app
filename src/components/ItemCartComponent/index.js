import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemCartComponent = ({ item, cargaCarrito }) => {

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

    const handleIncrement = async () => {
        try {
            if (!usuario) {
                console.error('Usuario no definido');
                return;
            }
    
            const carritoActual = await AsyncStorage.getItem('carrito');
            let carrito = [];
    
            if (carritoActual) {
                carrito = JSON.parse(carritoActual);

                const carritoUsuarioActual = carrito.filter(item => item.usuario.email === usuario.email);
    
                const index = carritoUsuarioActual.findIndex(cartItem => cartItem.producto.idProducto === item.producto.idProducto);
                if (index !== -1) {
                    carritoUsuarioActual[index].cantidad++;
                }
    
                carrito = carrito.filter(item => item.usuario.email !== usuario.email).concat(carritoUsuarioActual);
            }
    
            await AsyncStorage.setItem('carrito', JSON.stringify(carrito));
            cargaCarrito();
        } catch (error) {
            console.error('Error al incrementar cantidad en el carrito:', error);
        }
    };
    
    const handleDecrement = async () => {
        try {
            if (!usuario) {
                console.error('Usuario no definido');
                return;
            }
    
            const carritoActual = await AsyncStorage.getItem('carrito');
            let carrito = [];
    
            if (carritoActual) {
                carrito = JSON.parse(carritoActual);
    
                const carritoUsuarioActual = carrito.filter(item => item.usuario.email === usuario.email);
    
                const index = carritoUsuarioActual.findIndex(cartItem => cartItem.producto.idProducto === item.producto.idProducto);
                if (index !== -1) {
                    carritoUsuarioActual[index].cantidad--;
                    if (carritoUsuarioActual[index].cantidad === 0) {
                        carritoUsuarioActual.splice(index, 1);
                    }
                }

                carrito = carrito.filter(item => item.usuario.email !== usuario.email).concat(carritoUsuarioActual);
            }
    
            await AsyncStorage.setItem('carrito', JSON.stringify(carrito));
            cargaCarrito();
        } catch (error) {
            console.error('Error al decrementar cantidad en el carrito:', error);
        }
    };
    

    return (
        <View style={styles.Card}>
            <Image source={{ uri: item.producto.imagen }} style={styles.image}></Image>
            <View style={styles.containerInfo}>
                <Text style={styles.nameItem}>{item.producto.nombre}</Text>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <Text style={styles.priceItem}>${item.producto.precio}</Text>
                    <View style={styles.containerAddRemove}>
                        <TouchableOpacity onPress={handleDecrement}>
                            <Ionicons name="remove-outline" size={24} color="#353c58" />
                        </TouchableOpacity>

                        <Text style={styles.counterItem}>{item.cantidad}</Text>
                        <TouchableOpacity onPress={handleIncrement}>
                            <Ionicons name="add-outline" size={24} color="#353c58" />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        height: 190,
        padding: 5
    },
    Card: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EAD6DF',
        padding: 10,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        marginBottom: 10,
        elevation: 3,
    },
    image: {
        width: 130,
        height: 90,
        marginTop: 2
    },
    containerInfo: {
        borderRadius: 10,

    },
    nameItem: {
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 10
    },
    priceItem: {
        fontSize: 17,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        fontWeight: 'bold',
        width: '35%'
    },
    containerAddRemove: {
        flexDirection: 'row',
        height: 25,
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    counterItem: {
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: '400',
        fontSize: 16,
        paddingTop: 2
    }

})


export default ItemCartComponent;