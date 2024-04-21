import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from "react-native-flash-message";

const LoginScreen = () => {

    const email1="laura@correo.com";
    const pass1="laura123"
    const email2="pablo@correo.com"
    const pass2="pablo123"
    const emailAdmin ="admin@rappsberry.com"
    const passAdmin="admin"
    const [email, onChangeEmail] = useState(email2);
    const [password, onChangePassword] = useState(pass2);

    const navigation = useNavigation();

    const windowHeight = Dimensions.get('window').height;
    const dataContainerHeight = windowHeight - 300;

    const handleLoginToRegistro = () => {
        navigation.navigate("Registro");
    }

    const handleLogin = async () => {
        try {
            if (email === 'admin@rappsberry.com' && password === 'admin') {
                navigation.navigate("ListItemAdmin");
                return;
            }
    
            const usuariosGuardados = await AsyncStorage.getItem('usuarios');
            if (usuariosGuardados !== null) {
                const usuarios = JSON.parse(usuariosGuardados);
                const usuario = usuarios.find(user => user.email === email && user.password === password);
                if (usuario) {
                    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
                    navigation.navigate("TabNavigator");
                } else {
                    showMessage({
                        message: "Credenciales incorrectas",
                        type: "danger",
                    });
                }
            } else {
                showMessage({
                    message: "No se encontró ningún usuario registrado",
                    type: "danger",
                });
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            showMessage({
                message: "Error al intentar iniciar sesión",
                type: "danger",
            });
        }
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
                    <View style={{alignContent:'flex-end', alignSelf:'flex-end'}}>
                    <Button style={styles.button}
                        onPress={handleLogin}
                        buttonStyle={{
                            borderRadius: 10,
                            height: 50, width: 200,
                            backgroundColor: "#CD256A",
                            marginRight:12
                        }}
                    >
                        <Text style={styles.buttonText}>Ingresar
                        </Text>
                    </Button>
                    </View>
                    

                </View>
                <View style={{ height: 160 }}></View>
                <Text
                    style={{ color: "#c9c9c9", textAlign: "center", }}>
                    ¿Aún no tienes cuenta?
                </Text>
                <TouchableOpacity onPress={handleLoginToRegistro} ><Text style={styles.textLink}>Registrate</Text></TouchableOpacity>
                <Text
                    style={{ color: "#c9c9c9", textAlign: "center", marginTop: 20 }}>
                    Luis Pablo Rocha | Image Designed by Freepik
                </Text>
            </View>
            <FlashMessage position="top" />
        </ScrollView>
    )
}

export default LoginScreen;


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
        height: 300
    },
    logo: {
        padding: 10,
        width: 310,
        height: 65,
        marginTop: 100
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
