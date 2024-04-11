import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const ItemCartComponent = () => {
    return (
        <View style={styles.Card}>

            <Image source={require('../../../assets/images/macbook.png')} style={styles.image}>
            </Image>

            <View style={styles.containerInfo}>
                <Text style={styles.nameItem}>MacBook 13"</Text>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <Text style={styles.priceItem}>$140</Text>
                    <View style={styles.containerAddRemove}>
                        <TouchableOpacity>
                            <Ionicons name="remove-outline" size={24} color="#353c58" />
                        </TouchableOpacity>

                        <Text style={styles.counterItem}>1</Text>
                        <TouchableOpacity>
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
        marginBottom:10,
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
        fontWeight: 'bold'
    },
    containerAddRemove: {
        flexDirection: 'row',
        height: 25,
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: '17%',
        paddingLeft: 10,
        paddingRight: 10
    },
    counterItem: {
        paddingLeft: 20,
        paddingRight: 20,
        fontWeight: '400',
        fontSize: 16,
        paddingTop: 2
    }

})


export default ItemCartComponent;