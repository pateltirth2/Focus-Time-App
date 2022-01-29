import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/roundedButton';

import { colors } from '../../utils/colors';
import { fontSizes, paddingSizes } from '../../utils/sizes';
import { FocusHistory } from './focushistory';
export const Focus = ({addSubject, focusHistory, setFocusHistory}) => {

    const [tmpItem, setTmpItem]= useState(null);

  return (
    <View style={styles.body}> 
        <Text style={styles.TextTitle} >
          FOCUS TIME
        </Text>
      <View style={styles.bodyContainer} >
        <Text style={styles.Text} >What would you like to focus on ?</Text>
        
        <View style={styles.inputFocusContainer} >

        <TextInput
          placeholder='Your current task'
           style={styles.inputFocus}
            onSubmitEditing={({nativeEvent})=>{
                setTmpItem(nativeEvent.text)
            }}
            />

        <RoundedButton
         size={50}
          title="+"
           textStyle={styles.buttonTitle}
            onPress={()=>  addSubject(tmpItem) }     />

        </View>
        
      </View>
      <View style={{height:400, marginBottom:10}} >
        <FocusHistory focusHistory={focusHistory} setFocusHistory={setFocusHistory} addSubject={addSubject} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextTitle:{
    fontSize:40,
    fontWeight:"bold",
    color : colors.orange,
    marginTop:50,
  },
  Text:{
    fontSize:20,
    color: colors.orange
  },
  inputFocus:{
    backgroundColor:"#fff",
    borderRadius:5,
    height:40,
    width:300,
    padding:8,
    textAlign:"center",
    marginBottom:0,
    marginTop:0,
  },
  buttonTitle:{
      fontSize:30,
      color:colors.white
  },
  inputFocusContainer:{   
    height:80,
    width:400,
    padding:15,
    marginBottom:30,
    marginTop:30,
    flexDirection:"row",
    justifyContent:"space-around",
    

  },
  bodyContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:30
  },
});
