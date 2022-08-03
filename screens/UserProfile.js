import { StyleSheet, Text, View, Modal, Pressable, Image, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as imagePicker from "expo-image-picker"
import { ref, uploadBytes, getStorage, deleteObject, getDownloadURL } from "firebase/storage"
import { authentication, db, updateProfile } from '../firebase';
import { updateDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider, renderers } from 'react-native-popup-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const UserProfile = (props) => {

    const [url, setUrl] = useState("")
    const [age, setAge] = useState("18")
    const [gender, setGender] = useState("")
    const [story, setStory] = useState("")
    const [pfupdate, setPfupdate] = useState(0)
    const useremail = authentication.currentUser.email


    // updates a users profile
    const handleUpdate = async () => {
        if (parseInt(age) < 18) {
            alert("cant be under 18")
            return
        }
        const q = query(collection(db, "UserInfo"), where("Uid", "==", authentication.currentUser.uid))
        const querysnap = await getDocs(q)
        querysnap.forEach((doc) => {
            // console.log(doc.id, "=>", doc.data())
            updateDoc(doc.ref, {
                age: age,
                gender: gender,
                bio: bio
            })
        })
    }

    // sets the profile pic url by getting the users pfp from db storage, and updating on state change
    useEffect(() => {
        const store = getStorage();
        setTimeout(() =>
            getDownloadURL(ref(store, `profile-${useremail}.jpg`))
                .then((url) => setUrl(url)).catch(err => setUrl(false))
            , 1000)
    }, [pfupdate])

    // opens camera app to take pic to upload as pfp
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
            updateProfile(authentication.currentUser, {
                photoURL: url
            })
            console.log("uploaded profile pic")
        }
        setPfupdate(Math.random());
        console.log(pfupdate)
    }

    // opens gallery to select pic to upload as pfp
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
            updateProfile(authentication.currentUser, {
                photoURL: url
            })

            console.log("uploaded profile pic")
        }
        setPfupdate(Math.random());
        console.log(pfupdate)
    }

    // asks user to confirm deletion of pfp from storage
    const deleteImage = () => {
        Alert.alert(
            "Delete profile pic?",
            "",
            [
                {
                    text: "Don't do it",
                    onPress: () => { }
                },
                { text: "Do it!", onPress: () => deleteImageResponse() }
            ]
        )
    }
    // deletes users pfp from storage
    const deleteImageResponse = async () => {
        const store = getStorage();
        const reference = ref(store, `profile-${useremail}.jpg`);
        deleteObject(reference).then()
            .catch((err) => {
                alert("error deleting at this time")
            })
        updateProfile(authentication.currentUser, {
            photoURL: null
        })
        setPfupdate(Math.random());
    }

    return (
        <Modal visible={props.isVisible} animationType="slide">
            <KeyboardAwareScrollView>
                <MenuProvider>
                    <View style={styles.container}>

                        <View style={styles.section1}>
                            {/* pfp seslection menu */}
                            <Menu renderer={renderers.SlideInMenu}>
                                <MenuTrigger>
                                    {url ? <Image style={styles.image} source={{ uri: url }} />
                                        : <Image style={styles.image} source={require('../assets/images/profileicon.png')} />
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

                            <Text style={styles.username}>
                                {useremail}'s
                                {"\n"}
                                Profile
                            </Text>
                        </View>

                        <View style={styles.stats}>
                            <Text style={styles.bigtext}>
                                My Stats:
                            </Text>
                            {/* age input */}
                            <View style={styles.inRow}>
                                <Text style={styles.fontSize}>Age: </Text>
                                <TextInput style={styles.fontSize}
                                    placeholder={age}
                                    value={age}
                                    onChangeText={text => setAge(text)}>
                                </TextInput>
                            </View>

                            {/* gender slection menu */}
                            <Menu>
                                <MenuTrigger>
                                    <Text style={styles.fontSize}>
                                        Gender: {gender}
                                    </Text>
                                </MenuTrigger>
                                <MenuOptions customStyles={optionsStyles}>
                                    <MenuOption onSelect={() => setGender("male")}>
                                        <Text style={{ fontSize: 25 }}>Male</Text>
                                    </MenuOption>
                                    <MenuOption onSelect={() => setGender("female")}>
                                        <Text style={{ fontSize: 25 }}>Female</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>

                            <Text style={styles.bigtext}>
                                My Story:
                            </Text>


                            <View style={styles.inRow}>
                                <TextInput style={styles.story}
                                    multiline
                                    placeholder='max char limit of 250'
                                    value={story}
                                    onChange={text => setStory(text)}>
                                </TextInput>
                            </View>

                        </View>

                        <Pressable style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Update Info</Text>
                        </Pressable>

                        <Pressable
                            style={styles.button}
                            onPress={props.closeUser}>
                            <Text style={styles.buttonText}>Back</Text>
                        </Pressable>

                        <Pressable
                            style={styles.button}
                            onPress={props.signOut}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </Pressable>
                    </View>
                </MenuProvider>
            </KeyboardAwareScrollView>
        </Modal>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    section1: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center"
    },
    image: {
        width: 150,
        height: 150,
        margin: 15,
        borderRadius: 30
    },
    username: {
        fontSize: 20,
        textAlign: "center"
    },
    stats: {
        width: "80%"
    },
    fontSize: {
        fontSize: 30,
    },
    bigtext: {
        fontSize: 30,
        marginBottom: 15,
        fontWeight: "bold"
    },
    inRow: {
        flexDirection: "row"
    },
    story: {
        width: "100%",
        height: 150,
        fontSize: 20,
        borderColor: "gray",
        borderWidth: 1,
        textAlignVertical: "top",
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
    },
    test: {
        // borderColor: "red",
        // borderWidth: 1
    }
})

const optionsStyles = {
    optionWrapper: {
        backgroundColor: 'lightblue',
    },
};