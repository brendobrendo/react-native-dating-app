import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { authentication, db } from '../firebase';
import { query, getDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/core';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation()
  const selected = 'notifications';
  
  useEffect (() => {
    (async () => {
      const q = query(doc(db, "UserInfo", authentication.currentUser.uid));
      const querySnap = await getDoc(q);
      let queryNotfications = [];

      querySnap.data().matchSuggestions.forEach((suggestion) => {
        (async () => {
          const docId = "ms" + authentication.currentUser.uid + suggestion
          const matchSuggestion = query(doc(db, "MatchSuggestions", docId))

          const matchInfo = await getDoc(matchSuggestion);
          queryNotfications.push(matchInfo.data());
          setNotifications(queryNotfications);
        })()
      })
    })(); 
  }, []);

  const getMatchProfile = (matchUserId) => {
    navigation.navigate('MatchProfile', {matchUserId: matchUserId});
  }

  return (
    <View style={styles.container}>
    <Header />
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>Notifications</Text>
      </View>
      <View style={styles.body}>
      <FlatList data={notifications}
        renderItem={(notData) => {
          return (
            <Pressable onPress={()=> getMatchProfile(notData.item.matchUserId)}>
            <View style={styles.notificationBox}>
              <Image style={styles.image} source={require('../assets/images/profileicon.png')} />
              <View>
                <Text style={styles.notificationNameText}>{notData.item.matchFirstName} {notData.item.matchLastName}</Text>
                <Text>Is also interested in {notData.item.matchRestName}</Text>
              </ View>
            </View>
            </Pressable>
          )
        }}
      />
      </View>
    <Footer selected={selected}/>
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  titleText: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: 'center',
    padding: 25,
  },
  titleWrapper: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  image: {
    width: 40,
    height: 40,
    marginHorizontal: 30
  },
  notificationNameText: {
    fontWeight: "700",
  },
})