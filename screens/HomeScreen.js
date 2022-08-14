import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { authentication, db } from '../firebase'
import axios from 'axios'
import { ApiRoot, ApiTest } from "./Api";
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore';
import Header from './components/Header'
import Footer from './components/Footer';



const HomeScreen = (props) => {

  const [booktest, setbooktest] = useState("")
  const selected = 'home';
  // console.log(props)

  useEffect(() => {
    axios.get(`${ApiRoot}/api/books`)
      .then((Response) => {
        console.log(Response.data[0].title)
        setbooktest(Response.data[0].title)
      })
      .catch((err) => console.log(err))
  }, [])


  // adding base user info to db if none exists
  useEffect(() => {
    const checkUser = async () => {
      const q = query(collection(db, "UserInfo"), where("Uid", "==", authentication.currentUser.uid))
      const querysnap = await getDocs(q)
      console.log("checkinguser")
      if (querysnap.empty) {
        console.log("nothing here yet, lets fix that")
        const docRef = await addDoc(collection(db, "UserInfo"), {
          Uid: authentication.currentUser.uid,
          age: null,
          gender: null,
          likedAt: null,
          places: []
        })
      }
      else {
        querysnap.forEach((doc) => {
          console.log(doc.id, "=>", doc.data())
        })
      }
    }
    checkUser();
  }, [])

  console.log("home screen:", selected)
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.body}>

        <Text>Email: {authentication.currentUser?.email}</Text>

      </View>

      <Footer style={styles.flex} selected={selected}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
})