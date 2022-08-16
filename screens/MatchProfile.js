import { StyleSheet, Text, View, Modal, Pressable, Image, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as imagePicker from "expo-image-picker"
import { ref, uploadBytes, getStorage, deleteObject, getDownloadURL } from "firebase/storage"
import { authentication, db, updateProfile } from '../firebase';
import { updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider, renderers } from 'react-native-popup-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from './components/Header';
import Footer from './components/Footer';
import { useNavigation, route } from '@react-navigation/core';

const MatchProfile = () => {
    const [url, setUrl] = useState("");

    // sets the profile pic url by getting the users pfp from db storage, and updating on state change
    useEffect(() => {
        const store = getStorage();
        setTimeout(() =>
            getDownloadURL(ref(store, `profile-${authentication.currentUser.email}.jpg`))
                .then((url) => setUrl(url)).catch(err => setUrl(false))
            , 1000)
    }, [])

    return (
        <View>
            <Header />
            <Text>MatchProfile</Text>
            <Image style={styles.image} source={{uri:url}}/>
            <Footer />
        </View>
    )
}

export default MatchProfile

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        margin: 15,
        borderRadius: 30
    },
})