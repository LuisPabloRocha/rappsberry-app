import React, { useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ItemAdminComponent = ({ producto, onDelete }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleToEdit = () => {
        navigation.navigate("FormularioEdit",  {productoId:producto.idProducto} );
    }

    const handleDelete = async () => {
        try {
            const productosGuardados = await AsyncStorage.getItem('productos');
            if (productosGuardados) {
                const idProductoAEliminar = producto.idProducto;
                let nuevosProductos = JSON.parse(productosGuardados).filter((item) => item.idProducto !== idProductoAEliminar);
                await AsyncStorage.setItem('productos', JSON.stringify(nuevosProductos));
                console.log('Producto eliminado:', producto);
            }
            onDelete();
            setModalVisible(false); // Cierra el modal después de eliminar el producto
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };


    return (
        <View style={styles.item}>
            <View style={styles.Card}>
                <Image source={{ uri: producto.imagen }} style={styles.image} />
                <View style={styles.containerInfo}>
                    <Text style={styles.nameItem}>{producto.nombre}</Text>
                    <Text style={styles.priceItem}>${producto.precio}</Text>
                </View>
                <View style={styles.containerIcons}>
                    <TouchableOpacity
                        onPress={handleToEdit}
                        style={{ marginTop: 5, paddingRight: 10 }}>
                        <Ionicons name="create-outline" size={24} color="#121212" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)} // Cambia aquí
                        style={{ marginTop: 5, paddingRight: 10 }}>
                        <Ionicons name="trash-outline" size={24} color="#d15253" />
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>¿Estás seguro que deseas eliminar este producto?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.button, { backgroundColor: "#EAD6DF" }]}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDelete} style={[styles.button, { backgroundColor: "#d15253" }]}>
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '50%',
        height: 240,
        padding: 5
    },
    Card: {
        flex: 1,
        backgroundColor: '#EAD6DF',
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
        height: '55%',
        marginTop: 2
    },
    containerInfo: {
        borderRadius: 10,
        marginTop: 10
    },
    nameItem: {
        fontSize: 15,
    },
    priceItem: {
        fontSize: 17,
        paddingTop: 5,
        fontWeight: '400',
        color: '#d15253'
    },
    containerIcons: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 15
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginLeft: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ItemAdminComponent;
