import { StyleSheet, TextInput, KeyboardAvoidingView, View, TouchableOpacity, Text } from 'react-native'
import React, { useState } from 'react';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <View style={styles.inputConatinaer}>
            <TextInput 
                placeholder='Email'
                value={ email }
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput 
                placeholder='Password'
                value={ password }
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => {}}
                style = {styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {}}
                style = {[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputConatinaer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#FF6F61',
        width: '100%',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        marginTop: 5,
        backgroundColor: 'white',
        borderColor: '#FF6F61',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#FF6F61',
        fontWeight: '700',
        fontSize: 16,
    },
})