import {Text, View, StyleSheet} from "react-native";
import React from 'react';
import QRCode from "react-native-qrcode-svg";


class ReceiveModal extends React.Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: 'Receive',
        };
    };

    render() {
        const { params } = this.props.navigation.state;
        const address = params ? params.address : null;
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.qrcodeLabel}>{address}</Text>
                <QRCode
                    style={styles.qrcode}
                    value={address}
                    size={300}
                />
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

export default ReceiveModal;