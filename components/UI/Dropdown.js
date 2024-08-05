import { Pressable, StyleSheet, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

function Dropdown({ text, id, tableName, status, onSelect }) {
    return (
        <Pressable style={styles.container}>
            <Button
                text={text}
                style={styles.item}
                color={GlobalStyles.colors.lightGreen}
                onPress={() => onSelect(id, tableName, status)}
            />
        </Pressable>
    )
}

export default Dropdown;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.lightGreen,
        width: 160,
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: GlobalStyles.colors.lightGreen,
    }
});