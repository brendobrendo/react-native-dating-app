import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { authentication } from '../firebase'
import UserProfile from './UserProfile'
import Messages from './Messages'
import axios from 'axios'
import { ApiRoot, ApiTest } from "./Api";
import { signOut } from 'firebase/auth';



const HomeScreen = () => {

  const [userModal, setUserModal] = useState(false);
  const [messagesModal, setMessagesModal] = useState(false);
  const navigation = useNavigation()

  const handleSignOut = () => {
    signOut(authentication)
      .then(() => {
        closeUser();
        navigation.replace("Login");
      })
      .catch(error => alert(error.message))
  }

  const closeUser = () => {
    console.log('Am I even coming in here')
    setUserModal(false)
  }

  const openuser = () => {
    setUserModal(true)
  }

  const closeMessages = () => {
    setMessagesModal(false)
  }

  const openMessages = () => {
    setMessagesModal(true)
  }
  const [booktest, setbooktest] = useState("")
  console.log(ApiRoot)
  console.log(ApiTest)

  useEffect(() => {
    axios.get(`${ApiRoot}/api/books`)
      .then((Response) => {
        console.log(Response.data[0].title)
        setbooktest(Response.data[0].title)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <View style={styles.container}>
      {/* modals */}
      <UserProfile isVisible={userModal} closeUser={closeUser} signOut={handleSignOut} />
      <Messages visible={messagesModal} closeMessages={closeMessages} />

      {/* top buttons */}
      <View style={styles.header}>
        <Pressable onPress={openMessages}>
          <Image style={styles.image} source={require('../assets/images/messageicon.png')} />
        </Pressable>
        <Text style={styles.messagenumber}>10</Text>
        <Pressable onPress={openuser}>
          <Image style={styles.image} source={require('../assets/images/profileicon.png')} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text>{booktest}</Text>
        <Text style={styles.temp}>Email: {authentication.currentUser?.email}</Text>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    paddingTop: 30,
    alignSelf: "flex-end",
    flexDirection: "row",
    // borderColor: "red",
    // borderWidth: 1,
  },
  body: {
    flex: 1
  },
  image: {
    width: 40,
    height: 40,
    margin: 5
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
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
  messagenumber: {
    color: "#0782F9",
    marginLeft: -15,
    fontSize: 20,
    backgroundColor: "lightblue",
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 20
  }
})