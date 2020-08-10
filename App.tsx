import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
// SAFEAREA VIEW takes into account notches or phone designs with indentations etc think iphone 11 top notch - to code
// around this i was putting a margin top in place but using this component saves doing so and adjusts for devices without
// the notches. Has to be in top most view so normally app.tsx
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Header from "./components/Header";
import StartGameScreen from "./components/StartGameScreen";
import GameScreen from "./components/GameScreen";
import GameOverScreen from "./components/GameOverScreen";
import * as Font from 'expo-font';
import { AppLoading} from 'expo';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
    });
}

const App = () => {
    const [userNumber, setUserNumber] = useState(-1);
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return <AppLoading startAsync={fetchFonts}
                           onFinish={() => setDataLoaded(true)}
                            onError={(err) => console.log(err)}/>;
    }

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(-1);
    }

    const startGameHandler = (selectedNumber: number) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    }

    const gameOverHandler = (numOfRounds: number) => {
        setGuessRounds(numOfRounds);
    }

    let content = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber && userNumber >= 0 && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
    } else if (guessRounds > 0) {
        content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />;
    }

      return (
          <SafeAreaView style={styles.screen}>
            <Header title="Guess a Number" />
            {content}
          </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default App;
