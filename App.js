import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import Wallet from "./component/Wallets";
import Channel from "./component/Channels"
import SendModal from "./component/SendModal";
import {createStackNavigator} from "react-navigation-stack";
import ReceiveModal from "./component/ReceiveModal";
import CameraModal from "./component/CameraModal";
import Icon from 'react-native-vector-icons/FontAwesome';
import OpenChannelModal from "./component/OpenChannelModal";
import CloseChannelModal from "./component/CloseChannelModal";

const inChannelList = [];
const outChannelList = [];

class HomeScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerLeft:
            <Icon.Button
                name="qrcode"
                size={20}
                onPress={() => navigation.navigate('ReceiveModal', {
                    otherParam: 'Put QRCode',
                    address: params.address,
                })}
            />,
            headerTitle: <Text style={styles.mainLabel}>InstaPay Wallet</Text>,
            headerRight: <Icon.Button
                name="camera"
                size={20}
                onPress={() => navigation.navigate('CameraModal', {
                    otherParam: 'Put QRCode',
                })}
            />
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
                <Wallet address={this.state.address} balance={this.state.balance}/>
                <Channel navigation={this.props.navigation} inChannelList={this.state.inChannelList} outChannelList={this.state.outChannelList}/>
            </View>
        );
    }

    componentDidMount() {
        this.getWalletInformation();
        this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }

    getWalletInformation = () => {
        const url = "http://141.223.121.139:3001" + '/wallets';

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
                this.props.navigation.setParams({ address: data.account.address });
            })
            .catch(
                (err) => console.log(err)
            );
    }
}

const MainStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        CameraModal: {
            screen: CameraModal,
        },
        ReceiveModal: {
            screen: ReceiveModal,
        },
        SendModal: {
            screen: SendModal,
        },
        OpenChannelModal: {
            screen: OpenChannelModal
        },
        CloseChannelModal:{
            screen: CloseChannelModal
        }
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
    },

    qrcodeLabel:{
        color: '#000088',
        fontSize: 18,
    },
    qrcode:{
        marginTop: 15,
    },
    mainLabel: {
        color: 'steelblue',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: "bold"
    },

});
