import React from "react";
import {Text, View, StyleSheet, Button, Image} from "react-native";
import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors"
import MainButton from "./MainButton";

const GameOverScreen = (props: any) => {
    return (
      <View style={styles.screen}>
          <Text style={DefaultStyles.title}>The Game is Over!</Text>
          <View style={styles.imageContainer}>
              <Image

                  style={styles.image}
                  resizeMode="cover"
                  // for a web resource can do the below
                  //source={{uri: "http://someurl"}}
                  source={require("../assets/success.png")} />
          </View>
          <Text style={[DefaultStyles.bodyText, styles.resultText]}>
              Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text>
               rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
          </Text>
          <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        width: 300,
        height: 300,
        overflow: "hidden",
        marginVertical: 30
    },
    resultText: {
        textAlign: "center",
        fontSize: 20,
    },
    highlight: {
        color: Colors.primary,
        fontFamily: "open-sans-bold",
    }
});

export default GameOverScreen;

