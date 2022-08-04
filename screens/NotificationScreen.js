import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { db } from '../firebase';
import { query, getDocs, collection } from 'firebase/firestore';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect (() => {
    const getNotifications = async () => {
      const q = query(collection(db, "UserInfo"));
      const querySnap = await getDocs(q);
      let queryNotfications = [];
      querySnap.forEach((doc) => {
        queryNotfications.push(doc.data());
        console.log(doc.data());
      })

      setNotifications(queryNotfications);
    }  
    getNotifications(); 
  }, []);

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
            <View style={styles.notificationBox}>
              <Image style={styles.image} source={require('../assets/images/profileicon.png')} />
              <View>
                <Text style={styles.notificationNameText}>{notData.item.firstName} {notData.item.lastName}</Text>
                <Text>Is also interested in McGilvra's</Text>
              </ View>
            </View>
          )
        }}
      />
      </View>
    <Footer />
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