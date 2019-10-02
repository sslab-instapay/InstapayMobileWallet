import React from 'react';
import {SectionList, StyleSheet, Text, View, Button} from "react-native";

export default class Channel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.channelLabel}>Channels</Text>
                <SectionList
                    ListHeaderComponent={this.renderHeader}
                    style={styles.channelList}
                    sections={[
                        {title: 'IN', data: this.props.inChannelList},
                        {title: 'OUT', data: this.props.outChannelList},
                    ]}
                    renderItem={({item}) => {
                        if (item.channelType === "IN") {
                            return (<View style={styles.channelRow}>
                                <Text>{convertAddress(item.otherAddress)}</Text>
                                <Text>{item.myDeposit}</Text>
                                <Text style={styles.item}>{item.myBalance}</Text>
                            </View>)
                        } else {
                            return (<View style={styles.channelRow}>
                                <Text style={styles.item}>{convertAddress(item.otherAddress)}</Text>
                                <Text style={styles.item}>{item.otherDeposit}</Text>
                                <Text style={styles.item}>{item.myBalance}</Text>
                            </View>)
                        }
                    }
                    }
                    renderSectionHeader={({section}) => <Text
                        style={styles.channelSectionHeader}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }

    renderHeader = () => {
        return (
            <View style={styles.channelListHeader}>
                <Text style={styles.leftItem}>Address</Text>
                <Text style={styles.textStyle}>Deposit</Text>
                <Text style={styles.rightItem}>Balance</Text>
            </View>
        );
    };
}

function convertAddress(address) {
    return address.substring(0, 8) + "..."
}

const styles = StyleSheet.create({
    channelLabel: {
        marginLeft: 10,
        fontWeight: 'bold'
    },
    channelListHeader: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    channelList: {
        borderRadius: 7,
        borderColor: 'black',
        borderWidth: 0.5,
        height: 200,
        margin: 10,
        flexDirection: "column"
    },
    channelSectionHeader: {
        backgroundColor: '#dcdcdc'
    },
    channelRow: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    leftItem: {
        marginLeft: 10
    },
    rightItem: {
        marginRight: 10
    }

});