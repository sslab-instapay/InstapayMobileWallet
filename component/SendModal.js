import {Text, View, StyleSheet, Button} from "react-native";
import React from 'react';

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

export default SendModal;