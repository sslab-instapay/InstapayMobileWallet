import {Text, View, StyleSheet, Button} from "react-native";
import React from 'react';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Invoice from './../util/invoice'

class CameraModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            scanned: false,
        };
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.otherParam : 'QRCODE',
        };
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    render() {
        const { params } = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        const otherParam = params ? params.otherParam : null;

        const { hasCameraPermission, scanned } = this.state;
        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                )}
            </View>
        )
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });
        if (data.startsWith("INSTA")){
            const decodedInvoice = Invoice.decodeInvoice(data);
        }
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    getPermissionsAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    };
}

class SendModal extends React.Component{
    constructor(props){
        super(props);
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: 'Send',
        };
    };
}

const styles = StyleSheet.create({
});

export default CameraModal;