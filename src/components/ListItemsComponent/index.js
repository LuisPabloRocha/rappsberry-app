import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ItemComponent from "../ItemComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListItemsComponent = () => {
    const [productos, setProductos] = useState([]);

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
        cargarProductosGuardados();
    }, []);

    return (
        <ScrollView>
            <View style={styles.itemsContainer}>
                {productos.map((producto, index) => (
                    <ItemComponent key={index} producto={producto} idProd={index} />
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 20,
        flex: 1,
        padding: 15
    },

})


export default ListItemsComponent;