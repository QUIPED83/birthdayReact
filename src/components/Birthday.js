import React from "react";
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Birthday (props){
const {birthday, deleteBirthday} = props
const pasat = birthday.days > 0 ? true : false;

const infoDay = () => {
    if (birthday.days === 0){
        return(
            <Text
            style={{color:"#fff"}}
            >Es su cumpleaños!
            </Text>
        )
    }else{
        const days = -birthday.days;
        return(
            <View style={styles.textCurrent}>
                <Text>
                {days}
                </Text>
                <Text>
                    {days === 1 ? 'día' : 'días'}
                </Text>
            </View>
        )
    }
}
    return(
        <TouchableOpacity
            style={[
            styles.card,
            pasat 
                ? styles.pasat 
                : birthday.days === 0 
                ? styles.actual 
                : styles.current
                ]}
                onPress={()=>{deleteBirthday(birthday)}}
                >
            <Text style={[styles.username, pasat ? {color:"#ffffff"} : {color:"#000"}]}>
                {birthday.name} {birthday.lastname}
            </Text>
            {pasat ? <Text style={{color:"#fff"}}>Pasó</Text> : infoDay()}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        color: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingHorizontal: 10,
        margin: 10,
        borderRadius: 15,
    },
    actual:{
        backgroundColor: '#049359',
    },
    current:{
        backgroundColor: '#6bc5fa',
        color:"#000000"
    },
    pasat:{
        backgroundColor: '#9c4e4e',
    },
    username:{
        color: "#000",
        fontSize: 16,
    },
    textCurrent:{
        backgroundColor: "#cce7fd",
        borderRadius: 10,
        width: 70,
        alignItems: "center",
        justifyContent:"center"
    }
})