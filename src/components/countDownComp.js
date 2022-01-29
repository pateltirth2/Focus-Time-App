import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import {colors} from '../utils/colors';
import { fontSizes, paddingSizes } from "../utils/sizes";

const minutesToMillis = (min) => 1000*60*min;

const formatTime = (time) => time <10? `0${time}` : time;

export const CountDown= ({
    minutes=20,
    isPaused,
    onProgress,
    onPause,
    onStart,
    onEnd
})=>{ 

    const [millis, setMillis] = useState(null);
    const interval = React.useRef(null);

    const countDown =()=>{
        
            setMillis((time)=>{
                if(time===0){
                    clearInterval(interval.current);
                    onEnd();
                    return time;
                }
                const timeLeft = time-1000;
    
                // showing progrress
    
                onProgress((timeLeft/minutesToMillis(minutes))*100);
    
                return timeLeft;
            })
        
    }

    useEffect(()=>{
        setMillis(minutesToMillis(minutes))
    },[minutes])

    useEffect(()=>{
        if(isPaused){
            onPause()
            if(interval.current){
                clearInterval(interval.current);
            }
            return;
        }

        interval.current = setInterval(countDown, 1000);

        return ()=> clearInterval(interval.current)
    }, [isPaused])

    const minute  = Math.floor(millis/1000/60) % 60 ;
    const seconds = Math.floor(millis/1000) % 60 ;

    return(      
            <Text style={styles.text} >
                 {formatTime(minute)}:{formatTime(seconds)}
            </Text>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:80,
        color:"rgba(240, 166, 55, 0.8)",
        fontWeight:"bold",
        paddingTop:20,
        backgroundColor: "rgba(15, 80, 191, 0.3)",
        paddingRight:20,
        paddingLeft:20,
        paddingBottom:20,
        borderRadius:20,
        
    },
})