import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed';

const ProductoScreen = () => {

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    const navigation = useNavigation();

    const windowHeight = Dimensions.get('window').height;
    const dataContainerHeight = windowHeight - 600;

    const handleLoginToRegistro = () => {
        navigation.navigate("Registro");
    }

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/images/macbook.png')} style={styles.imageProducto}></Image>
            </View>
            <View style={[styles.infoContainer, { height: dataContainerHeight }]}>
                <View>
                    <Text style={styles.nameItem}>MacBook 13"</Text>
                    <Text style={styles.priceItem}>$140</Text>
                    <Text style={styles.descriptionItem}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae ligula sed nisi ornare imperdiet. Nullam in ullamcorper neque. Quisque sit amet mauris nec velit gravida consequat. Duis vehicula erat ac magna tincidunt, ac varius enim vestibulum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</Text>
                    <Button style={styles.button}
                        buttonStyle={{
                            borderRadius: 10,
                            height: 50,
                            backgroundColor: "#353C59",
                        }}
                    >
                        <Text style={styles.buttonText}>Agregar al carrito
                        </Text>
                    </Button>

                </View>
            </View>
        </ScrollView>
    )
}

export default ProductoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imageContainer: {
        backgroundColor: '#e0e3f0',
        alignContent: 'center',
        alignItems: 'center',
        height: 400
    },
    imageProducto: {
        width: 300,
        height: 205,
        marginTop: 100
    },
    infoContainer: {
        padding: 12,
        paddingTop: 20,
        backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        position: "relative",
        bottom: 40,
    },
    nameItem: {
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 10
    },
    priceItem: {
        fontSize: 25,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    descriptionItem:{
        fontSize: 15,
        padding: 10,
        textAlign:'justify'
    },
    button: {
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        height: 70,
        paddingBottom:30
    },
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 17,
    },

})
