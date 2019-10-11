import React from 'react';
import {StyleSheet, Text, View} from "react-native";

export default function Wallet(props) {
    return (
        <View style={{marginTop: 20}}>
            <Text style={styles.walletLabel}>Wallets</Text>
            <View style={styles.walletItem}>
                <View style={styles.walletInformationRow}>
                    <Text style={styles.nicknameLabel}>{convertAddress(props.address)}</Text>
                    <View style={styles.balanceItem}>
                        <Text>{props.balance}</Text>
                        <Text style={styles.coinLabel}>ETH</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
function convertAddress(address) {
    return address.substring(0, 8) + "..."
}

const styles = StyleSheet.create({
        walletLabel: {
            marginLeft: 10,
            fontWeight: 'bold'
        },
        walletItem: {
            borderRadius: 7,
            borderColor: 'black',
            borderWidth: 0.5,
            height: 50,
            margin: 10,
            flexDirection: "column"
        },
        walletInformationRow: {
            flexDirection: "row",
            justifyContent: 'space-between'
        },
        nicknameLabel: {
            marginTop: 10,
            marginLeft: 10,
        },
        balanceItem: {
            marginTop: 10,
            marginRight: 10,
            flexDirection: "row"
        },
        coinLabel: {
            color: "#b4b4b4",
        }
    }
);