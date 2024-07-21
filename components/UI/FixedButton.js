import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

import { GlobalStyles } from "../../constants/styles";

function FixedButton({ onPress, name }) {
    return (
        <Pressable
            style={styles.addButton}
            onPress={onPress}
        >
            <Text>
                <MaterialIcons name={name} size={24} color={GlobalStyles.colors.primary700} />
            </Text>
        </Pressable>
    )
}

export default FixedButton;

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: GlobalStyles.colors.primary100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    }
});