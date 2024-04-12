import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { productoId } = route.params;
    const [producto, setProducto] = useState(null);

    const windowHeight = Dimensions.get('window').height;
    const dataContainerHeight = windowHeight - 600;

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

    if (!producto) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando...</Text>
            </View>
        );
    }
    
    return (
        <ScrollView style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.imageContainer}>
            <Image source={{ uri: producto.imagen }} style={styles.imageProducto}></Image>
            </View>
            <View style={[styles.infoContainer, { height: dataContainerHeight }]}>
                <View>
                    <Text style={styles.nameItem}>{producto.nombre}</Text>
                    <Text style={styles.priceItem}>${producto.precio}</Text>
                    <Text style={styles.descriptionItem}>{producto.descripcion}</Text>
                    <Button style={styles.button}
                        buttonStyle={{
                            borderRadius: 10,
                            height: 50,
                            backgroundColor: "#353C59",
                        }}
                    >
                        <Text style={styles.buttonText}>Agregar al carrito
                        </Text>
                    </Button>

                </View>
            </View>
        </ScrollView>
    )
}

export default ProductoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageContainer: {
        backgroundColor: '#e0e3f0',
        alignContent: 'center',
        alignItems: 'center',
        height: 400
    },
    imageProducto: {
        width: 300,
        height: 205,
        marginTop: 100
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
    descriptionItem:{
        fontSize: 15,
        padding: 10,
        textAlign:'justify'
    },
    button: {
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        height: 70,
        paddingBottom:30
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 17,
    },

})
