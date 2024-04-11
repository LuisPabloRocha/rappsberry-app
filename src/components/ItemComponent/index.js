import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ItemComponent = () => {

    const navigation = useNavigation();

    const handleToProducto = () => {
        navigation.navigate("Producto");
    }

    return (
        <TouchableOpacity style={styles.item} onPress={handleToProducto}>
            <View style={styles.Card}>
                <Image source={require('../../../assets/images/macbook.png')} style={styles.image}>
                </Image>
                <View style={styles.containerInfo}>
                    <Text style={styles.nameItem}>MacBook 13"</Text>
                    <Text style={styles.priceItem}>$140</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '50%',
        height: 190,
        padding:5
    },
    Card: {
        flex: 1,
        backgroundColor: '#e0e3f0',
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
        height: '50%',
        marginTop: 2
    },
    containerInfo:{
        backgroundColor:'white',
        borderRadius:10,
        marginTop:15
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