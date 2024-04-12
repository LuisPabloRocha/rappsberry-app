import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderComponent = ({titulo, color}) => {
    const navigation = useNavigation();
    return (
        <View style={[styles.containerTitleScreen, {backgroundColor:color}]}>
            <TouchableOpacity
                onPress={() => navigation.goBack()} style={{ marginTop: 5, paddingRight:10 }}>
                <Ionicons name="arrow-back-outline" size={24} color="#353c58" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text numberOfLines={2} style={[styles.textTitle]}>{titulo}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTitleScreen: {
        paddingTop: 10,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
    },
    textTitle: {
        color: 'black',
        fontSize: 20,
        margin: 6,
        textAlign: 'center',
        position:'relative',
        right:25,
        fontWeight:'600'
    },
});

export default HeaderComponent;
