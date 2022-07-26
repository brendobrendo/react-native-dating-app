import { Modal, Pressable, StyleSheet, Text, View, FlatList, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore/lite';
import { db, authentication } from '../firebase';
import ChatMessage from './ChatMessage';

const Messages = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const getData = async () => {
            const messagesCol = await getDocs(collection(db, 'messages'));
            const messagesList = messagesCol.docs.map(doc => doc.data());

            setMessages(messagesList)
        }
        
        getData()
        
      }, messages);

      const handleNewMessage = () => {
        try {
            const docRef = addDoc(collection(db, "messages"), {
                senderId: authentication.currentUser.uid,
                text: newMessage,
                createdAt: Timestamp.now()
            })
            console.log("Document written with ID: ", docRef.id);
            setNewMessage("")

            async () => {
                const messagesCol = await getDocs(collection(db, 'messages'));
                const messagesList = messagesCol.docs.map(doc => doc.data());
    
                setMessages(messagesList)
            }
            
        } catch (e) {
            console.error("error adding document: ", e)
        }
      }

    return (
        <Modal visible={props.visible} animationType="slide" style={styles.container}>
            <View style={styles.messagesContainer}>
                <FlatList data={messages}
                renderItem={(msgData) => {
                    return (
                        <ChatMessage messageText={msgData.item.text} />
                    )
                }}
            />
            </View>
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