import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const cows = [
    {
        id: '1', name: 'Bessie', categories: ['inək', 'xəstə'], age: 4, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '2', name: 'Molly', categories: ['düyə'], age: 2, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '3', name: 'Daisy', categories: ['boğaz'], age: 5, health: 'Pregnant', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '4', name: 'Duke', categories: ['erkək'], age: 3, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '5', name: 'Bella', categories: ['dişi', 'sağmal'], age: 6, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '6', name: 'Lucy', categories: ['sağmal'], age: 7, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '7', name: 'Lola', categories: ['xəstə'], age: 8, health: 'Sick', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '8', name: 'Sam', categories: ['subay', 'buzov'], age: 4, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '9', name: 'Cek', categories: ['inək'], age: 4, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '10', name: 'Me', categories: ['düyə'], age: 2, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '11', name: 'Daisy', categories: ['boğaz'], age: 5, health: 'Pregnant', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '12', name: 'Duke', categories: ['erkək'], age: 3, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '13', name: 'Bella', categories: ['dişi'], age: 6, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '14', name: 'Lucy', categories: ['sağmal'], age: 7, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '15', name: 'Lola', categories: ['xəstə'], age: 8, health: 'Sick', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
    {
        id: '16', name: 'Sam', categories: ['subay'], age: 4, health: 'Healthy', number: '',
        weight: '', date: '2024-07-14', enteredDate: '2024-07-14', milk: '', vaccine: '',
        illnes: '', info: '', motherBilka: '', fatherBilka: '', mayalanmatarixi: '',
        buyDate: '', getFrom: ''
    },
];

function FlatListItem({ id, name, category, age, health }) {
    const navigation = useNavigation();
    let title = 'Edit';
    function showSelecetedCow(id) {
        const defaultValue = cows.find((item) => item.id === id);
        navigation.navigate('Redaktə', { id, defaultValue, title })
    }
    return (
        <Pressable
            style={({ pressed }) => pressed && styles.press}
            onPress={() => showSelecetedCow(id)}
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
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: GlobalStyles.colors.primary100,
        fontSize: 14,
    },
    press: { opacity: 0.75 }

});