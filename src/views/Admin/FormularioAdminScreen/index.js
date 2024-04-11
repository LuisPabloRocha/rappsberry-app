import React, { useState, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import ItemAdminComponent from "../../../components/Admin/ItemAdminComponent";
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

const FormularioAdminScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [nombre, onChangeNombre] = useState('');
    const [precio, onChangePrecio] = useState('');
    const [categoria, onChangeCategoria] = useState('');
    const [descripcion, onChangeDescripcion] = useState('')


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderComponent />
            <ScrollView style={styles.containerItem}>
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity style={styles.inputselectImage} onPress={pickImage}>
                            <Ionicons name="image-outline" size={70} color="#9b9b9b" />
                            <Text style={{paddingTop:10, fontSize:15, color:'#9b9b9b'}}>Carga tu imagen</Text>
                        </TouchableOpacity>
                    </View>
                    {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
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
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        style={[styles.input, { height: 100 }]}
                        onChangeText={onChangePrecio}
                        value={precio}
                        placeholder="Descripcion"
                    />
                    <Button style={styles.button}
                        buttonStyle={{
                            borderRadius: 10,
                            height: 50,
                            backgroundColor: "#353C59",
                        }}
                    >
                        <Text style={styles.buttonText}>Guardar Producto
                        </Text>
                    </Button>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    containerItem: {
        flex: 1,
        padding: 15
    },
    inputselectImage: {
        backgroundColor: "#e0e3f0",
        height: 150,
        borderRadius: 10,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    input: {
        height: 50,
        marginTop: 10,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#e0e3f0",
        borderColor: '#e0e3f0',
        borderRadius: 10,
        fontSize: 15
    },
    button: {
        paddingTop: 20,
        height: 70,
        paddingBottom:30
    },
    buttonText: {
        color: "white",
        fontWeight: '400',
        fontSize: 17,
    },




});

export default FormularioAdminScreen;
