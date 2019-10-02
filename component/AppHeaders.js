import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default function AppHeaders() {
    return (
        <View style={styles.appHeader}>
            <Text style={styles.mainLabel}>InstaPay Wallet</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainLabel: {
        color: 'steelblue',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: "bold"
    },
    appHeader: {
        marginTop: 30,
        alignSelf: 'stretch',
        height: 50,
        alignItems: 'center'
    }
});