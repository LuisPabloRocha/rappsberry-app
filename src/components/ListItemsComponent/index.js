import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ItemComponent from "../ItemComponent";

const ListItemsComponent = () => {
    return (
        <ScrollView>
           <View style={styles.itemsContainer}>
            <ItemComponent></ItemComponent>
            <ItemComponent></ItemComponent>
            <ItemComponent></ItemComponent>
            <ItemComponent></ItemComponent>
            <ItemComponent></ItemComponent>
            <ItemComponent></ItemComponent>

           </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        width: '100%',
        marginTop:20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical:20,
        flex:1,
        padding:15
    },

})


export default ListItemsComponent;