import React  from "react";
import { View,  StyleSheet, Text } from "react-native";

import { RoundedButton } from "../../components/roundedButton";
import { colors } from "../../utils/colors";

export const Timing= ({onChangeTime})=>{
    return(
        <View style={styles.buttonWrapper} >
            <RoundedButton size={75} title="5" textStyle={styles.text} onPress={()=> onChangeTime(5)} />
            <RoundedButton size={75} title="10" textStyle={styles.text} onPress={()=> onChangeTime(10)} />
            <RoundedButton size={75} title="20" textStyle={styles.text} onPress={()=> onChangeTime(20)} />
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:20,
        color:colors.white,
        fontWeight:"bold"
    },
    buttonWrapper:{
        flexDirection:"row",
        justifyContent:"space-around",
        height:100,
        width:400,
        margin:40,
    }
})