import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { authentication } from '../../firebase';

const ChatMessage = (props) => {
  const getMessageBoxStyle = () => {
    if (props.messageText.senderId === authentication.currentUser.uid) {
      console.log('chat message', props.messageText.senderId)
      return ({
          backgroundColor: '#0782F9',
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
          marginLeft: 10,
          width: '80%',
      }) 
      } else return ({
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        marginLeft: 10,
        width: '80%',
        })
      }

  return (
    <View style = {props.messageText.senderId === authentication.currentUser.uid ? styles.currentUserAlignment : styles.otherUserAlignment} >
    <View style={props.messageText.senderId === authentication.currentUser.uid ? styles.currentUserMessageBox: styles.otherUserMessageBox}>
      <Text style={props.messageText.senderId === authentication.currentUser.uid ? styles.currentUserMessageBoxText: styles.otherUserMessageBoxText}>{props.messageText.text}</Text>
    </View>
    </View>
  )
}

export default ChatMessage

const styles = StyleSheet.create({
  currentUserAlignment: {
    alignItems: 'flex-end'
  },
  otherUserAlignment: {
    alignItems: 'flex-start'
  },
  currentUserMessageBox: {
        backgroundColor: '#0782F9',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        width: '80%',
    },
    currentUserMessageBoxText: {
        color: 'white',
    },
    otherUserMessageBox: {
      backgroundColor: '#ebecf0',
      padding: 10,
      borderRadius: 10,
      margin: 10,
      width: '80%',
  },
  otherUserMessageBoxText: {
      color: 'black',
  }
})