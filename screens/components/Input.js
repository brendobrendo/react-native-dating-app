import { StyleSheet, TextInput, View, Modal, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react'

const Input = (props) => {
    return (
        <Modal visible={props.isVisible}>
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View>
                        <TextInput style={styles.input}
                            placeholder="enter a location"
                            value={props.manualLocation}
                            onChangeText={text => props.setManualLocation(text)}>
                        </TextInput>

                        <View style={styles.inrow}>
                            <Text style={styles.button}
                                onPress={() => props.manualClose('cancel')}>
                                Cancel
                            </Text>
                            <Text style={styles.button}
                                onPress={() => props.manualClose()}>
                                Search
                            </Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        // borderColor: "green",
        // borderWidth: 1,
    },
    inrow: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    input: {
        fontSize: 20,
        textAlign: "center",
        width: "90%",
        alignSelf: "center",
        padding: 10,
        marginBottom: 20,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10
    },
    button: {
        fontSize: 25,
        textAlign: "center",
        alignSelf: "center",
        width: "40%",
        color: 'white',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10
    },
})