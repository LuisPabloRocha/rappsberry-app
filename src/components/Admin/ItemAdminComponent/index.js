import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const ItemAdminComponent = () => {

    const navigation = useNavigation();

    const handleToProducto = () => {
        navigation.navigate("Producto");
    }

    return (
        <View style={styles.item}>
            <View style={styles.Card}>
                <Image source={require('../../../../assets/images/macbook.png')} style={styles.image}>
                </Image>
                <View style={styles.containerInfo}>
                    <Text style={styles.nameItem}>MacBook 13"</Text>
                    <Text style={styles.priceItem}>$140</Text>
                </View>
                <View style={styles.containerIcons}>
                    <TouchableOpacity
                        style={{ marginTop: 5, paddingRight: 10 }}>
                        <Ionicons name="create-outline" size={24} color="#121212" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginTop: 5, paddingRight: 10 }}>
                        <Ionicons name="trash-outline" size={24} color="#d15253" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '50%',
        height: 230,
        padding: 5
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
        height: '40%',
        marginTop: 2
    },
    containerInfo: {

        borderRadius: 10,
        marginTop: 15
    },
    nameItem: {
        fontSize: 15,
        paddingLeft: 10,
    },
    priceItem: {
        fontSize: 17,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        fontWeight: '400',
        color: '#d15253'
    },
    containerIcons: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    }

})

export default ItemAdminComponent;