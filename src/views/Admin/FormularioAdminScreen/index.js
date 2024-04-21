import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from "react-native-flash-message";

const FormularioAdminScreen = () => {
    const route = useRoute();
    const { productoId } = route.params || {};

    const [idProd, setIdProd] = useState(null);
    const [image, setImage] = useState(null);
    const [nombre, onChangeNombre] = useState('');
    const [precio, onChangePrecio] = useState('');
    const [categoria, onChangeCategoria] = useState('');
    const [descripcion, onChangeDescripcion] = useState('');

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Electronica', value: 'electronica' },
        { label: 'Moda', value: 'moda' },
        { label: 'Juguetes y ocio', value: 'ocio' },
        { label: 'Hogar y deco', value: 'hogar' },
        { label: 'Alimenos y bebidas', value: 'alimentos' },
        { label: 'Limpieza', value: 'limpieza' }
    ]);

    useEffect(() => {
        if (productoId) {
            cargarProducto(productoId);
        }
    }, []);


    const cargarProducto = async () => {
        try {
            const productosGuardados = await AsyncStorage.getItem('productos');
            if (productosGuardados) {
                const productos = JSON.parse(productosGuardados);
                const producto = productos.find(item => item.idProducto === productoId);
                if (producto) {
                    console.log("encontre el producto para editarlo")
                    setIdProd(producto.idProducto);
                    onChangeNombre(producto.nombre);
                    onChangePrecio(producto.precio);
                    onChangeCategoria(producto.categoria);
                    onChangeDescripcion(producto.descripcion);
                    setImage(producto.imagen);
                } else {
                    console.log("No se encontró el producto con el ID proporcionado");
                }
            }
        } catch (error) {
            console.error('Error al cargar el producto:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const generarIdProducto = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const guardarProducto = async () => {
        try {
            if (!nombre || !precio || !categoria || !descripcion || !image) {
                showMessage({
                    message: "Todos los campos son obligatorios",
                    type: "danger",
                    duration: 2000
                });
                return;
            }

            let nuevosProductos = [];
            let productoEditado = false;


            const productosGuardados = await AsyncStorage.getItem('productos');

            if (productosGuardados) {
                nuevosProductos = JSON.parse(productosGuardados);


                nuevosProductos = nuevosProductos.map(producto => {
                    if (producto.idProducto === idProd) {
                        productoEditado = true;
                        return {
                            ...producto,
                            nombre,
                            precio,
                            categoria,
                            descripcion,
                            imagen: image
                        };
                    } else {
                        return producto;
                    }
                });
            }

            if (!productoEditado) {
                const idProducto = generarIdProducto();
                const producto = { idProducto, nombre, precio, categoria, descripcion, imagen: image };
                nuevosProductos.push(producto);
            }

            await AsyncStorage.setItem('productos', JSON.stringify(nuevosProductos));

            onChangeNombre('');
            onChangePrecio('');
            onChangeCategoria('');
            onChangeDescripcion('');
            setImage(null);

            showMessage({
                message: "Producto guardado exitosamente",
                type: "success",
            });

        } catch (error) {
            showMessage({
                message: "Error al guardar el producto",
                type: "danger",
            });
            console.error('Error al guardar el producto:', error);
        }
    };



    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderComponent titulo="Agregar producto" />
            <View style={styles.containerItem}>
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity style={styles.inputselectImage} onPress={pickImage}>
                            <Ionicons name="image-outline" size={70} color="#9b9b9b" />
                            <Text style={{ paddingTop: 10, fontSize: 15, color: '#9b9b9b' }}>Carga tu imagen</Text>
                        </TouchableOpacity>
                    </View>
                    {image ? (
                        <>
                            <Text style={{ marginTop: 5 }}>Imagen seleccionada:</Text>
                            <Image source={{ uri: image }} style={styles.image} />

                        </>
                    ) : (
                        <Text style={{marginTop:5}}>No hay imagen seleccionada</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNombre}
                        value={nombre}
                        placeholder="Nombre"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePrecio}
                        value={precio}
                        placeholder="Precio"
                    />

                    <TextInput
             
                       
                        maxLength={40}
                        style={[styles.input, { height: 100 }]}
                        onChangeText={onChangeDescripcion}
                        value={descripcion}
                        placeholder="Descripcion"
                    />
                    <DropDownPicker
                        open={open}
                        items={items}
                        value={categoria}
                        setOpen={setOpen}
                        setValue={onChangeCategoria}
                        setItems={setItems}
                        containerStyle={{ height: 40, marginTop: 10, marginBottom:20}}
                        style={{ backgroundColor: '#EAD6DF', borderColor: '#EAD6DF' }}
                        itemStyle={{
                            justifyContent: 'flex-start',

                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}

                    />
                    <Button
                        onPress={guardarProducto}
                        style={styles.button}
                        buttonStyle={{
                            borderRadius: 10,
                            height: 50,
                            backgroundColor: "#CD256A",
                        }}
                    >
                        <Text style={styles.buttonText}>Guardar Producto
                        </Text>
                    </Button>
                </View>
            </View>
          
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop:20
    },
    containerItem: {
        flex: 1,
        padding: 15
    },
    inputselectImage: {
        backgroundColor: "#EAD6DF",
        height: 150,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 50,
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#EAD6DF",
        borderColor: '#EAD6DF',
        borderRadius: 10,
        fontSize: 15
    },
    button: {
        paddingTop: 20,
        height: 70,
        paddingBottom: 30
    },
    buttonText: {
        color: "white",
        fontWeight: '400',
        fontSize: 17,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 5
    }
});

export default FormularioAdminScreen;
