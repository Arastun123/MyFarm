import { Pressable, StyleSheet, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';

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
        width: 160,
        borderRadius: 5,
        backgroundColor: GlobalStyles.colors.primary800,
        margin: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    text:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    }

});