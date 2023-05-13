import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image} from "react-native"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth() {
 const [isLogin, setIsLogin] = useState(true);

 const changueForm = () => {
    setIsLogin(!isLogin)
 }

    return(
        <View style={styles.view}>
            <Image style={styles.logo} source={require("../assets/cake.png")}></Image>
            {isLogin ? 
            (<LoginForm changueForm = {changueForm}/>)
            :
            (<RegisterForm changueForm = {changueForm}/>)}
        </View>
    );
};

const styles = StyleSheet.create({
    view:{
        flex:1,
        alignItems:"center",
    },
    logo:{
        width: 200,
    height: 200,
    resizeMode: 'stretch',
    marginTop:50,
    marginBottom:50,
    }
})