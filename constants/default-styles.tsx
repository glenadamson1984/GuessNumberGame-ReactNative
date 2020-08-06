import {Platform, StyleSheet} from "react-native";
import Colors from "../constants/colors"

export default StyleSheet.create({
    bodyText: {
        fontFamily: "open-sans",
    },
    title: {
        fontFamily: "open-sans-bold",
        color: Platform.OS === "ios" ? Colors.primary : "white",
    }
})