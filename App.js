import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { createAppContainer } from 'react-navigation';
import Wallet from "./component/Wallets";
import Channel from "./component/Channels"
import AppHeaders from "./component/AppHeaders";
import {createStackNavigator} from "react-navigation-stack";
import QRCode from 'react-native-qrcode';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Invoice from './util/invoice'

const inChannelList = [];
const outChannelList = [];

class HomeScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
        };
    };

    componentWillMount() {
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    state = {
        count: 0,
    };

    _increaseCount = () => {
        this.setState({ count: this.state.count + 1 });
    };

    constructor(props) {
        super(props);
        this.state = {
            address: "0xqwei2q4jwqitw",
            balance: 10,
            inChannelList: inChannelList,
            outChannelList: outChannelList,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeaders/>
                <Wallet address={this.state.address} balance={this.state.balance}/>
                <Channel inChannelList={this.state.inChannelList} outChannelList={this.state.outChannelList}/>
                <Button
                    title="Receive"
                    onPress={() => this.props.navigation.navigate('CameraModal', {
                        otherParam: 'Put QRCode',
                    })}
                />

                <Button
                    title="SCAN"
                    onPress={() => this.props.navigation.navigate('CameraModal', {
                        otherParam: 'Put QRCode',
                    })}
                />
            </View>
        );
    }

    componentDidMount() {
        this.getWalletInformation();
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    getWalletInformation = () => {
        const url = "http://localhost:3001" + '/wallets';

        fetch(url)
            .then(res1 => res1.json())
            .then(data => {
                const tempInChannelList = this.state.inChannelList;
                const tempOutChannelList = this.state.outChannelList;
                this.setState({
                        address: data.account.address,
                        balance: data.account.balance,
                        inChannelList: tempInChannelList.concat(...data.inChannelList),
                        outChannelList: tempOutChannelList.concat(...data.outChannelList),
                    }
                );
            })
            .catch(
                (err) => console.log(err)
            );
    }
}

class ReceiveModal extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Text>{this.props.address}</Text>
               <QRCode
                    value={this.props.address}
                    size={400}
                    bgColor='purple'
                    fgColor='white'/>
            </View>
        )
    }


}

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

const MainStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        CameraModal: {
            screen: CameraModal,
        },
    }
);

const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'column'
    }
});
