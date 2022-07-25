import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { query, collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';

const Messages = (props) => {

    const getData = async () => {
        
        const messagesCol = await getDocs(collection(db, 'messages'));
        const messagesList = messagesCol.docs.map(doc => doc.data());

        console.log(messagesList);
    }

    return (
        <Modal visible={props.visible} animationType="slide" style={styles.container}>
            <View>
                <Text>Messages</Text>
            </View>
            <View>
                <Text>Hello World</Text>
            </View>
            <Pressable onPress={props.closeMessages} style={styles.button}>
                <Text style={styles.buttonText}>Close messages</Text>
            </Pressable>
            <Pressable onPress={getData} style={styles.button}>
                <Text style={styles.buttonText}>Get Data</Text>
            </Pressable>
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
})