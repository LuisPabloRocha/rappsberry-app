import React from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import ItemAdminComponent from "../../../components/Admin/ItemAdminComponent";
import { Ionicons } from '@expo/vector-icons';

const ListItemAdminScreen = () => {
    const navigation = useNavigation();

    const handleToFormulario = () => {
        navigation.navigate("Formulario");
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderComponent />
            <ScrollView style={styles.containerItems}>
                <View style={styles.itemsContainer}>
                    <ItemAdminComponent></ItemAdminComponent>
                    <ItemAdminComponent></ItemAdminComponent>
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
