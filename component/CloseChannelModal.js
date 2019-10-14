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
        const channelList = params ? params.channelList : null;

        const channelItemList = this.makeChannelItem(channelList);

        return (
            <View>
                <View style={{height: 300, justifyContent: "center", alignItems: "center"}}>
                    <Picker
                        selectedValue={this.state.language}
                        style={{height: 50, width: 300}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                        {Object.keys(channelItemList).map((key) => {
                            return (<Picker.Item label={channelItemList[key]} value={key} key={key}/>)
                        })}
                    </Picker>
                </View>

                <Button style={styles.closeChannelButton} title="Close Channel" onPress={this.handleCloseChannel}/>
            </View>
        )
    }

    makeChannelItem(channelList){
        var channelItemList = {};
        channelList.forEach(function (item, index) {
            channelList[item.channelId] = 'Channel ' + item.channelId + ' ' + item.otherAddress + ' ' + item.myBalance;
        });
        return channelItemList;
    }

    handleCloseChannel = () => {
        const url = "http://141.223.121.139:3001" + '/channels/requests/close';

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
    },
    closeChannelButton:{
        marginTop: 40
    }
});

export default CloseChannelModal;