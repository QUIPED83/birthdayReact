import React, {useEffect, useState} from "react"
import {SafeAreaView, StyleSheet, StatusBar} from "react-native"
import Auth from "./src/components/Auth";
import firebase, {auth, salir} from "./src/utils/firebase"
import ListBirthday from "./src/components/ListBirthday";
export default function App() {
  const [user, setUser] = useState(); //variable de estado que nos ayuda a saber cuando un usuario esta logeado y cuando no.
  
  useEffect(() => { //nos ayuda a cambiar la variable de estado una vez que se modifica
    auth.onAuthStateChanged((response)=>{
      setUser(response);
    })
  }, []);

  if(user === undefined) return null; //si el usuario no esta logeado se retorna null

  return(
    <>
    <StatusBar barStyle={"light-content"}></StatusBar>
    <SafeAreaView style={styles.background}>
          {
          user ?
           <ListBirthday user={user}/>
           : 
           <Auth></Auth>
           }
    </SafeAreaView>
    </>
  )
};


const styles = StyleSheet.create({
  background:{
    backgroundColor: "#15212b",
    height: "100%",

  }
});