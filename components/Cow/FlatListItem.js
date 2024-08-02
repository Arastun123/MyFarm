import { Pressable, Text, View, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function FlatListItem({ id, bilka_number, gender, birthdate, categories, data }) {
    const navigation = useNavigation();
    let title = 'Redaktə';
    function showSelecetedCow(id) {
        const defaultValue = data.find((item) => item.id === id);
        let mode = 'edit'
        navigation.navigate('Redaktə', { id, defaultValue, title, mode })
    }

    return (
        <Pressable
            style={({ pressed }) => pressed && styles.press}
            onPress={() => showSelecetedCow(id)}
        >
            <View style={styles.item}>
                <View>
                    <Text style={styles.textBase}>Bilka nömrəsi : {bilka_number}</Text>
                    <Text style={styles.textBase}>Cinsi : {gender}</Text>
                </View>
                <View>
                    <Text style={styles.textBase}>Doğum tarixi : {birthdate ? new Date(birthdate).toISOString().slice(0, 10) : ''}</Text>
                    <Text style={styles.textBase}>Status:  {categories}</Text>
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
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary100,
        fontSize: 14,
    },
    press: { opacity: 0.75 }

});