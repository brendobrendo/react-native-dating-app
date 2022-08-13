import { Modal, Pressable, StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { db, authentication } from '../firebase';
import ChatMessage from './components/ChatMessage';
import MessagesHeader from './components/MessagesHeader';

const Messages = (props) => {
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [partnerProfile, setPartnerProfile] = useState({'firstName': null, 'lastName': null});
    const [selfProfile, setSelfProfile] = useState({});

    useLayoutEffect(() => {
        if (props.collectionId !== "textMessages2") {
            console.log('the collection id is: ', props.collectionId);
            const q = query(collection(db, props.collectionId), orderBy('createdAt'))
            const unsubscribe = onSnapshot(q, (snapshot) => {
                let collectedMessages = [];
                snapshot.forEach((doc) => {
                    collectedMessages.push(doc.data());
                })
                setChatMessages(collectedMessages);
            });
            return unsubscribe
        }       
    }, [props.collectionId]);

    useEffect(() => {
        (async () => {
            const q = query(doc(db, 'UserInfo', props.partnerId))

            const qSnapshot = await getDoc(q);
            setPartnerProfile(qSnapshot.data())
        })();
    }, [props.collectionId])

    useEffect(() => {
        (async () => {
            const q = query(doc(db, 'UserInfo', props.partnerId))

            const qSnapshot = await getDoc(q);
            setSelfProfile(qSnapshot.data())
        })();
    }, []);

    const handleNewMessage = () => {
        try {
            const docRef = addDoc(collection(db, props.collectionId), {
                senderId: authentication.currentUser.uid,
                senderFirstName: selfProfile.firstName,
                senderLastName: selfProfile.lastName,
                text: newMessage,
                createdAt: Timestamp.now(),
                createdAt: Timestamp.now(),
                recipientId: props.partnerId,
                recipientFirstName: partnerProfile.firstName,
                recipientLastName: partnerProfile.lastName
            })
            
            setNewMessage("")
            
        } catch (e) {
            console.error("error adding document: ", e)
        }
    }

    return (
        <Modal visible={props.chatModal} animationType="slide" style={styles.container}>
            <MessagesHeader chatPartner={partnerProfile} closeMessage={props.closeModal}/>
            <View style={styles.messagesContainer}>
                <FlatList data={chatMessages}
                renderItem={(msgData) => {
                    return (
                        <ChatMessage messageText={msgData.item} />
                    )
                }}
            />
            </View>
            <KeyboardAvoidingView behavior="padding">
            <View style={styles.footer}>
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
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "gray",
        borderTopWidth: 2,
        justifyContent: "space-around",
        marginBottom: 15,
        paddingTop: 15,
    },
    messagesContainer: {
        flex: 1,
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