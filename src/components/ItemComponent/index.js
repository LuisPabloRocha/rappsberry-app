import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ItemComponent = ({producto}) => {

    const navigation = useNavigation();

    const handleToProducto = () => {
        navigation.navigate("Producto", {productoId:producto.idProducto});
    }

    return (
        <TouchableOpacity style={styles.item} onPress={handleToProducto}>
            <View style={styles.Card}>
                <Image source={{ uri: producto.imagen }} style={styles.image}>
                </Image>
                <View style={styles.containerInfo}>
                    <Text style={styles.nameItem}>{producto.nombre}</Text>
                    <Text style={styles.priceItem}>$ {producto.precio}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '50%',
        height: 200,
        padding:5
    },
    Card: {
        flex: 1,
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

        elevation: 3,
    },
    image: {
        width: '80%',
        height: '60%',
        marginTop: 2,
        borderRadius:10
    },
    containerInfo:{
        backgroundColor:'white',
        borderRadius:10,
        marginTop:5
    },
    nameItem: {
        fontSize:15,
        paddingLeft:10,
        paddingTop:10
    },
    priceItem:{
        fontSize:17,
        paddingLeft:10,
        paddingTop:5,
        paddingBottom:10,
        fontWeight:'bold'
    }

})

export default ItemComponent;