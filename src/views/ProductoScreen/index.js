import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from "../../components/HeaderComponent";

const ProductoScreen = () => {
    const [usuario, setUsuario] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { productoId } = route.params;
    const [producto, setProducto] = useState(null);

    const windowHeight = Dimensions.get('window').height;
    const dataContainerHeight = windowHeight - 600;

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
        const fetchProducto = async () => {
            try {
                const productosGuardados = await AsyncStorage.getItem('productos');
                if (productosGuardados) {
                    const productos = JSON.parse(productosGuardados);
                    const productoEncontrado = productos.find(item => item.idProducto === productoId);
                    if (productoEncontrado) {
                        console.log("Producto encontrado")
                        setProducto(productoEncontrado);
                    } else {
                        console.log("No se encontró el producto con el ID proporcionado");
                    }
                } else {
                    console.log("No hay productos guardados en AsyncStorage");
                }
            } catch (error) {
                console.error('Error al cargar el producto desde AsyncStorage:', error);
            }
        };
        fetchProducto();
    }, [productoId]);

    const handleAddToCart = async () => {
        try {
            if (!usuario) {
                console.error('Usuario no definido');
                return;
            }
    
            const productoParaAgregar = {
                usuario: usuario,
                producto: producto,
                cantidad: 1
            };
    
            const carritoActual = await AsyncStorage.getItem('carrito');
            let carrito = [];
    
            if (carritoActual) {
                carrito = JSON.parse(carritoActual);
    
                const carritoUsuarioActual = carrito.filter(item => item.usuario.email === usuario.email);
    
                const index = carritoUsuarioActual.findIndex(item => item.producto.idProducto === productoParaAgregar.producto.idProducto);
                if (index !== -1) {
                    carritoUsuarioActual[index].cantidad += 1;
                    console.log("Aumentada la cantidad del producto en el carrito del usuario actual")
                } else {
                    carritoUsuarioActual.push(productoParaAgregar);
                    console.log("Agregado nuevo producto al carrito del usuario actual")
                }
    
                carrito = carrito.filter(item => item.usuario.email !== usuario.email).concat(carritoUsuarioActual);
            } else {
                carrito.push(productoParaAgregar);
            }
    
            await AsyncStorage.setItem('carrito', JSON.stringify(carrito));
    
            navigation.navigate('Carrito');
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
        }
    };
    


    return (
        <SafeAreaView style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}>
            <HeaderComponent titulo="Producto" color="#EAD6DF"></HeaderComponent>
            {producto &&
                <>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: producto.imagen }} style={styles.imageProducto}></Image>
                    </View>
                    <View style={[styles.infoContainer, { height: dataContainerHeight }]}>
                        <View>
                            <Text style={styles.nameItem}>{producto.nombre}</Text>
                            <Text style={styles.priceItem}>${producto.precio}</Text>
                            <Text style={styles.descriptionItem}>{producto.descripcion}</Text>
                            <Button
                                onPress={handleAddToCart}
                                style={styles.button}
                                buttonStyle={{
                                    borderRadius: 10,
                                    height: 50,
                                    backgroundColor: "#CD256A",
                                }}
                            >
                                <Text style={styles.buttonText}>Agregar al carrito
                                </Text>
                            </Button>

                        </View>
                    </View>
                </>
            }

        </SafeAreaView>
    )
}

export default ProductoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
  
        paddingTop:30
    },
    imageContainer: {
        backgroundColor: '#EAD6DF',
        alignContent: 'center',
        alignItems: 'center',
        height: 400
    },
    imageProducto: {
        width: 300,
        height: 300,
        marginTop: 20
    },
    infoContainer: {
        padding: 12,
        paddingTop: 20,
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        position: "relative",
        bottom: 40,
    },
    nameItem: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10
    },
    priceItem: {
        fontSize: 25,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    descriptionItem: {
        fontSize: 15,
        padding: 10,
        textAlign: 'justify'
    },
    button: {
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        height: 70,
        paddingBottom: 30
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 17,
    },

})
