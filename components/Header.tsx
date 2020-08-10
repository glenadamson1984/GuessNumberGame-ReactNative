import React from 'react';
import {View, StyleSheet, Text, Platform} from "react-native";
import Colors from "../constants/colors"
import DefaultStyles from "../constants/default-styles";

const Header = (props: any) => {
    return (
        <View style={{...styles.headerBase, ...Platform.select({
                ios: styles.headerIOS,
                android: styles.headerAndroid
            })}}>
            <Text style={DefaultStyles.title}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
        borderBottomColor: Platform.OS === "ios" ? "#ccc" : "transparent",
        borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    },
    headerIOS: {
        backgroundColor: "white",
        borderBottomColor:"#ccc",
        borderBottomWidth: 1,
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    },
});

export default Header;