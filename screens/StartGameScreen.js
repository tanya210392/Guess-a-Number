import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const StartGameScreen = ({startGameHandler}) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace((/[^0-9]/g), ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };

        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (!chosenNumber || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text style={DefaultStyles.bodyText}>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={startGameHandler.bind(this, selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.container}>
                        <Text style={DefaultStyles.title}>Start a New Game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text style={DefaultStyles.bodyText}>Select a Number</Text>
                            <Input
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                style={styles.input}
                                onChangeText={numberInputHandler}
                                value={enteredValue} />
                            <View style={styles.buttonsContainer}>
                                <View style={{width: buttonWidth}}>
                                    <Button
                                        onPress={resetInputHandler}
                                        color={Colors.accent}
                                        title="Reset" />
                                </View>
                                <View style={{width: buttonWidth}}>
                                    <Button
                                        onPress={confirmInputHandler}
                                        color={Colors.primary}
                                        title="Confirm" />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;
