import { StyleSheet, Text, View, Modal, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { authentication } from '../firebase'
import { ref, uploadBytes } from "firebase/storage"


const UserProfile = (props) => {

    const navigation = useNavigation()

    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    // useEffect(() => {
    //     const imageUpload = require("../assets/images/test.png")
    //         if (imageUpload == null) return;
    //         const imageRef = ref(storage, 'images/test.png');
    //         uploadBytes(imageRef, imageUpload);
    // }, [])

    return (
        <Modal visible={props.visible} animationType="slide">
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
                    <Pressable style={styles.button} onPress={""}>
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
                    onPress={handleSignOut}
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
        alignItems: 'center'
    },
    username: {
        flex: 1,
    },
    fontSize: {
        fontSize: 35,
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