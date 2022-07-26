import { StyleSheet, Text, View } from 'react-native'
import React from 'react';

const ChatMessage = (props) => {
  

  return (
    <View style={styles.messageBox}>
      <Text style={styles.messageBoxText}>{props.messageText}</Text>
    </View>
  )
}

export default ChatMessage

const styles = StyleSheet.create({
    messageBox: {
        backgroundColor: '#0782F9',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        marginLeft: 10,
        width: '80%',
    },
    messageBoxText: {
        color: 'white',
    }
})