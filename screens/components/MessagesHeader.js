import { StyleSheet, Image, View, Text, Pressable } from 'react-native'
import React from 'react'

const MessagesHeader = (props) => {
  return (
    <View style={styles.margintop}>
        <Pressable onPress={props.closeMessage}>
            <Image style={styles.backButton} source={require('../../assets/images/return-button-icon.jpeg')} />
        </Pressable>
        <View style={styles.row}>
            <Image style={styles.image} source={require('../../assets/images/profileicon.png')} />
            <Text style={styles.headerText}>{props.chatPartner.firstName} {props.chatPartner.lastName}</Text>
        </View>
    </View>
  )
}

export default MessagesHeader

const styles = StyleSheet.create({
    backButton: {
        height: 30,
        width: 30,
    },
    margintop: {
        marginTop: 40,
        flexDirection: "row",
        alignItems: 'center',
        borderColor: "gray",
        borderBottomWidth: 2,
        paddingBottom: 15
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        justifyContent: "center",
    },
    image: {
        width: 30,
        height: 30,
        marginHorizontal: 30
    },
    headerText: {
        fontWeight: "700",
        fontSize: 20,
    }
})