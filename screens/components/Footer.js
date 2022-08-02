import { Image, StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

const Footer = (props) => {
    const navigation = useNavigation()

    const navHome = () => {
        navigation.navigate("Home")
    }

    const navNavigation = () => {
        Alert.alert(
            "select a navigation style",
            "",
            [
                {
                    text: "Don't do it",
                    onPress: () => { }
                },
                { text: "Do it!", onPress: () => {}}
            ]
        )
    }

    const navNotify = () => {
        navigation.navigate("Notifications")
    }



    return (
        <View style={styles.row}>
            <Pressable onPress={navHome}>
                <Image style={styles.image} source={require("../../assets/images/homeicon.png")} />
            </Pressable>

            <Pressable onPress={navNavigation}>
                <Image style={styles.image} source={require("../../assets/images/navigationicon.png")} />
            </Pressable>

            <Pressable onPress={navNotify}>
                <Image style={styles.image} source={require("../../assets/images/bellicon.png")} />
            </Pressable>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    row: {
        width: "100%",
        flexDirection: "row",
        borderColor: "gray",
        borderTopWidth: 2,
        justifyContent: "space-around",
        marginBottom: 15,
        paddingTop: 15
    },
    image: {
        width: 40,
        height: 40
    }
})