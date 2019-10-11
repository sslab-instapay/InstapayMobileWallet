import {Text, View, StyleSheet, Button, TextInput} from "react-native";
import React from 'react';


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
                <TextInput style={styles.addressInput}  placeholder="0x2e32fqerqd..." onChangeText={text => this.setState({
                    address: text
                })}/>
                <TextInput style={styles.depositInput} keyboardType={'numeric'} placeholder="ETH" onChangeText={text => this.setState({
                    deposit: text
                })}/>
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
    },
    addressInput:{
        color: "#333333",
        borderColor: "#333333",
        borderWidth: 1,
        fontSize: 18,
        borderRadius: 5,
        alignSelf: 'stretch',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    depositInput:{
        marginTop: 15,
        color: "#333333",
        borderColor: "#333333",
        borderWidth: 1,
        fontSize: 18,
        borderRadius: 5,
        alignSelf: 'stretch',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10
    },

});

export default OpenChannelModal;