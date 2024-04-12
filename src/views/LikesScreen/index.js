import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LikesScreen = () => {
    return (
        <ScrollView>
          <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>Likes</Text>
                      <Text style={styles.emptyText}>PROXIMAMENTE</Text>
                  </View>
        </ScrollView>
    )
}

export default LikesScreen;

const styles = StyleSheet.create({
    itemsContainer: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 20,
        flex: 1,
        padding: 15,
        paddingBottom: 200
    },
    emptyContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        marginTop: 100
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

})