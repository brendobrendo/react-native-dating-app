import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Messages = (props) => {

    return (
        <Modal visible={props.visible} animationType="slide">
            <View>
                <Text>Messages</Text>
            </View>
            <View>
                <Text>Hello World</Text>
            </View>
            <Pressable style={styles.test} onPress={props.closeMessages}>
                <Text>Close messages</Text>
            </Pressable>
        </Modal>
    )
}

export default Messages

const styles = StyleSheet.create({
    test:{
        borderColor: "red",
        borderWidth: 1
    }
})