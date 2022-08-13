import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import { query, getDocs, collection, getDoc, doc, orderBy } from 'firebase/firestore';
import { db, authentication } from '../firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import Messages from './Messages';

const MessageScreen = () => {
    const [userMessages, setUserMessages] = useState([]);
    const [chatModalVisible, setChatModalVisible] = useState(false);
    const [clickedCollectionId, setClickedCollectionId] = useState("textMessages2");
    const [chattingPartner, setChattingPartner] = useState(authentication.currentUser.uid);
    const selected = true;

    useEffect(() => {
        (async () => {
            // Get current user's chatting partners
            const q = query(doc(db, 'UserInfo', authentication.currentUser.uid));

            const qSnapshot = await getDoc(q);
            const userInfo = qSnapshot.data();

            let chattingPartners = userInfo.uniqueChattingPartners;

            // Create query snapshots for each of the convos
            const entireChatsList = [];

            for (let i=0; i<chattingPartners.length; i++) {
                const chatUserIds = [authentication.currentUser.uid, chattingPartners[i].id].sort();
                const collectionId = chatUserIds[0] + chatUserIds[1];

                (async () => {
                    let uniqueChatList = [];
                    const qChat = query(collection(db, collectionId), orderBy('createdAt'));
                    const queryChats = await getDocs(qChat);

                    // Get info of chatting partner for this chat
                    let chattingPartnerId;
                    let chattingPartnerFName;
                    let chattingPartnerLName;       

                    queryChats.forEach((doc) => {
                        const messageInfo = doc.data()
                        if (messageInfo.senderId === authentication.currentUser.uid) {
                            chattingPartnerId = messageInfo.recipientId;
                            chattingPartnerFName = messageInfo.recipientFirstName;
                            chattingPartnerLName = messageInfo.recipientLastName;
                            console.log(chattingPartnerId, chattingPartnerFName, chattingPartnerLName);
                            
                        } else {
                            chattingPartnerId = messageInfo.senderId;
                            chattingPartnerFName = messageInfo.senderFirstName;
                            chattingPartnerLName = messageInfo.senderLastName;
                            console.log(chattingPartnerId, chattingPartnerFName, chattingPartnerLName);
                        }
                        uniqueChatList.push({...doc.data(), chattingPartnerId: chattingPartnerId, chattingPartnerFirstName: chattingPartnerFName, chattingPartnerLastName: chattingPartnerLName});
                    });

                    entireChatsList.push(uniqueChatList);
                    setUserMessages(entireChatsList);
                })()
            }
        })()
    }, []);


    const startChatModal = (chattingPartnerId) => {
        
        const chatUserIds = [authentication.currentUser.uid, chattingPartnerId].sort();
        const collectionId = chatUserIds[0] + chatUserIds[1];
        
        setClickedCollectionId(collectionId);
        setChattingPartner(chattingPartnerId);
        setChatModalVisible(true);
    };

    const endChatModal = () => {
        setChatModalVisible(false);
        setClickedCollectionId("textMessages2");
    }

    return (
        <View style={styles.container}>
            <Header selected={selected}/>
            <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>Messages</Text>
            </View>
            <View style={styles.body}>
                <FlatList data={userMessages}
                    renderItem={(msgData) => {
                        return (
                            <Pressable style={styles.notificationBox} onPress={()=>startChatModal(msgData.item[0].chattingPartnerId)}>
                                <View style={styles.textMessageContainer}>
                                    <Text style={styles.notificationNameText}>
                                        {msgData.item[0].chattingPartnerFirstName} {msgData.item[0].chattingPartnerLastName}
                                    </Text>
                                    <Text>{msgData.item[msgData.item.length-1].text}</Text>
                                </ View>
                            </Pressable>
                        )
                    }}
                />
            </View>
            <Messages chatModal={chatModalVisible} closeModal={endChatModal} collectionId={clickedCollectionId} partnerId={chattingPartner}/>
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