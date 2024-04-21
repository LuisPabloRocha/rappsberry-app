import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";

const RegistroScreen = () => {
    const [nombre, onChangeNombre] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [passwordConfirm, onChangePasswordConfirm] = useState('');
    const navigation = useNavigation();

    const windowHeight = Dimensions.get('window').height;
    const dataContainerHeight = windowHeight - 200;

    const handleRegistro = async () => {
        if (!nombre || !email || !password || !passwordConfirm) {
            showMessage({
                message: "Todos los campos son obligatorios",
                type: "danger",
            });
            return;
        }
        if (password !== passwordConfirm) {
            showMessage({
                message: "Las contraseñas no coinciden",
                type: "danger",
            });
            return;
        }

        const newUser = {
            nombre,
            email,
            password,
        };

        try {
            // Obtener los usuarios existentes
            const usuariosGuardados = await AsyncStorage.getItem('usuarios');
            let usuarios = [];

            if (usuariosGuardados) {
                usuarios = JSON.parse(usuariosGuardados);
            }

            // Agregar el nuevo usuario
            usuarios.push(newUser);

            // Guardar el arreglo actualizado en AsyncStorage
            await AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));

            showMessage({
                message: "Registrado exitosamente",
                type: "success",
            });

            navigation.navigate("Login");
        } catch (error) {
            console.error('Error al almacenar el usuario:', error);
        }
    }

    const handleRegistroToLogin = () => {
        navigation.navigate("Login");
    }

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/images/rappsberry.png')} style={styles.logo}></Image>
            </View>
            <View style={[styles.dataContainer, { height: dataContainerHeight }]}>
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeNombre}
                        value={nombre}
                        placeholder="Nombre"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePasswordConfirm}
                        value={passwordConfirm}
                        secureTextEntry={true}
                        placeholder="Confirmar contraseña"
                    />
                      <View style={{alignContent:'flex-end', alignSelf:'flex-end'}}>
                    <Button
                        onPress={handleRegistro}
                        style={styles.button}
                        buttonStyle={{
                            borderRadius: 10,
                            height: 50, width: 200,
                            backgroundColor: "#CD256A",
                            marginRight:12
                        }}
                    >
                        <Text style={styles.buttonText}>Registarse
                        </Text>
                    </Button>
                    </View>
                    

                </View>
                <View style={{ height: 100 }}></View>
                <Text
                    style={{ color: "#c9c9c9", textAlign: "center", }}>
                    ¿Ya tienes cuenta?
                </Text>
                <TouchableOpacity onPress={handleRegistroToLogin} ><Text style={styles.textLink}>Inicia sesión</Text></TouchableOpacity>
                <Text
                    style={{ color: "#c9c9c9", textAlign: "center", marginTop: 20 }}>
                    Luis Pablo Rocha | Image Designed by Freepik
                </Text>
            </View>
        </ScrollView>
    )
}

export default RegistroScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        paddingLeft: 12,
        backgroundColor: '#A1E887',
        alignContent: 'center',
        alignItems: 'center',
        height: 250
    },
    logo: {
        padding: 10,
        width: 310,
        height: 65,
        marginTop: 80
    },
    dataContainer: {
        padding: 12,
        paddingTop: 50,
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        position: "relative",
        bottom: 40,
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#EAD6DF",
        borderColor: '#EAD6DF',
        borderRadius: 10,
        fontSize: 15
    },
    button: {
        paddingTop: 10,
        paddingLeft: 12,
   
        height: 70,
        alignSelf: 'flex-end'
    },
    buttonText: {
        color: "white",
        fontSize: 15,
    },
    textLink: {
        fontSize: 13,
        paddingLeft: 5,
        margin: 0,
        position: "relative",
        textAlign: 'center',
        top: 2,
        color: "#CD256A"
    }
})
