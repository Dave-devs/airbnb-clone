import { StyleSheet } from "react-native";
import colors from "./Colors";

export const defaultStyles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FDFFFF'
    },
    inputField: {
        height: 44,
        borderWidth:1,
        borderColor:'#ABABAB',
        borderRadius:8,
        padding:10,
        backgroundColor:colors.white,
    },
    btn: {
        backgroundColor: colors.primary,
        height:50,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText: {
        color:colors.white,
        fontSize:16,
        fontFamily:'outfit',
    },
    btnIcon: {
        position:'absolute',
        left:16,
    },
    footer: {
        position:'absolute',
        height: 70,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:colors.white,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderTopColor:colors.grey,
        borderTopWidth:StyleSheet.hairlineWidth,
    },
})