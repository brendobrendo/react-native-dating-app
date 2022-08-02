import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { signOut } from 'firebase/auth';
import { authentication } from '../../firebase';
import UserProfile from '../UserProfile'
import Messages from '../Messages'

const Header = (props) => {

    const [userModal, setUserModal] = useState(false);
    const [messagesModal, setMessagesModal] = useState(false);
    const navigation = useNavigation()

    const handleSignOut = () => {
        signOut(authentication)
            .then(() => {
                navigation.replace("Login");
            })
            .catch(error => alert(error.message))
    }

    const closeUser = () => {
        setUserModal(false)
    }

    const openuser = () => {
        setUserModal(true)
    }

    const closeMessages = () => {
        setMessagesModal(false)
    }

    const openMessages = () => {
        setMessagesModal(true)
    }

    return (
        <View style={styles.margintop}>
            {/* modals */}
            <UserProfile isVisible={userModal} closeUser={closeUser} signOut={handleSignOut} />
            <Messages visible={messagesModal} closeMessages={closeMessages} />

            {/* top buttons */}
            <View style={styles.row}>
                <Pressable onPress={openMessages}>
                    <Image style={styles.image} source={require('../../assets/images/messageicon.png')} />
                </Pressable>
                <Text>10</Text>
                <Pressable onPress={openuser}>
                    <Image style={styles.image} source={require('../../assets/images/profileicon.jpg')} />
                </Pressable>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    margintop: {
        marginTop: 30
    },
    row: {
        flexDirection: "row"
    },
    image: {
        width: 40,
        height: 40
    }
})