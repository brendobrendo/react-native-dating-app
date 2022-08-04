import { Image, StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import LocationSwipeable from '../LocationSwipeable';
import axios from 'axios';
import config from '../../config';


const Footer = (props) => {
    const [userLocation, setUserLocation] = useState({});
    const [locationOptionModalIsVisible, setLocationOptionModalIsVisible] = useState(false);
    const [locationsInfo, setLocationsInfo] = useState([{'user_ratings_total': null, 'price_level': null, 'rating': null, 'name': null, 'photos': [{'photo_reference': null}] }]);

    const navigation = useNavigation()

    const navHome = () => {
        navigation.navigate("Home")
    }

    const navNavigation = () => {
        Alert.alert(
            "select a navigation style",
            "",
            [
                {
                    text: "Don't do it",
                    onPress: () => locationHandler()
                },
                { 
                    text: "Do it!", 
                    onPress: () => locationHandler()
                }
            ]
        )
    }

    const navNotify = () => {
        navigation.navigate("Notifications")
    }

    const locationHandler = async () => {
        // code to grab location, expo-location
        const location = await (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let myLocation = await Location.getCurrentPositionAsync({});
            console.log(myLocation);
            setUserLocation(myLocation);
        })();

        await getNearbyLocations();
    };

    const getNearbyLocations = async () => {
        await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.coords.latitude}%2C${userLocation.coords.longitude}&radius=1000&type=restaurant&key=${config.GOOGLE_PLACES_API_KEY}`)
            .then(response => {
                console.log(response.data.results);
                setLocationsInfo(response.data.results)
            });
        setLocationOptionModalIsVisible(true);
    }

    const closeLocationModal = () => {
        setLocationOptionModalIsVisible(false);
    }



    return (
        <View style={styles.row}>
            <Pressable onPress={navHome}>
                <Image style={styles.image} source={require("../../assets/images/homeicon.png")} />
            </Pressable>

            <Pressable onPress={navNavigation}>
                <Image style={styles.image} source={require("../../assets/images/navigationicon.png")} />
            </Pressable>

            <Pressable onPress={navNotify}>
                <Image style={styles.image} source={require("../../assets/images/bellicon.png")} />
            </Pressable>
            <LocationSwipeable placesInfo={locationsInfo} showLocationModal={locationOptionModalIsVisible} closeLocationModal={closeLocationModal} />
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    row: {
        width: "100%",
        flexDirection: "row",
        borderColor: "gray",
        borderTopWidth: 2,
        justifyContent: "space-around",
        marginBottom: 15,
        paddingTop: 15
    },
    image: {
        width: 40,
        height: 40
    }
})