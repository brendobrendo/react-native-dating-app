import { StyleSheet, Text, View, Modal, Pressable, Image, ImagePickerIOS, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as imagePicker from "expo-image-picker"
import { ref, uploadBytes, getStorage } from "firebase/storage"
import { authentication } from '../firebase';


const UserProfile = (props) => {

    const [username, setUsername] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")



    const handleUpdate = () => {
        console.log('Updating');
    }

    // useEffect (() =>{
    //     (async () => {
    //         if (Platform.OS !== "web") {
    //             const { staus } = await imagePicker.requestCameraPermissionsAsync();
    //             if (staus !== "granted") {
    //                 alert("give me camera")
    //             } 
    //         }
    //     })();
    // }, []);

    useEffect (() => {
        const user = authentication.currentUser.email
        setUsername(user)
    },[])

    const pickImage = async () => {
        let result = await imagePicker.launchCameraAsync({
            mediaTypes: imagePicker.MediaTypeOptions.Images,
            quality: .5,
            maxWidth: 500,
            maxHeight: 500
        });

        if (!result.cancelled) {
            const store = getStorage();
            const reference = ref(store, `profile-${username}.jpg`);

            const img = await fetch(result.uri);
            const bytes = await img.blob();

            uploadBytes(reference, bytes);
            console.log("uploaded profile pic")
        }
    }

    return (
        <Modal visible={props.isVisible} animationType="slide">
            <View style={styles.container}>

                <View style={styles.username}>
                    <Text style={styles.fontSize}>
                        user in db's
                        {"\n"}
                        Profile

                    </Text>
                </View>


                <View style={styles.info}>
                    <Image style={styles.image} source={require('../assets/images/test.png')} />
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


                <Pressable onPress={pickImage}>
                    <Text>Uplaod image</Text>
                </Pressable>

                <Pressable
                    onPress={props.signOut}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </Pressable>

            </View>
        </Modal>
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
        margin: 20
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
})