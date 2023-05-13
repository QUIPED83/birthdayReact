import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Alert} from "react-native";
import { validateEmail } from "../utils/validations";
import firebase, {auth} from "../../src/utils/firebase"
import {signInWithEmailAndPassword} from "firebase/auth"
export default function LoginForm(props) {
    const {changueForm} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    const login =() => {
        let errors = {};
        if(!formData.email || !formData.password){
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            Alert.alert("Falta uno de los campos")
        }else if(!validateEmail(formData.email)){
            errors.email = true;
            Alert.alert("Formato de email no valido!")
        }else{
            signInWithEmailAndPassword(auth, formData.email, formData.password).then(() =>{
                console.log("OK");
              }).catch( 
                () => {
                    setFormError({
                        email: true,
                        password: true
                    });
                    Alert.alert("No se encontró el registro, revisa los datos ingresados")
                }
              )
        }
        setFormError(errors);
    }
    const onChange=(e, type)=>{
       /* usamos [] en una variable al añadirla a un objeto JS*/
        setFormData({
            ...formData, [type]: e.nativeEvent.text
        })
    }

    return(
        <>
            <TextInput
            style={[styles.input, formError.email && styles.error]}
            placeholder="Correo electronico"
            placeholderTextColor={"#969696"}
            onChange={(e)=>onChange(e, "email")}
            ></TextInput>
            <TextInput
            style={[styles.input, formError.password && styles.error]}
            placeholder="Contraseña"
            placeholderTextColor={"#969696"}
            secureTextEntry={true}
            onChange={(e)=>onChange(e, "password")}
            ></TextInput>
            <TouchableOpacity onPress={login}>
            <Text style={styles.btnText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <View style={styles.register}>
            <TouchableOpacity onPress={changueForm}>
            <Text style={styles.btnText}>Registrate aquí</Text>
            </TouchableOpacity>
            </View>
        </>
    )
};

function defaultValue(){
    return{
        email:"",
        password:""
}
}

const styles= StyleSheet.create({
    btnText:{
        color: "#fff",
        fontSize: 18,
    },input:{
        height:45,
        color: "#fff",
        width:"80%",
        marginBottom:25,
        backgroundColor:"#1e3040",
        paddingHorizontal:20,
        borderRadius:30,
        fontSize: 18,
        borderWidth:1,
        borderColor: "#1e3040"
    },
    register:{
        flex:1,
        justifyContent:"center",
        marginBottom: 30
    },error:{
        borderColor:"#940c0c"
    
    }
    })