import { StyleSheet, Text, View, Modal, Pressable, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as imagePicker from "expo-image-picker"
import { ref, uploadBytes, getStorage, deleteObject, getDownloadURL } from "firebase/storage"
import { authentication } from '../firebase';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider, renderers } from 'react-native-popup-menu';


const UserProfile = (props) => {

    const [url, setUrl] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [pfupdate, setPfupdate] = useState(0)
    const useremail = authentication.currentUser.email


    const handleUpdate = () => {
        console.log('Updating');
    }
    
    useEffect(() => {
        const store = getStorage();
        setTimeout(() =>
        getDownloadURL(ref(store, `profile-${useremail}.jpg`))
            .then((url) => setUrl(url)).catch(err => setUrl(false))
        , 1000)
    }, [pfupdate])

    const pickImage = async () => {
        let result = await imagePicker.launchCameraAsync({
            mediaTypes: imagePicker.MediaTypeOptions.Images,
            quality: .5,
            maxWidth: 500,
            maxHeight: 500
        });

        if (!result.cancelled) {
            const store = getStorage();
            const reference = ref(store, `profile-${useremail}.jpg`);

            const img = await fetch(result.uri);
            const bytes = await img.blob();

            uploadBytes(reference, bytes);
            console.log("uploaded profile pic")
        }
        setPfupdate(Math.random());
        console.log(pfupdate)
    }

    const pickGallery = async () => {
        let result = await imagePicker.launchImageLibraryAsync({
            mediaTypes: imagePicker.MediaTypeOptions.Images,
            quality: .5,
            maxWidth: 500,
            maxHeight: 500
        });

        if (!result.cancelled) {
            const store = getStorage();
            const reference = ref(store, `profile-${useremail}.jpg`);

            const img = await fetch(result.uri);
            const bytes = await img.blob();

            uploadBytes(reference, bytes);
            console.log("uploaded profile pic")
        }
        setPfupdate(Math.random());
        console.log(pfupdate)
    }

    const deleteImage = () =>{
        Alert.alert(
            "Delete profile pic?",
            "",
            [
                {
                    text: "Don't do it",
                    onPress: () => {}
                },
                {text: "Do it!", onPress: () => deleteImageResponse()}
            ]
        )
    }
    const deleteImageResponse = async () => {
        const store = getStorage();
        const reference = ref(store, `profile-${useremail}.jpg`);
        deleteObject(reference).then()
            .catch((err) => {
                alert("error deleting at this time")
            })
        setPfupdate(Math.random());
    }

    return (
        <Modal visible={props.isVisible} animationType="slide">
            <MenuProvider>
                <View style={styles.container}>

                    <View style={styles.username}>
                        <Text style={styles.fontSize}>
                            {useremail}'s
                            {"\n"}
                            Profile

                        </Text>
                    </View>

                    <View style={styles.info}>
                        <Menu renderer={renderers.SlideInMenu}>
                            <MenuTrigger>
                                {url ? <Image style={styles.image} source={{ uri: url }} />
                                    : <Image style={styles.image} source={require('../assets/images/test.png')} />
                                }
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={pickImage}>
                                    <Text style={styles.pfpoptions}>Take a photo</Text>
                                </MenuOption>

                                <MenuOption onSelect={pickGallery}>
                                    <Text style={styles.pfpoptions}>Select an image from Gallery</Text>
                                </MenuOption>

                                <MenuOption onSelect={deleteImage}>
                                    <Text style={styles.pfpoptions}>Delete your profile picture</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                        <Text style={styles.fontSize}>
                            Age: {age}
                            {"\n"}
                            Gender: {gender}
                        </Text>
                        <Pressable style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Update Info</Text>
                        </Pressable>

                        <Pressable style={styles.button}
                            onPress={props.closeUser}>
                            <Text style={styles.buttonText}>
                                Exit
                            </Text>
                        </Pressable>
                    </View>

                    <Pressable
                        onPress={props.signOut}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sign out</Text>
                    </Pressable>
                </View>
            </MenuProvider>
        </Modal >
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    username: {
        flex: 1,
    },
    fontSize: {
        fontSize: 20,
        textAlign: "center"
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
        borderRadius: 30
    },
    info: {
        flex: 4,
        alignItems: "center"
    },
    button: {
        backgroundColor: '#0782F9',
        width: 200,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    pfpoptions: {
        fontSize: 20,
        textAlign: "center",
        padding: 5,
        color: "white",
        backgroundColor: "blue",
        paddingVertical: 5
    }
})