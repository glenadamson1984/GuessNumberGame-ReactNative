import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";
import Colors from "../constants/colors";

// YOU CAN RENAME THE FILE EXTENSION OF ANY FILE WITH A .ANDROID OR .IOS AND THEN IMPORT JUST THE FOLLOWING
// MainButton AND EXPO WILL DO THE WORK OF RENDERING WHICH FILE IT NEEDS BASED ON THE LONGER FILE EXTENSION

const MainButton = (props: any) => {
    let ButtonComponent: any = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >=21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: "hidden",
    },
    button:{
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: "white",
        fontFamily: "open-sans",
        fontSize: 18,
    },
});

export default MainButton;