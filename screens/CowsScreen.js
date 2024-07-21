import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Platform } from "react-native";

import { GlobalStyles } from "../constants/styles";
import FlatListItem from "../components/UI/FlatListItem";
import { useNavigation } from "@react-navigation/native";
import FixedButton from "../components/UI/FixedButton";

const cows = [
    { id: '1', name: 'Bessie', categories: ['inək', 'xəstə'], age: 4, health: 'Healthy' },
    { id: '2', name: 'Molly', categories: ['düyə'], age: 2, health: 'Healthy' },
    { id: '3', name: 'Daisy', categories: ['boğaz'], age: 5, health: 'Pregnant' },
    { id: '4', name: 'Duke', categories: ['erkək'], age: 3, health: 'Healthy' },
    { id: '5', name: 'Bella', categories: ['dişi', 'sağmal'], age: 6, health: 'Healthy' },
    { id: '6', name: 'Lucy', categories: ['sağmal'], age: 7, health: 'Healthy' },
    { id: '7', name: 'Lola', categories: ['xəstə'], age: 8, health: 'Sick' },
    { id: '8', name: 'Sam', categories: ['subay', 'buzov'], age: 4, health: 'Healthy' },
    { id: '9', name: 'Cek', categories: ['inək'], age: 4, health: 'Healthy' },
    { id: '10', name: 'Me', categories: ['düyə'], age: 2, health: 'Healthy' },
    { id: '11', name: 'Daisy', categories: ['boğaz'], age: 5, health: 'Pregnant' },
    { id: '12', name: 'Duke', categories: ['erkək'], age: 3, health: 'Healthy' },
    { id: '13', name: 'Bella', categories: ['dişi'], age: 6, health: 'Healthy' },
    { id: '14', name: 'Lucy', categories: ['sağmal'], age: 7, health: 'Healthy' },
    { id: '15', name: 'Lola', categories: ['xəstə'], age: 8, health: 'Sick' },
    { id: '16', name: 'Sam', categories: ['subay'], age: 4, health: 'Healthy' },
];

function CowsScreen() {
    const [filteredCows, setFilteredCows] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigation = useNavigation();
    let title = 'Yeni məlumat'; 
    let categoriesCount = {};

    cows.forEach(cow => {
        cow.categories.forEach(category => {
            if (categoriesCount[category]) {
                categoriesCount[category]++;
            } else {
                categoriesCount[category] = 1;
            }
        });
    });

    let formattedCategories = Object.keys(categoriesCount).map(category => {
        return { name: category, label: `${category} (${categoriesCount[category]})` };
    });

    formattedCategories.push({ name: 'sıfırla', label: 'sıfırla' });


    function showSelectedCatogory(category) {
        if (category === 'sıfırla') {
            setFilteredCows([]);
            setSelectedCategory(null);
        }
        else {
            const selectedCow = cows.filter(cow => cow.categories.includes(category));
            setFilteredCows(selectedCow);
            setSelectedCategory(category);
        }
    }

    function addCow() {
        navigation.navigate('Redaktə', { title })
    }

    return (
        <View style={styles.container}>
            <View style={styles.categoriesContainer}>
                {formattedCategories.map((category, index) => (
                    <Pressable
                        style={({ pressed }) => [styles.categoryText, pressed ? styles.buttonPressed : null]}
                        key={index}
                        onPress={() => showSelectedCatogory(category.name)}
                    >
                        <Text style={styles.text}>{category.label}</Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.text}>Toplam heyvan sayı: {formattedCategories.length.toString()}</Text>

            <View style={styles.flatContainer}>
                <FlatList
                    data={selectedCategory !== null ? filteredCows : cows}
                    renderItem={({ item }) => (
                        <FlatListItem
                            id={item.id}
                            name={item.name}
                            category={item.categories.join(',')}
                            age={item.age}
                            health={item.health}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <FixedButton
                onPress={addCow}
                name='add'
            />
        </View>
    )
}

export default CowsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
    flatContainer: {
        flex: 1,
        marginBottom: 10,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        margin: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: GlobalStyles.colors.primary200,
    },
    text: {
        padding: 6,
        color: GlobalStyles.colors.primary700,
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    buttonPressed: {
        opacity: .5,
        backgroundColor: GlobalStyles.colors.primary700,
        overflow: 'hidden',
    }
});