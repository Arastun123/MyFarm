import { View, Text, TextInput, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function Input({ label, textinputConfig }) {
    const inputStyles = [styles.input];

    if (textinputConfig && textinputConfig.multiline) inputStyles.push(styles.inputMultiline)

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                {...textinputConfig}
                placeholderTextColor="#fff" 
                style={inputStyles}
                
            />
        </View>
    )
}
export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        color: GlobalStyles.colors.primary500,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary700,
        color: '#fff',
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 150,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    }
});