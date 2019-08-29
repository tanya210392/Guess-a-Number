import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native'

import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = ({userNumber, roundsNumber, configureNewGameHandler}) => {
    return (
        <ScrollView>
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
        </ScrollView>
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
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultTextContainer: {
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
});

export default GameOverScreen;
