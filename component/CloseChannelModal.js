import {Text, View, StyleSheet, Picker, Button, Alert} from "react-native";
import React from 'react';


class CloseChannelModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channelId: 0
        }
    }

    static navigationOptions = ({navigation, navigationOptions}) => {
        const {params} = navigation.state;
        return {
            title: 'Close Channel',
        };
    };

    render() {
        const {params} = this.props.navigation.state;
        const address = params ? params.address : null;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Button title="Close Channel" onPress={this.handleCloseChannel}/>
            </View>
        )
    }

    handleCloseChannel = () => {
        const url = "http://141.223.121.139:3001" + '/requests/channel/close';

        fetch(url)
            .then(res1 => res1.json())
            .then(data => {
                Alert.alert(
                    'Insta Wallet',
                    'channel close success',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.replace('Home')},
                    ],
                    {cancelable: false},
                );
            })
            .catch(err => {
                Alert.alert(
                    'Insta Wallet',
                    'channel close fail.',
                    [
                        {text: 'OK', onPress: this.handleFail() }
                    ],
                    {cancelable: false},
                );
            });
    };

    handleFail = () => {
        console.log('OK Pressed');
        this.props.navigation.replace('Home');
    }
}

const styles = StyleSheet.create({
    qrcodeLabel: {
        color: '#000088',
        fontSize: 18,
    },
    qrcode: {
        marginTop: 15,
    }
});

export default CloseChannelModal;