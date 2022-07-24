import { StyleSheet, Text, View, Modal, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { authentication } from '../firebase';
import { ref, uploadBytes } from "firebase/storage"


const UserProfile = (props) => {

    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")

    

    const handleUpdate = () => {
        console.log('Updating');
    }

    // useEffect(() => {
    //     const imageUpload = require("../assets/images/test.png")
    //         if (imageUpload == null) return;
    //         const imageRef = ref(storage, 'images/test.png');
    //         uploadBytes(imageRef, imageUpload);
    // }, [])

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