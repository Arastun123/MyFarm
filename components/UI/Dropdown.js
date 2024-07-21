import { Pressable, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

function Dropdown({ text, id, tableName, status, onSelect }) {
    return (
        <Pressable style={styles.container}>
            <Button
                text={text}
                style={styles.item}
                color={GlobalStyles.colors.primary800}
                onPress={() => onSelect(id, tableName, status)}
            />
        </Pressable>
    )
}

export default Dropdown;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary800,
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: GlobalStyles.colors.primary800,
        color: '#333',
    }
});