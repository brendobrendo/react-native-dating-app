import { Modal, Pressable, StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { collection, addDoc, Timestamp, query, orderBy, limit, onSnapshot, where, getDocs } from 'firebase/firestore';
import { db, authentication } from '../firebase';
import config from '../config'
import ChatMessage from './components/ChatMessage';
import LocationOption from './LocationOption';
import * as Location from 'expo-location'
import axios from 'axios';

const Messages = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [userLocation, setUserLocation] = useState({});
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [locationsInfo, setLocationsInfo] = useState([{'user_ratings_total': null, 'price_level': null, 'rating': null, 'name': null, 'photos': [{'photo_reference': null}] }]);

    useLayoutEffect(() => {
        const q = query(collection(db, "messages"), orderBy('createdAt', 'desc'), limit(5))
        // Creates snapshot of the last 5 messages in the messages collection
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let new5messages = [];
            snapshot.forEach((doc) => {
                new5messages.push({'text': doc.data().text})
            })
            setMessages(new5messages);
            // setMessages({last5messages: new5messages});
        });
        return unsubscribe
    }, []);

    const handleNewMessage = () => {
        try {
            const docRef = addDoc(collection(db, "messages"), {
                senderId: authentication.currentUser.uid,
                text: newMessage,
                createdAt: Timestamp.now()
            })
            console.log("Document written with ID: ", docRef.id);
            setNewMessage("")
            
        } catch (e) {
            console.error("error adding document: ", e)
        }
    }

    const locationHandler = async () => {
        // code to grab location, expo-location
        const location = await (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords.latitude, location.coords.longitude);
            setUserLocation(location);
        })();
    };

    const getNearbyLocations = () => {
        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.coords.latitude}%2C${userLocation.coords.longitude}&radius=1000&type=restaurant&key=${config.GOOGLE_PLACES_API_KEY}`)
            .then(response => setLocationsInfo(response.data.results));
    }

    const startLocationModal = () => {
        setModalIsVisible(true);
    };

    const endLocationModal = () => {
        setModalIsVisible(false);
    };

    return (
        <Modal visible={props.visible} animationType="slide" style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
            <View style={styles.buttonContainer}>
                <Pressable onPress={props.closeMessages} style={styles.button}>
                    <Text style={styles.buttonText}>Close messages</Text>
                </Pressable>
                <TextInput
                        placeholder='Add new message'
                        value={newMessage}
                        onChangeText={text => setNewMessage(text)}
                        style={styles.input}
                    />
                <Pressable onPress={handleNewMessage} style={styles.button}>
                    <Text style={styles.buttonText}>Add Message</Text>
                </Pressable>
                <Pressable onPress={locationHandler} style={styles.geoButton}>
                    <Text style={styles.buttonText}>Get Geo Location</Text>
                </Pressable>
                <Pressable onPress={getNearbyLocations} style={styles.geoButton}>
                    <Text style={styles.buttonText}>Get local joints</Text>
                </Pressable>
                <Pressable onPress={startLocationModal} style={styles.geoButton}>
                    <Text style={styles.buttonText}>Photos</Text>
                </Pressable>
            </View>
            </KeyboardAvoidingView>
            <LocationOption closeModal={endLocationModal} showModal={modalIsVisible} placesInfo={locationsInfo}/>
            <View style={styles.messagesContainer}>
                <FlatList data={messages}
                renderItem={(msgData) => {
                    return (
                        <ChatMessage messageText={msgData.item.text} />
                    )
                }}
            />
            </View>
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
      buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      messagesContainer: {
        marginTop: 40,
      },
      geoButton: {
        backgroundColor: 'green',
        width: '80%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
      },
      input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "grey",
        width: '80%',
    },
})