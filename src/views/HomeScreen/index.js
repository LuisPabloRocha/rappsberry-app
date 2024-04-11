import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListItemsComponent from "../../components/ListItemsComponent";

const TopTab = createMaterialTopTabNavigator();

const HomeScreen = () => {
    const navigation = useNavigation();

    const handlegoToCart = () => {
        navigation.navigate('Carrito');
    };
    
    return (
        <SafeAreaView>
            <View>
                <View style={styles.containerIconCart}>
                    <TouchableOpacity onPress={handlegoToCart}>
                        <Ionicons name="cart" size={30} color="#353c59" />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.greetingText}>
                        <Text styles={styles.nameUser}>
                            Hola Luis
                        </Text>
                    </Text>
                    <Text style={styles.subtitle}>¿Vamos a comprar algo?</Text>
                </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20, paddingLeft: 15 }}>
                <Button style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}
                >
                    <Text style={styles.textBtn}>Electronicos
                    </Text>
                </Button>
                <Button style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}

                >
                    <Text style={styles.textBtn}>Ropa
                    </Text>
                </Button>
                <Button style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}
                >
                    <Text style={styles.textBtn}>Limpieza
                    </Text>
                </Button>
            </ScrollView>
            <ListItemsComponent></ListItemsComponent>
        </SafeAreaView>

    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    containerIconCart: {
        paddingLeft: 15,
        paddingRight: 15,
        alignContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    container: {
        padding: 15,
    },
    TitleContainer: {
        paddingLeft: 12,
        paddingTop: 20,
    },
    Title: {
        fontSize: 18,
    },
    greetingText: {
        fontSize: 22
    },
    nameUser: {
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 15
    },
    buttonCategory: {
        paddingRight: 10,
    },
    textBtn: {
        fontSize: 15,
        color: 'white'
    }


})