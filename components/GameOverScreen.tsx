import React from "react";
import {Text, View, StyleSheet, Button, Image, Dimensions, ScrollView} from "react-native";
import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors"
import MainButton from "./MainButton";

const GameOverScreen = (props: any) => {
    return (
        <ScrollView>
          <View style={styles.screen}>
              <Text style={DefaultStyles.title}>The Game is Over! Opponent guessed {props.userNumber}</Text>
              <View style={styles.imageContainer}>
                  <Image

                      style={styles.image}
                      resizeMode="cover"
                      // for a web resource can do the below
                      //source={{uri: "http://someurl"}}
                      source={require("../assets/success.png")} />
              </View>
              <Text style={[DefaultStyles.bodyText, styles.resultText]}>
                  Your phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text>
                   rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
              </Text>
              <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
          </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        borderRadius: Dimensions.get("window").width * 0.7 / 2,
        borderWidth: 3,
        borderColor: "black",
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        overflow: "hidden",
        marginVertical: Dimensions.get("window").height / 30
    },
    resultText: {
        textAlign: "center",
        fontSize: Dimensions.get("window").height < 400 ? 60 : 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: "open-sans-bold",
    }
});

export default GameOverScreen;

