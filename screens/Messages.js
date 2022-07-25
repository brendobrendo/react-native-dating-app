import { Modal, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';

const Messages = (props) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const messagesCol = await getDocs(collection(db, 'messages'));
            const messagesList = messagesCol.docs.map(doc => doc.data());

            setMessages(messagesList)
        }

        getData()
    }, messages);

    return (
        <Modal visible={props.visible} animationType="slide" style={styles.container}>
            <Pressable onPress={props.closeMessages} style={styles.button}>
                <Text style={styles.buttonText}>Close messages</Text>
            </Pressable>
            <View style={styles.messagesContainer}>
                <FlatList data={messages}
                    renderItem={(msgData) => {
                        return (
                            <Text>{msgData.item.text}</Text>
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
        width: '60%',
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
    messagesContainer: {}
})