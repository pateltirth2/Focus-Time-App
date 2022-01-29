import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {fontSizes,paddingSizes } from '../utils/sizes'

import { colors } from '../utils/colors';

export const RoundedButton = ({ style={}, textStyle={}, size= 125, ...props })=>{
    return(
        <TouchableOpacity style={[styles(size).radius , style]} onPress={props.onPress} >
            <Text style={[styles.text, textStyle]} >{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = (size) =>  StyleSheet.create({
    radius:{
        borderRadius:size/2,
        height:size,
        width:size,
        backgroundColor:colors.orange,
        alignItems:"center",
        justifyContent:"center",
        borderColor:"#c98020",
        borderWidth:2,

    },
    text:{
        color:"#fff",
        fontSize:20,
    },
})