import { StyleSheet, Image, Modal, Pressable, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import config from '../config'

const LocationSwipeable = (props) => {
    const [placeIdx, setPlaceIdx] = useState(0);

    let place = props.placesInfo[placeIdx]

    useEffect(() => {

    }, [placeIdx]);

    const getNext = () => {
        if (placeIdx===props.placesInfo.length-1) {
            setPlaceIdx(0)
        } else {
            setPlaceIdx((placeIdx) => placeIdx+1);
        }
    };

    const getPrev = () => {
        if (placeIdx===0) {
            setPlaceIdx(placesInfo.length-1)
        } else {
            setPlaceIdx((placeIdx) => placeIdx-1);
        }
    };

    return (
        <Modal visible={props.showLocationModal} style={styles.modalContainer}>
            <View style={styles.imageContainer}>
                <Text style={styles.restaurantTitle}>{place.name}</Text>
                <Image style={styles.image} source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&maxheight=802&photo_reference=${place.photos[0]['photo_reference']}&key=${config.GOOGLE_PLACES_API_KEY}`, }} />
                <Text style={styles.restaurantInfo}>Rating: {place['rating']}</Text>
                <Text style={styles.restaurantInfo}>Total Ratings: {place['user_ratings_total']}</Text>
                <Text style={styles.restaurantInfo}>Price Level: {place['price_level']}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.toggleButtonContainer}>
                    <Pressable onPress={getPrev} style={styles.prevButton}>
                        <Text style={styles.buttonText}>Previous</Text>
                    </Pressable>
                    <Pressable onPress={getNext} style={styles.nextButton}>
                        <Text style={styles.buttonText}>Next</Text>
                    </Pressable>
                </View>
                <Pressable onPress={props.closeLocationModal} style={styles.button}>
                    <Text style={styles.buttonText}>Close Modal</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

export default LocationSwipeable

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
    },
    button: {
        backgroundColor: '#0782F9',
        width: 350,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    image: {
        height: 350,
        width: 350,
        marginTop: 50,
        borderRadius: 30,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    restaurantTitle: {
        color: 'black',
        fontWeight: '700',
        fontSize: 35,
        marginTop: 75,
    },
    restaurantInfo: {
        color: 'black',
        fontWeight: '700',
        fontSize: 15,
        marginTop: 20,
    },
    toggleButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
    },
    prevButton: {
        backgroundColor: '#4B0082',
        width: 160,
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        marginRight: 30,
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#9932CC',
        width: 160,
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    }
})