import React from "react";
import {Text, View, StyleSheet, Button, Image} from "react-native";
import DefaultStyles from "../constants/default-styles";

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
          <Text style={DefaultStyles.bodyText}>Number of Rounds {props.roundsNumber}</Text>
          <Text style={DefaultStyles.bodyText}>Number was: {props.userNumber}</Text>
          <Button title="NEW GAME" onPress={props.onRestart} />
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
    }
});

export default GameOverScreen;

