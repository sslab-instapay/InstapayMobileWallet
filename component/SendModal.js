import {Text, View, StyleSheet, Button, TextInput, Alert} from "react-native";
import React from 'react';

class SendModal extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({navigation, navigationOptions}) => {
        const {params} = navigation.state;
        return {
            title: 'Send',
        };
    };

    render() {
        const {params} = this.props.navigation.state;
        const address = params ? params.address : null;
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <TextInput style={styles.addressInput} placeholder="0x2e32fqerqd..."
                           onChangeText={text => this.setState({
                               address: text
                           })} value={address}/>
                <TextInput style={styles.depositInput} keyboardType={'numeric'} placeholder="ETH"
                           onChangeText={text => this.setState({
                               deposit: text
                           })}/>
                <Button onPress={this.sendAmount} title="Send"/>
            </View>
        )
    }

    sendAmount = () => {
        const url = "http://141.223.121.139:3001" + '/channel/payments';
        // TODO post react요청으로 바꿈
        fetch(url)
            .then(res1 => res1.json())
            .then(data => {
                alert("Payments Success");
                this.props.navigation.replace('Home');
            })
            .catch(err => {
                alert("Payments fail");
                this.props.navigation.replace('Home');
            });
    }
}

const styles = StyleSheet.create({
    addressInput: {
        marginTop: 5,
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
    depositInput: {
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

export default SendModal;