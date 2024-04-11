import React from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../components/HeaderComponent";
import ItemCartComponent from "../../components/ItemCartComponent";
import { Button } from '@rneui/themed';

const CarritoScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderComponent />
            <ScrollView style={styles.containerItems}>
                <ItemCartComponent />
                <ItemCartComponent />
                <ItemCartComponent />
            </ScrollView>
            <View style={styles.buttonContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.leftText}>Total</Text>
                    <Text style={styles.rightText}>$402</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    >
                        Comprar Ahora
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    containerItems: {
        flex: 1,
        padding: 15,
    },
    buttonContainer: {
        alignItems: 'center',
        padding: 15,
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
        paddingBottom:20
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

export default CarritoScreen;
