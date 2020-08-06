import React from 'react';
import {View, StyleSheet, Text, Platform} from "react-native";
import Colors from "../constants/colors"
import DefaultStyles from "../constants/default-styles";

const Header = (props: any) => {
    return (
        <View style={styles.header}>
            <Text style={DefaultStyles.title}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === "android" ? Colors.primary : "white",
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: Platform.OS === "ios" ? "#ccc" : "transparent",
        borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
    },
});

export default Header;