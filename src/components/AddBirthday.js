import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Alert} from 'react-native';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import {saveData} from "../utils/firebase"

// import { Container } from './styles';

export default function AddBirthday(props) {
  const {user} = props;
  const {setShowList} = props;
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [date, setDate] = useState(new Date())
  const [formError, setFormError]=useState({})
  const onChange = (e, type) => {
    setFormData({...formData, [type] : e.nativeEvent.text})
  }

  const openOrCloseDatePicker =()=>{
    setOpen(!open);
  }

  const handlerConfirm = (date) =>{ 
    //console.log(moment(date).format("LL"));
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
      setFormData({...formData, dateBirth})
    openOrCloseDatePicker();
  }

  const onSubmit  = () =>{
    let errors ={};
    if(!formData.name || !formData.lastname || !formData.dateBirth){
      if(!formData.name) errors.name = true;
      if(!formData.lastname) errors.lastname = true;
      if(!formData.dateBirth) errors.dateBirth = true;
    }else{
      const data = formData;
      data.dateBirth.setYear(0);
      saveData(user.uid, data);
      setShowList(true);
    }
    setFormError(errors);
  }



  return (
    <>
        <View style={styles.container}>
            <TextInput style={[styles.input, formError.name && {borderColor: '#940c0c'}]}
            placeholder='Nombre'
            placeholderTextColor="#969696"
            onChange={(e)=>onChange(e, "name")}
            />
            <TextInput style={[styles.input, formError.lastname && {borderColor: '#940c0c'}]}
            placeholder='Apellidos'
            placeholderTextColor="#969696"
            onChange={(e)=>onChange(e, "lastname")}
            />
            <View style={[styles.input, styles.DatePicker, formError.dateBirth && {borderColor: '#940c0c'}]}>
              <Text style={{color: formData.dateBirth ? "#fff" : "#969696",
              fontSize:18,}}
              onPress={openOrCloseDatePicker}
              >
                {formData.dateBirth ? moment(formData.dateBirth).format("LL") : "Fecha de nacimiento"}
              </Text>
            </View>
            <TouchableOpacity onPress={onSubmit}>
              <Text style={styles.addButton}>Crear cumpleaños</Text>
            </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode="date"
          onConfirm={handlerConfirm}
          onCancel={openOrCloseDatePicker}
        />
    </>
  );
}

const styles = StyleSheet.create({
  container:{
   height:"100%",
   width:"100%",
   justifyContent: "center",
   alignItems:"center" 
  },
  input:{
    height:50,
    color:"#fff",
    width:"80%",
    marginBottom:25,
    backgroundColor:"#1e3040",
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth:1,
    borderColor: "#1e3040"
  },
  DatePicker:{
    justifyContent: "center"
  },
  addButton:{
    fontSize: 18,
    color: '#fff',
  }
})

