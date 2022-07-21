import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { auth } from '../firebase'
import UserProfile from './UserProfile'


const HomeScreen = () => {
  const navigation = useNavigation()

  const [userModal, setUserModal] = useState(false);


  const closeUser = () => {
      setUserModal(false)
  }

  const openuser = () => {
    setUserModal(true)
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <UserProfile visible={userModal} closeUser={closeUser}/>
      <Pressable
        onPress={openuser}
        >
          <Text style={styles.buttonText}>User info</Text>
      </Pressable>
      <Text>Email: {auth.currentUser?.email}</Text>
      <Pressable
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
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
})