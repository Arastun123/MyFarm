import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { GlobalStyles } from "../constants/styles";
import FlatListItem from "../components/UI/FlatListItem";
import { useNavigation } from "@react-navigation/native";

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
let categories = ['buzov', 'inək', 'düyə', 'boğaz', 'erkək', 'dişi', 'sağmal', 'xəstə', 'subay', 'sıfırla']

function CowsScreen() {
    const [filteredCows, setFilteredCows] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigation = useNavigation();
    let title = 'Yeni məlumat';

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
                {categories.map((category) => (
                    <Pressable
                        key={category}
                        style={({ pressed }) => [styles.categoryText, pressed ? styles.buttonPressed : null]}
                        onPress={() => showSelectedCatogory(category)}
                    >
                        <Text style={styles.text}>{category}</Text>
                    </Pressable>
                ))}
            </View>

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

            <Pressable
                style={styles.addButton}
                onPress={addCow}
            >
                <Text>
                    <Ionicons name="add-circle-outline" size={24} color={GlobalStyles.colors.primary700} />
                </Text>
            </Pressable>
        </View>
    )
}

export default CowsScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginHorizontal: 15,
    },
    flatContainer:{
        flex:1,
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
    },
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