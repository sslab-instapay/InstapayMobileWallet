import {Text, View, StyleSheet, Button} from "react-native";
import React from 'react';
import TextInput from "react-native-web/src/exports/TextInput";


class OpenChannelModal extends React.Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: 'Open Channel',
        };
    };

    render() {
        const { params } = this.props.navigation.state;
        const address = params ? params.address : null;
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput placeholder="0x2e32fqerqd...">Address</TextInput>
                <TextInput placeholder="1ETH">Deposit</TextInput>
                <Button title="Open Channel"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    qrcodeLabel:{
        color: '#000088',
        fontSize: 18,
    },
    qrcode:{
        marginTop: 15,
    }
});

export default OpenChannelModal;