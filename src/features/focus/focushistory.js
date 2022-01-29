import React from "react";
import { StyleSheet, View, Text, SafeAreaView, FlatList  } from "react-native";
import { RoundedButton } from "../../components/roundedButton";
import { colors } from "../../utils/colors";

export const FocusHistory = ({focusHistory, setFocusHistory, addSubject})=>{

    return(
        <View>
      
            <SafeAreaView style={{height:350, width:400, margin:30, alignItems:"center", padding:20,borderRadius:10 }} >
                <Text style={{fontSize:20, color:colors.white}} >Your Focus History : </Text>
                
                {!!focusHistory.length && (
          <FlatList
            style={{ width: "100%", height: "100%", paddingTop: 16 , }}
            contentContainerStyle={{ alignItems: "center" }}
            data={focusHistory}
            keyExtractor={(item)=> item.Id }
            renderItem={({ item, index }) => (
                <View style={{flexDirection:"row", alignItems:"flex-start"}} >
                    <View style={styles.historyItemContainer} >
                        <Text style={item.status >0 ? styles.historyItem1 : styles.historyItem0 } >
                          {item.subject}
                        </Text>
                    </View>

                {item.status==0 ?
                    <RoundedButton  size={32} title="+" textStyle={{fontSize:15, color:colors.white}} style={{marginTop:3, marginLeft:4}} onPress={()=>addSubject(item.subject)} /> 
                : 
                    <RoundedButton  size={32} title=">" textStyle={{fontSize:15, color:colors.white}} style={{marginTop:3, marginLeft:4}} onPress={()=>addSubject(item.subject)} />
                }
            </View>
            )}
          />
        )}
        {focusHistory.length==0? 
            <Text style={{fontSize:20, color:colors.white, margin:30}} >Nothing yet</Text>
            :
            null
        }
               
            </SafeAreaView>        
            <View style={{justifyContent:"center",marginLeft:200, marginBottom:20, }} >
                <RoundedButton size={75} title="Clear History" onPress={()=>{setFocusHistory([])}} />
            </View>   
            </View>       
    )
}

const styles = StyleSheet.create({
 
    historyItem1:{
        fontSize:15,
        color:"green",
        backgroundColor:colors.white,
        padding:5,
        borderRadius:5,
        margin:3,
    },
    historyItem0:{
        fontSize:15,
        color:"#c74216",
        backgroundColor:colors.white,
        padding:5,
        borderRadius:5,
        margin:3,
        
        
    },
    historyItemContainer:{
        width:300,
        
    },
})