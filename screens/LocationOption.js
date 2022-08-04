import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import config from '../config';
import * as Location from 'expo-location';
import axios from 'axios';

const LocationOption = () => {

    const [userLocation, setUserLocation] = useState({});
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [locationsInfo, setLocationsInfo] = useState([{'user_ratings_total': null, 'price_level': null, 'rating': null, 'name': null, 'photos': [{'photo_reference': null}] }]);

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
        <View>
            <Pressable onPress={locationHandler} style={styles.geoButton}>
                <Text style={styles.buttonText}>Get Geo Location</Text>
            </Pressable>
            <Pressable onPress={getNearbyLocations} style={styles.geoButton}>
                <Text style={styles.buttonText}>Get local joints</Text>
            </Pressable>
            <Pressable onPress={startLocationModal} style={styles.geoButton}>
                <Text style={styles.buttonText}>Photos</Text>
            </Pressable>
            <LocationOption closeModal={endLocationModal} showModal={modalIsVisible} placesInfo={locationsInfo}/>
        </View>
    )
}

export default LocationOption

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