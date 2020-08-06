import React, {useState, useRef, useEffect} from "react";
import {View, StyleSheet, Text, Button, Alert, ScrollView, Dimensions} from "react-native";
import NumberContainer from "./NumberContainer";
import Card from "./Card";
import MainButton from "./MainButton";
import { Ionicons } from "@expo/vector-icons";
import DefaultStyles from "../constants/default-styles";
import { ScreenOrientation } from "expo";

const generateRandomBetween = (min: number, max: number, exclude: number) : number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  return rndNum === exclude ? generateRandomBetween(min, max, exclude) : rndNum;
};

const renderListItem = (value: any, numOfRound: number) => {
    return (
        <View style={styles.listItem} key={value}>
            <Text style={DefaultStyles.bodyText}>#{numOfRound}</Text>
            <Text style={DefaultStyles.bodyText}>{value}</Text>
        </View>
    );
}

const GameScreen = (props: any) => {
    // to lock screen orientation on a individual screen otherwise do it in app.json
    //ScreenOrientation.loadAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    // can also add the below listening to detect when device changes orientation regardless of the dimensions
    //ScreenOrientation.addOrientationChangeListener

    const initialGuess = generateRandomBetween(0, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get("window").height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver} = props;

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get("window").height);
        }

        Dimensions.addEventListener("change", updateLayout);

        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        }
    });

    useEffect(() => {
       if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses((previousGuesses: number[]) => {
            return [nextNumber, ...previousGuesses];
        })
    };

    if (availableDeviceHeight < 500) {
        return (<View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <View style={styles.controls}>
                <MainButton onPress={() => nextGuessHandler("lower")}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={() => nextGuessHandler("higher")}><Ionicons name="md-add" size={24} color="white" /></MainButton>
            </View>
                <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View style={{marginTop: availableDeviceHeight > 600 ? 20 : 5}}>
                <Card style={styles.buttonContainer}>
                    <MainButton onPress={() => nextGuessHandler("lower")}><Ionicons name="md-remove" size={24} color="white" /></MainButton>
                    <MainButton onPress={() => nextGuessHandler("higher")}><Ionicons name="md-add" size={24} color="white" /></MainButton>
                </Card>
            </View>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
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
        marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
        width: 400,
        maxWidth: "90%",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        alignItems: "center",
    },
    listContainer: {
        flex: 1, // needed for android to scroll
        width: Dimensions.get("window").width > 500 ? "60%" : "80%",
    },
    list: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
    listItem: {
        borderColor: "black",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
    }
});

export default GameScreen;