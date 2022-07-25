import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { authentication } from '../firebase';

const ChatMessage = () => {
  const { text, uid } = props.message;
  const messageClass = uid === authentication.currentUser.uid ? 'sent' : 'received';

  return (
    <View>
      <Text>{text}</Text>
    </View>
  )
}

export default ChatMessage

const styles = StyleSheet.create({})