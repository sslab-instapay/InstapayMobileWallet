import {Text, View, StyleSheet, Button, TextInput} from "react-native";
import React from 'react';
import Invoice from "../util/invoice";
import {BarCodeScanner} from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import Icon from 'react-native-vector-icons/FontAwesome';


class OpenChannelModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: '',
            amount: 0,
        }
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: 'Open Channel',
        };
    };

    render() {
        const { params } = this.props.navigation.state;
        const paramAddress = params ? params.address : "";
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Icon.Button
                    size={15}
                    name="camera"
                    onPress={() => this.props.navigation.navigate('OpenChannelCameraModal', {
                        otherParam: 'Put QRCode',
                    })}
                />
                <TextInput style={styles.addressInput}  placeholder="0x2e32fqerqd..." onChangeText={text => this.setState({
                    address: paramAddress
                })}/>
                <TextInput style={styles.depositInput} keyboardType={'numeric'} placeholder="ETH" onChangeText={text => this.setState({
                    deposit: text
                })}/>
                <Button title="Open Channel" onPress={this.openChannel} />
            </View>
        )
    }

    openChannel = () => {
        let formData = new FormData();
        formData.append('deposit', this.state.deposit);
        formData.append('address', this.state.address);
        fetch(process.env.REACT_APP_INSTA_NODE_ADDRESS + "/channels/requests/open", {
            method: 'POST',
            body: formData
        }).then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        }).then((data) => {
            alert('payment success to ' + this.state.address + ' amount : ' + this.state.amount);
            this.props.navigation.replace('Home');
        }).catch((error) => {
            this.props.navigation.replace('Home');
            alert('Close Channel fail');
        });
    }
}

export class OpenChannelCameraModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission: null,
            scanned: false,
        };
    }

    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
            title: 'Open Channel',
        };
    };

    render() {
        const { params } = this.props.navigation.state;
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
        this.props.navigation.pop();
        this.props.navigation.navigate('OpenChannelModal', {
            address: data
        });
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    };

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