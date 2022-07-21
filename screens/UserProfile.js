import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'

const UserProfile = (props) => {
    return (
        <Modal visible={props.visible} animationType= "slide">
            
            <View>
                <Text>UserProfile
                    {console.log(props.visible)}
                </Text>
                <Pressable
                onPress={props.closeUser}>
                    <Text>
                        Exit
                    </Text>
                </Pressable>
            </View>
        </Modal>
    )
}

export default UserProfile

const styles = StyleSheet.create({})