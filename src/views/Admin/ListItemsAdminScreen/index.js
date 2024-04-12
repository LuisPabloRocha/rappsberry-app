import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import ItemAdminComponent from "../../../components/Admin/ItemAdminComponent";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed';

const ListItemAdminScreen = () => {
    const [productos, setProductos] = useState([]);
    const navigation = useNavigation();
    const [categoria, setCategoria] = useState('todos');

    const handleCategoryPress = (categoriaSeleccionada) => {
        setCategoria(categoriaSeleccionada);
    };

    const handleClearStorage = async () => {
        try {
            await AsyncStorage.clear();
            setProductos([]);
        } catch (error) {
            console.error('Error al borrar el almacenamiento:', error);
        }
    };

    const cargarProductosGuardados = async () => {
        try {
            const productosGuardados = await AsyncStorage.getItem('productos');
            if (productosGuardados) {
                const productosParseados = JSON.parse(productosGuardados);

                if (categoria === "todos") {
                    setProductos(productosParseados);
                } else {

                    const productosFiltrados = productosParseados.filter(producto => producto.categoria === categoria);
                    setProductos(productosFiltrados);
                }
            }
        } catch (error) {
            console.error('Error al cargar los productos guardados:', error);
        }
    };

    useEffect(() => {
        console.log("categoria cambio a" + categoria)
        const unsubscribe = navigation.addListener('focus', () => {
            cargarProductosGuardados(); // Cargar productos cuando el enfoque de la pantalla cambie
        });
        return unsubscribe;
    }, [navigation, categoria]);

    useEffect(() => {
        cargarProductosGuardados();
    }, [categoria])

    const handleProductoDelete = async (id) => {
        await cargarProductosGuardados();
    };

    const handleLogout = async () => {
        try {
            navigation.navigate("Login");
        } catch (error) {
            console.error('Error al intentar cerrar sesión:', error);
        }
    };

    const handleToFormulario = () => {
        //handleClearStorage();
        navigation.navigate("Formulario");
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderComponent />
            <View>
                <View style={styles.container}>
                    <Text style={styles.greetingText}>
                        <Text styles={styles.nameUser}>
                            Hola Adminstrador
                        </Text>
                    </Text>
                    <Button style={styles.logoutButton}
                    buttonStyle={{ borderRadius: 10, height: 40, width: 150, backgroundColor: '#d15253' }} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                    </Button>

                </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20, paddingLeft: 15, height: 60 }}>
                <Button
                    onPress={() => handleCategoryPress('todos')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}
                >
                    <Text style={styles.textBtn}>Todo
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('electronica')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}
                >
                    <Text style={styles.textBtn}>Electrónica
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('moda')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}

                >
                    <Text style={styles.textBtn}>Moda
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('ocio')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}
                >
                    <Text style={styles.textBtn}>Juguetes
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('hogar')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}
                >
                    <Text style={styles.textBtn}>Hogar
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('alimentos')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}
                >
                    <Text style={styles.textBtn}>Alimentos
                    </Text>
                </Button>
                <Button
                    onPress={() => handleCategoryPress('limpieza')}
                    style={styles.buttonCategory}
                    buttonStyle={{ borderRadius: 10, height: 45, width: 150, backgroundColor: '#353c59' }}
                >
                    <Text style={styles.textBtn}>Limpieza
                    </Text>
                </Button>
            </ScrollView>
            <View>

            </View>
            <ScrollView style={styles.containerItems}>
                {productos.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No hay productos de esta categoría</Text>
                    </View>
                ) : (
                    <View style={styles.itemsContainer}>
                        {productos.map((producto, index) => (
                            <ItemAdminComponent key={index} producto={producto} onDelete={() => handleProductoDelete(producto.id)} />
                        ))}
                    </View>
                )}
            </ScrollView>

            <TouchableOpacity onPress={handleToFormulario} style={styles.buttonContainer}>
                <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        padding: 15,
        flexDirection:'row'
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
    },
    containerItems: {
        position: 'relative',
    },
    itemsContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 20,
        padding: 15,
        flex: 1,
        paddingBottom: 400
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '1%',
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
        zIndex: 1
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        alignSelf:'flex-end',
        justifyContent:'space-between',
        borderRadius: 5,
        paddingLeft:'10%',
       
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ListItemAdminScreen;
