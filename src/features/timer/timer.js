import React, { useEffect, useState } from 'react';
import { Alert, ColorPropType, Platform, StyleSheet, Text, Vibration, View  } from 'react-native';
import { TextInput,ProgressBar} from 'react-native-paper';

import { Timing } from './timing';
import { RoundedButton } from '../../components/roundedButton';
import {  CountDown } from '../../components/countDownComp';
import { colors } from '../../utils/colors';
import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ( {FocusSubject, onTimerEnd, clearSubject} ) =>{

    useKeepAwake();

    const [minutes, setMinutes] = useState(0.1);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);
    const [pauseCounter, setPauseCounter] = useState(0);
    const [tmpItem, setTmpItem] =useState(0);

    const changeTime=(min)=>  {
        setProgress(1);
        setIsStarted(false);
        setMinutes(min);
    }

    const OnProgress=(p)=>{
        setProgress(p/100);  
    }

    const onPause = () => {
        setPauseCounter(pauseCounter + 1);
      };

    const onEnd = ()=>{
        vibrate();
        setProgress(1);
        setIsStarted(false);
        setMinutes(0.1);
        onTimerEnd();
        
    }

    const vibrate = ()=>{
        if(Platform.OS==="ios"){
            const interval = setInterval(() => {
                Vibration.vibrate();
            }, 1000);
           setTimeout(()=>clearInterval(interval), 10000) ;
        }else{
            Vibration.vibrate(3000)
        }
    }

    return(
        <View style={styles.body} >
            <View style={styles.countDown} >
                <CountDown minutes={minutes}  isPaused={!isStarted} onProgress={OnProgress} onPause={onPause} onEnd={onEnd} />
            </View>

            <View style={styles.container} >
                <Text style={styles.title} >
                    Focusing on :
                </Text>
                <Text style={styles.subject} >
                    {FocusSubject}
                </Text>    
            </View>

            <View style={styles.progressBarContainer} >
                <ProgressBar progress={progress} color={colors.orange} style={{height:20,}} />
            </View>

            <View style={styles.changeTimeContainer} >
                <TextInput
                    placeholder='change time to'
                    style={styles.inputChangeTime}
                    // onChangeText={(data)=> setMinutes(data) }
                    onSubmitEditing={({nativeEvent})=>{
                        setTmpItem(nativeEvent.text)
                    }}
                />

                <RoundedButton
                    size={50}
                    title=">"
                    textStyle={styles.buttonTitle}
                    onPress={()=>  {setMinutes(tmpItem), setProgress(1)} }
                    style={{marginRight:20}}     
                />
            </View>

            <View style={styles.buttonWrapper} >
                <Timing onChangeTime={changeTime} />
            </View>
            {!isStarted ? (
          <RoundedButton size={100} title="start" style={styles.pausePlay} textStyle={styles.title} onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton size={100} title="pause" style={styles.pausePlay} textStyle={styles.title} onPress={() => setIsStarted(false)} />
        )}
        <View style={styles.clearSubjectContainer} >
            <RoundedButton size={50} textStyle={styles.buttonTitle} title="-" style={{marginLeft:20,}} onPress={()=>{ clearSubject() }} />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:"center"
    },
    subject:{
        fontSize:30,
        color: colors.orange ,
        fontWeight:"bold"
    },
    title:{
        fontSize:20,
        color:colors.white,
        
    },
    container:{
        paddingTop:50,
        alignItems:"center"
    },
    countDown:{
        marginTop:40,
        alignItems:"center",
        justifyContent:"center",
        flex:1
    },
    pausePlay:{
        margin:20,
    },
    progreessBar:{
        
        height:10
    },
    progressBarContainer:{
        height:50,
        width:400,
        justifyContent:"center",
    },
    changeTimeContainer:{
        height:150,
        width:400,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    inputChangeTime:{
        backgroundColor:"#fff",
        borderRadius:5,
        height:40,
        width:250,
        padding:8,
        textAlign:"center",
        margin:20,
    },
    buttonTitle:{
        fontSize:30,
        color:colors.white,    
    },
    clearSubjectContainer:{
        
        justifyContent:'flex-end',
        margin:10,
        alignItems:"flex-start",
        width:400,
        
    },
})