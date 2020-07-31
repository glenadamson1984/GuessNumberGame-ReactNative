import React, {useState} from "react";
import {View, StyleSheet, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert} from "react-native";
import Card from "./Card";
import Colors from "../constants/colors"
import Input from "./Input";
import NumberContainer from "./NumberContainer";
import DefaultStyles from "../constants/default-styles";

const StartGameScreen = (props: any) => {

    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(0)

    const numberInputHandler = (inputText: string) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    }

    const dismissKeyboardHandler = (touch: any) => {
        Keyboard.dismiss();
    }

    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            return Alert.alert("Invalid Number", "Number has to be between 1 and 100",
                [{text: "Okay", style: "destructive", onPress: resetInputHandler}]);
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue("");
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <Text style={DefaultStyles.bodyText}>You Selected</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
        </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboardHandler}>
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Start a New Game</Text>
                <Card style={styles.inputContainer}>
                    <Text style={DefaultStyles.bodyText}>Select a Number</Text>
                    <Input style={styles.input} blurOnSubmit autoCapitalize="none"
                           autoCorrect={false} keyboardType="number-pad" maxLength={2}
                           onChangeText={numberInputHandler}
                           value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" color={Colors.accent} onPress={resetInputHandler} /></View>
                        <View style={styles.button}><Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",

    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
    },
    input: {
        width: 50,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    button: {
        width: 100,
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    }
});

export default StartGameScreen;