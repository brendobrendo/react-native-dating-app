import { Modal, Pressable, StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp, query, orderBy, limit } from 'firebase/firestore/lite';
import { db, authentication } from '../firebase';
import ChatMessage from './ChatMessage';
import * as Location from 'expo-location'

const Messages = (props) => {
    const [messages, setMessages] = useState(["", "", "", "", ""]);
    const [messagesSent, setMessagesSent] = useState(0);
    const [newMessage, setNewMessage] = useState("");

    const getMessages2 = async () => {
        // getDocs => Executes a query and returns the result as a query snapshot
            // query snapshot = 
        // collection => Gets a collection reference at a specific path 
            // In the example below, it gets the collectionRef of "messages" within our firestore instance
        const messagesCol = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(5)));
        const messagesList = messagesCol.docs.map(doc => doc.data());

        setMessages(messagesList);
        return messagesList;
    }

    // Creates global variable that holds messages query snapshot (should change in real time)
    const snapshotMessages = getMessages2();
    
    useEffect(() => {
        // Do I need to put anything in here?
        // Just want it to re-render messages when a new message is added to the server
    }, messages );

    const handleNewMessage = () => {
        try {
            const docRef = addDoc(collection(db, "messages"), {
                senderId: authentication.currentUser.uid,
                text: newMessage,
                createdAt: Timestamp.now()
            })
            console.log("Document written with ID: ", docRef.id);
            setNewMessage("")
            
        } catch (e) {
            console.error("error adding document: ", e)
        }
    }

    const handleMessagesUpdate = () => {
        const getMessages = async () => {
            const messagesCol = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(5)));
            const messagesList = messagesCol.docs.map(doc => doc.data());

            setMessages(messagesList)
            setMessagesSent(messagesSent+1);
        }

        getMessages();
    }

    const locationHandler = async () => {
        // code to grab location, expo-location
        const location = await (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords.latitude, location.coords.longitude);
            return location
        })();
    };

    return (
        <Modal visible={props.visible} animationType="slide" style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
            <View style={styles.buttonContainer}>
                <Pressable onPress={props.closeMessages} style={styles.button}>
                    <Text style={styles.buttonText}>Close messages</Text>
                </Pressable>
                <TextInput
                        placeholder='Add new message'
                        value={newMessage}
                        onChangeText={text => setNewMessage(text)}
                        style={styles.input}
                    />
                <Pressable onPress={handleNewMessage} style={styles.button}>
                    <Text style={styles.buttonText}>Add Message</Text>
                </Pressable>
                <Pressable onPress={handleMessagesUpdate} style={styles.button}>
                    <Text style={styles.buttonText}>Update Message List</Text>
                </Pressable>
                <Pressable onPress={locationHandler} style={styles.geoButton}>
                    <Text style={styles.buttonText}>Get Geo Location</Text>
                </Pressable>
            </View>
            </KeyboardAvoidingView>
            <View style={styles.messagesContainer}>
                <FlatList data={messages}
                renderItem={(msgData) => {
                    return (
                        <ChatMessage messageText={msgData.item.text} />
                    )
                }}
            />
            </View>
        </Modal>
    )
}

export default Messages

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      messagesContainer: {
        marginTop: 40,
      },
      geoButton: {
        backgroundColor: 'green',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "grey",
        width: '80%',
    },
})