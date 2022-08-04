import { Modal, Pressable, StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { collection, addDoc, Timestamp, query, orderBy, limit, onSnapshot, where, getDocs } from 'firebase/firestore';
import { db, authentication } from '../firebase';
import ChatMessage from './components/ChatMessage';
import Header from './components/Header';
import Footer from './components/Footer'

const Messages = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");


    useLayoutEffect(() => {
        const q = query(collection(db, "messages"), orderBy('createdAt', 'desc'), limit(5))
        // Creates snapshot of the last 5 messages in the messages collection
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let new5messages = [];
            snapshot.forEach((doc) => {
                new5messages.push(doc.data());
            })
            setMessages(new5messages);
            // setMessages({last5messages: new5messages});
        });
        return unsubscribe
    }, []);

    const handleNewMessage = () => {
        try {
            const docRef = addDoc(collection(db, "messages"), {
                senderId: authentication.currentUser.uid,
                text: newMessage,
                createdAt: Timestamp.now(),
                recipientId: "KLUDoUpCZoRommxPFUp4qKr6nZM2"
            })
            console.log("Document written with ID: ", docRef.id);
            setNewMessage("")
            
        } catch (e) {
            console.error("error adding document: ", e)
        }
    }

    return (
        <Modal visible={props.visible} animationType="slide" style={styles.container}>
            <Header />
            <View style={styles.messagesContainer}>
                <FlatList data={messages}
                renderItem={(msgData) => {
                    return (
                        <ChatMessage messageText={msgData.item} />
                    )
                }}
            />
            </View>
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
            </View>
            </KeyboardAvoidingView>
            <Footer />
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