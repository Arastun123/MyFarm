import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";

function LoginScreen({ }) {
    const navigation = useNavigation()
    const [inputs, setInputs] = useState({
        username: {
            value: ''
        },
        password: {
            value: ''
        },
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curValues) => {
            return {
                ...curValues,
                [inputIdentifier]: { value: enteredValue }
            };
        });
    }

    function login() {
        console.log(inputs);
        navigation.navigate('Əsas səhifə');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Daxil olmaq üçün sizə təyin olunmuş istifadəçi adı və parolu daxil edin!</Text>
            <Input
                label='Istifadəçi adı'
                textinputConfig={{
                    onChangeText: inputChangeHandler.bind(this, 'unsername'),
                    value: inputs.username,
                }}
            />
            <View style={styles.passwordContainer}>
                <View style={{ flex: 1 }}>
                    <Input
                        label='Parol'
                        textinputConfig={{
                            onChangeText: inputChangeHandler.bind(this, 'password'),
                            value: inputs.password,
                            secureTextEntry: !passwordVisible
                        }}
                    />
                </View>
                <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Feather
                        name={passwordVisible ? 'eye-off' : 'eye'}
                        size={16}
                        color={GlobalStyles.colors.primary800}
                        style={styles.toggleText}
                    />
                </Pressable>
            </View>

            <Button
                text='Daxil ol'
                onPress={login}
                color='green'
            />

        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: GlobalStyles.colors.primary800,
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    toggleText: {
        margin: 8,
        marginTop: 30,
        color: GlobalStyles.colors.primary800,
        justifyContent: 'center',
        alignItems: 'center'
    }
});