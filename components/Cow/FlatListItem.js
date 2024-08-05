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
            style={({ pressed }) => [styles.main, pressed && styles.press]}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textBase: {
        color: GlobalStyles.colors.lightGreen,
        fontSize: 14,
    },
    main: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5,
        shadowRadius: 4,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.4,
        padding: 12,
        marginVertical: 8,
    },
    press: {
        opacity: 0.5
    }
});