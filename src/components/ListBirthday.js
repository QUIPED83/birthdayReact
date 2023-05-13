import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import moment from "moment"
import ActionBar from './ActionBar';
import Birthday from './Birthday';
import AddBirthday from './AddBirthday';
// import { Container } from './styles';
import {collection, query, onSnapshot, QuerySnapshot, orderBy, doc, deleteDoc } from "firebase/firestore"
import {db} from "../utils/firebase";

export default function ListBirthday(props)  {
const [showList, setShowList] = useState(true);
const [birthday, setBirthday] = useState([]);
const [pasatBirthday, setPasatBirthday] = useState([]);
const {user} = props;

useEffect(() => {
  setBirthday([]);
  setPasatBirthday([]);
  const q = query(collection(db, user.uid), orderBy('dateBirth','asc'));
  const consulta = onSnapshot(q, (querySnapshot)=>{
    const itemsArray =[];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      itemsArray.push(data);
  }); 
  formatData(itemsArray);
  })
}, []);

const formatData = (items) =>{
  const currentDate = moment().set({
    hour: 0,
    minute:0,
    second:0,
    millisecond:0,
  });
  const birthdayTempArray = [];
  const pasatBirthdayTempArray = [];
  items.forEach((item)=>{
    const dateBirth = new Date(item.dateBirth.seconds * 1000);
    const dateBirthday = moment(dateBirth);
    const currentYear = moment().get("year");
    dateBirthday.set({year: currentYear});

    const diffDate = currentDate.diff(dateBirthday, "days");
    const itemTemp = item;
    itemTemp.dateBirth = dateBirthday;
    itemTemp.days = diffDate;
    if(diffDate <=0){
      birthdayTempArray.push(itemTemp);
    }else{
      pasatBirthdayTempArray.push(itemTemp);
    }
  })
  setBirthday(birthdayTempArray);
    setPasatBirthday(pasatBirthdayTempArray);
}

const  deleteBirthday =  (birthday) =>{
  Alert.alert (
    'Eliminar cumpleaños',
    `¿Estas seguro de eliminar el cumpleaños de ${birthday.name} ${birthday.lastname}`,
    [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text:'Eliminar',
        onPress: async () => {
          await deleteDoc(doc(db, user.uid, birthday.id));
        },
      },
    ],
    {cancelable: false}
  )
}


  return (
    <View style={styles.container}>
        { showList ? (
        <ScrollView style={styles.scrollView}>
          {birthday.map((item, index)=> (
            <Birthday
            key={index} 
            birthday = {item}
            deleteBirthday={deleteBirthday}
            />
          ))}
          {pasatBirthday.map((item, index)=> (
            <Birthday
            key={index} 
            birthday = {item}
            deleteBirthday = {deleteBirthday}
            />
          ))}
        </ScrollView>
        ) :
        <AddBirthday user = {user} setShowList={setShowList}/>
        }
        <ActionBar setShowList={setShowList} showList={showList}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        height: "100%"
    },
    scrollView:{
      marginBottom:50,
      width: "100%"
    }
})