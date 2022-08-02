import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { authentication, db } from '../firebase'
import axios from 'axios'
import { ApiRoot, ApiTest } from "./Api";
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore';
import Header from './components/Header'
import Footer from './components/Footer';



const HomeScreen = () => {

  const [booktest, setbooktest] = useState("")

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

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text>{booktest}</Text>
        <Text style={styles.temp}>Email: {authentication.currentUser?.email}</Text>
      </View>
      <Footer style={styles.flex}/>
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
  flex: {
    flex: 1
  },
  header: {
    paddingTop: 30,
    alignSelf: "flex-end",
    flexDirection: "row",
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