import React,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Focus } from './src/features/focus/focus';
import { Timer } from './src/features/timer/timer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useKeepAwake } from 'expo-keep-awake';

export default function App() {
 useKeepAwake()
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const [id, setId] = useState(0);

  const saveFocusHistory = async() =>{
    try {
      await AsyncStorage.setItem( "focusHistory" , JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  }

  const loadFocusHistory = async()=>{
    try {
     const history = await AsyncStorage.getItem("focusHistory");

     if(history && JSON.parse(history).length ){
        setFocusHistory(JSON.parse(history));
     }

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    loadFocusHistory();
  },[])
  
  useEffect(()=>{
    saveFocusHistory();
  },[focusHistory])
   
  return (
    
    <View style={styles.body} >   
        {focusSubject ? 
        <Timer 

          FocusSubject={focusSubject}

          onTimerEnd={()=>{
            
            setFocusHistory([...focusHistory, {Id : id, subject: focusSubject, status : 1}]);

            setId(id+1);
            console.log(focusHistory);

            setFocusSubject(null)}}

          clearSubject={()=>{

            setFocusHistory([...focusHistory, {Id : id, subject: focusSubject, status : 0}]);

            setId(id+1)
            console.log(focusHistory);
            setFocusSubject(null)
          }}
        /> 
            : 
            <View style={{flex:1, padding:100}} >
            <Focus
    
              addSubject={setFocusSubject}
              focusHistory={focusHistory}
              setFocusHistory={setFocusHistory}
    
            />

            {/* <FocusHistory focusHistory={focusHistory} onClear={onClear} /> */}

            </View>
         }  
          

        {/* <Text style={styles.Text} > {focusSubject} </Text> */}
    </View>  

  );
}

const styles = StyleSheet.create({
  body:{
    flex: 1,
    backgroundColor: '#0c1136',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text:{
    color:"#fff",
    fontSize:20
  },
});
