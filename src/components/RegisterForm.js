import React, {useEffect,useState} from "react";
import {Text, View, TouchableOpacity, StyleSheet, TextInput, Alert} from "react-native";
import { validateEmail } from "../utils/validations";
import firebase, {auth, createUserWithEmailAndPasswordF} from "../../src/utils/firebase"

export default function RegisterForm(props) {
    const {changueForm} = props;
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});
    const register = () =>{
        let errors = {};
        if(!formData.email || !formData.password || !formData.repeatPassword){
            if(!formData.email) errors.email= true;    
            if (!formData.password) errors.password = true;
            if(!formData.repeatPassword) errors.repeatPassword = true;
        }else if(!validateEmail(formData.email)){
            errors.email=true;
        }else if(formData.password !== formData.repeatPassword){
            errors.password = true;
            errors.repeatPassword = true;
            Alert.alert("Las contraseñas no coinciden")
        }else if (formData.password.length < 6){
            errors.password = true;
            errors.repeatPassword = true;
            Alert.alert("Escribe una contraseña de 6 caracteres minimo")
        }else{
            createUserWithEmailAndPasswordF(formData.email, formData.password).then(()=>{
                Alert.alert("Te registraste correctamente");
            }).catch(
                () => {
                    setFormError({
                        email:true,
                        password: true,
                        repeatPassword: true
                    })
                }
            );
        }
        setFormError(errors)
    }

    return(
        <>
            <TextInput 
            style={[styles.input, formError.email &&  styles.error]}
            onChange={e => setFormData({...formData, email:e.nativeEvent.text})}
            placeholder="Correo electronico"
            placeholderTextColor="#969696"/>
            <TextInput
            style={[styles.input, formError.password &&  styles.error]}
            onChange={e => setFormData({...formData, password:e.nativeEvent.text})}
            secureTextEntry={true}
            placeholder="Contraseña"
            placeholderTextColor="#969696"
            />
            <TextInput
            style={[styles.input, formError.repeatPassword &&  styles.error]}
            onChange={e => setFormData({...formData, repeatPassword:e.nativeEvent.text})}
            secureTextEntry={true}
            placeholder="Repite la contraseña"
            placeholderTextColor="#969696"
            />
            <TouchableOpacity onPress={register}>
            <Text style={styles.btnText}>REGISTRAR</Text>
            </TouchableOpacity>

            <View style={styles.login}>
            <TouchableOpacity onPress={changueForm}>
            <Text style={styles.btnText}>Inicia sesión</Text>
            </TouchableOpacity>
            </View>
        </>
    )
};

function defaultValue(){
    return(
        {email: "",
        password: "",
        repeatPassword: ""}
    );
}

const styles= StyleSheet.create({
btnText:{
    color: "#fff",
    fontSize: 18
},
input:{
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
login:{
    flex:1,
    justifyContent: 'flex-end',
    marginBottom:30,
},
error:{
    borderColor:"#940c0c"

}
})