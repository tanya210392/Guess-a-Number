import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'

import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = ({userNumber, roundsNumber, configureNewGameHandler}) => {
    return (
        <View style={styles.container}>
            <Text style={DefaultStyles.title}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/success.png')}
                    style={styles.image}
                    fadeDuration={1000}
                    resizeMode="cover"/>
            </View>
            <View style={styles.resultTextContainer}>
                <Text style={{...DefaultStyles.bodyText, ...styles.resultText}}>
                    Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>
                </Text>
            </View>
            <MainButton onPress={configureNewGameHandler}>
                NEW GAME
            </MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultTextContainer: {
        marginHorizontal: 20,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
});

export default GameOverScreen;
