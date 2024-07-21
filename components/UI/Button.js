import { Pressable, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ text, onPress, color }) {
    return (
        <Pressable style={{...styles.button, backgroundColor: color}} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

export default Button;

const styles = StyleSheet.create({
    button:{
        width: 150,
        borderRadius: 10,
        backgroundColor: GlobalStyles.colors.primary800,
        margin: 10,
        padding: 10,
    },
    text:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    }

});