import { StyleSheet, TextInput, KeyboardAvoidingView, View, TouchableOpacity, Text, Image} from 'react-native'
import React, { useState } from 'react';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <Image style={styles.logo} source={require('../assets/images/test.png')}/>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.loginbutton}
                >
                    <Text style={styles.loginbuttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.registerbutton}
                >
                    <Text style={styles.registerbuttonText}>Register</Text>
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
        width: "70%"
    },
    inputContainer: {
        width: '100%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "grey",
    },
    buttonContainer: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        flexDirection: "row",
    },
    loginbutton: {
        backgroundColor: '#FF6F61',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginRight: 10
    },
    loginbuttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        textAlign: "center"
    },
    registerbutton: {
        backgroundColor: '#ffffff',
        width: '100%',
        padding: 13,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FF6F61"
    },
    registerbuttonText: {
        color: '#FF6F61',
        fontWeight: '700',
        fontSize: 16,
        textAlign: "center"
    },
    logo: {
        width: 100,
        height: 100,
        margin: 20
    }
})