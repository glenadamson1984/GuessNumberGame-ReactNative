import React, {useState, useRef, useEffect} from "react";
import {View, StyleSheet, Text, Button, Alert} from "react-native";
import NumberContainer from "./NumberContainer";
import Card from "./Card";
import MainButton from "./MainButton";
import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min: number, max: number, exclude: number) : number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  return rndNum === exclude ? generateRandomBetween(min, max, exclude) : rndNum;
};

const GameScreen = (props: any) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(0, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver} = props;

    useEffect(() => {
       if (currentGuess === props.userChoice) {
            props.onGameOver(rounds);
       }
    }, [currentGuess, userChoice ,onGameOver]);

    const nextGuessHandler = (direction: string) => {
        if ((direction === "lower" && currentGuess < props.userChoice) || (direction === "higher" && currentGuess > props.userChoice)) {
            Alert.alert(`Dont Lie`, `You know this is a wrong`,
                [{
                    text: "Sorry!",
                    style: "cancel"
                }]);
            return;
        }

        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        const numOfRounds = rounds + 1;
        setRounds(numOfRounds);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler("lower")}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <MainButton onPress={() => nextGuessHandler("higher")}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 400,
        maxWidth: "90%",
    }
});

export default GameScreen;