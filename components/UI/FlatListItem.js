import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function FlatListItem({ name, category, age, health }) {
    return (
        <Pressable
            style={({ pressed }) => pressed && styles.press}
        >
            <View style={styles.item}>
                <View>
                    <Text style={styles.textBase}>{name}</Text>
                    <Text style={styles.textBase}>{category}</Text>
                </View>
                <View>
                    <Text style={styles.textBase}>{age}</Text>
                    <Text style={styles.textBase}>{health}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default FlatListItem;

const styles = StyleSheet.create({
    item: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity : 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary100,
        fontSize: 14,
    },
    press: {opacity: 0.75}
 
});