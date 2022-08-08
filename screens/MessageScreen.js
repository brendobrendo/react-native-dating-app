import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import { query, getDocs, collection, where, addDoc, Timestamp, getDoc, doc, orderBy } from 'firebase/firestore';
import { db, authentication } from '../firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import { async } from '@firebase/util';

const MessageScreen = () => {
    const [userMessages, setUserMessages] = useState([]);
    const [chatModalVisible, setChatModalVisible] = useState(false);
    let topUniqueMessages = [];

    userMessages.forEach(uniqueChat => {
        console.log(uniqueChat);
        topUniqueMessages.push(uniqueChat[0]);
    });


    // useEffect(() => {
    //     const getMessages = async () => {

    //         // Get messages sent by user
    //         const qSentMessages = query(collection(db, "textMessages"),
    //             where("senderId", "==", authentication.currentUser.uid));
    //         const querySnapSent = await getDocs(qSentMessages);
    //         let querySentMessages = [];
    //         querySnapSent.forEach((doc) => {
    //             querySentMessages.push(doc.data());
    //         });

    //         // Get messages rec by user
    //         const qRecMessages = query(collection(db, "textMessages"),
    //             where("recipientId", "==", authentication.currentUser.uid));
    //         const querySnapRec = await getDocs(qRecMessages);
    //         let queryRecMessages = [];
    //         querySnapRec.forEach((doc) => {
    //             queryRecMessages.push(doc.data());
    //         });

    //         orderMessageResults(querySentMessages, queryRecMessages)
    //     }
    //     getMessages();
    // }, []);

    // Helper function for getMessages (in useEffect)
    // Takes an array of messageDocs, and then creates a
    // key for each unique user the current user has messaged with
    // The value is an array (queue or stack?) that contains all the docs
    // related to that unique user- ordered by createdAt field. 
    const orderMessageResults = (sentMessages, recMessages) => {
        // key is uid of the other user in the unique chat
        // value is an ordered array (by date) of all messages with that user
        let uniqueChatTable = {};

        for (let i = 0; i < sentMessages.length; i++) {
            if (uniqueChatTable.hasOwnProperty(sentMessages[i]['recipientId'])) {
                uniqueChatTable[sentMessages[i]['recipientId']].push(sentMessages[i])
            } else uniqueChatTable[sentMessages[i]['recipientId']] = [sentMessages[i]]
        }

        for (let i = 0; i < recMessages.length; i++) {
            if (uniqueChatTable.hasOwnProperty(recMessages[i]['senderId'])) {
                uniqueChatTable[recMessages[i]['senderId']].push(recMessages[i])
            } else uniqueChatTable[recMessages[i]['senderId']] = [recMessages[i]]
        }

        let uniqueChatArray = []
        for (const uniqueChat in uniqueChatTable) {
            uniqueChatArray.push(uniqueChatTable[uniqueChat])
        }

        setUserMessages(uniqueChatArray);
    }

    const handleNewMessage = () => {
        let usersArray = ['QSeXDbdbhRdfX52PCaeBitqa36V2', 'K7kChQS90FS0DEVPEG5Wj5z8g972'].sort();
        const chatCollectionId = usersArray[0]+usersArray[1];

        try {
            const docRef = addDoc(collection(db, chatCollectionId), {
                senderId: 'QSeXDbdbhRdfX52PCaeBitqa36V2',
                text: 'wazahh?',
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
                recipientId: 'K7kChQS90FS0DEVPEG5Wj5z8g972'
            })
            console.log("Document written with ID: ", docRef.id);
            
        } catch (e) {
            console.error("error adding document: ", e)
        }
    };

    const getUserDocRef = async () => {
        // Get current user's chatting partners
        const q = query(doc(db, 'UserInfo', 'QSeXDbdbhRdfX52PCaeBitqa36V2'));

        const qSnapshot = await getDoc(q);
        const userInfo = qSnapshot.data();

        let chattingPartners = userInfo.uniqueChattingPartners;
        
        // Create query snapshots for each of the convos
        let chatsList = [];
        console.log("initializing chatsList")
        for (let i=0; i<chattingPartners.length; i++) {
            console.log('entering chatting partner loop:', i);
            const chatUserIds = [authentication.currentUser.uid, chattingPartners[i].id].sort();
            const collectionId = chatUserIds[0] + chatUserIds[1];

            // Get messages from specific convo/collection
            const getChatMessages = async () => {  
                let chatListHold = [];
                console.log("Initializing empty subarray, chatListHold, for loop: ", i);
                const qChat = query(collection(db, collectionId), orderBy('createdAt'));
                const queryChats = await getDocs(qChat); 

                // Async issue: Goes back to start of for loop
                queryChats.forEach((doc) => {
                    chatListHold.push(doc.data());
                    console.log("text from partner ", i, ": ", doc.data());
                });

                chatsList.push(chatListHold);
            }

            getChatMessages();
        };

        console.log(chatsList);
        return chatsList
    }

    const endChatModal = () => {
        setChatModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>Messages</Text>
            </View>
            <View style={styles.body}>
                <FlatList data={topUniqueMessages}
                    renderItem={(msgData) => {
                        return (
                            <View style={styles.notificationBox}>
                                <View style={styles.textMessageContainer}>
                                    <Text style={styles.notificationNameText}>
                                        {msgData.item.senderId === authentication.currentUser.uid ? msgData.item.recipientFirstName : msgData.item.senderFirstName} {msgData.item.senderId === authentication.currentUser.uid ? msgData.item.recipientLastName : msgData.item.senderLastName}
                                    </Text>
                                    <Text>{msgData.item.text}</Text>
                                </ View>
                            </View>
                        )
                    }}
                />
            </View>
            <Pressable onPress={""} style={styles.button}>
                <Text style={styles.buttonText}>Get updated message table</Text>
            </Pressable>
            <Footer />
        </View>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    titleText: {
        fontSize: 34,
        fontWeight: "700",
        textAlign: 'center',
        padding: 25,
    },
    titleWrapper: {
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    notificationBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    image: {
        width: 40,
        height: 40,
        marginHorizontal: 30
    },
    notificationNameText: {
        fontWeight: "700",
    },
    textMessageContainer: {
        marginLeft: 30,
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
})