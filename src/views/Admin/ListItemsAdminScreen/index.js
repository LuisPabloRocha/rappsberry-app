import React, {useEffect, useState} from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import ItemAdminComponent from "../../../components/Admin/ItemAdminComponent";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItemAdminScreen = () => {
    const [productos, setProductos] = useState([]);
    const navigation = useNavigation();

    const handleClearStorage = async () => {
        try {
            await AsyncStorage.clear();
            setProductos([]);
        } catch (error) {
            console.error('Error al borrar el almacenamiento:', error);
        }
    };

    const cargarProductosGuardados = async () => {
        try {
            const productosGuardados = await AsyncStorage.getItem('productos');
            if (productosGuardados) {
                setProductos(JSON.parse(productosGuardados));
            }
        } catch (error) {
            console.error('Error al cargar los productos guardados:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            cargarProductosGuardados(); // Cargar productos cuando el enfoque de la pantalla cambie
        });
        return unsubscribe;
    }, [navigation]);

    const handleProductoDelete = async (id) => {
        await cargarProductosGuardados();
    };


    const handleToFormulario = () => {
        //handleClearStorage();
        navigation.navigate("Formulario");
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderComponent />
            <ScrollView style={styles.containerItems}>
                <View style={styles.itemsContainer}>
                   {productos.map((producto, index) => (
                    <ItemAdminComponent key={index} producto={producto}  onDelete={() => handleProductoDelete(producto.id)}/>
                ))}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={handleToFormulario} style={styles.buttonContainer}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    containerItems: {
        flex: 1,
    },
    itemsContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 20,
        flex: 1,
        padding: 15
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#353C59',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: 'black', 
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
      },
    buttonWrapper: {
        width: '100%',
    },
    button: {
        borderRadius: 10,
        height: 50,
        backgroundColor: "#353C59",
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20
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
});

export default ListItemAdminScreen;
