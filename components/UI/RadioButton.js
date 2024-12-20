import { Pressable, StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function RadioButton({ text, selected, onSelect }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.container, selected ? styles.press : null]}
            onPress={onSelect}
        >
            <Text style={[styles.text,
            { color: selected ? 'white' : GlobalStyles.colors.gold }]}>{text}</Text>
        </Pressable>
    )
}

export default RadioButton;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderColor: GlobalStyles.colors.gold,
        borderRadius: 10,
        borderWidth: 1,
        // elevation: 4,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.5,
        // shadowRadius: 4,
    },
    text: {        
        textAlign: 'center',
        fontSize: 18,
    },
    press: {
        backgroundColor: GlobalStyles.colors.lightGreen,
    }
});