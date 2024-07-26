import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../constants/styles";
import FlatListItem from '../components/Cow/FlatListItem'
import FixedButton from "../components/UI/FixedButton";
import { getData } from "../util/http";


function CategoryCowScreen({ route }) {
    const [filteredCows, setFilteredCows] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [resData, setResData] = useState([]);
    const navigation = useNavigation();
    let screenTitle = 'Yeni məlumat';
    let categoriesCount = {};

    const { name, tableName } = route.params;

    useEffect(() => {
        getCategoryAnimal();
    }, []);

    async function getCategoryAnimal() {
        let url = `${tableName}/${tableName}s`
        try {
            const data = await getData(url)
            setResData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // data.forEach(cow => {
    //     const category = cow.type;
    //     if (categoriesCount[category]) {
    //         categoriesCount[category]++;
    //     } else {
    //         categoriesCount[category] = 1;
    //     }
    // });

    // let formattedCategories = Object.keys(categoriesCount).map(category => {
    //     return { name: category, label: `${category} (${categoriesCount[category]})` };
    // });

    // formattedCategories.push({ name: 'sıfırla', label: 'sıfırla' });

    // function showSelectedCategory(category) {
    //     if (category === 'sıfırla') {
    //         setFilteredCows([]);
    //         setSelectedCategory(null);
    //     } else {
    //         const selectedCows = data.filter(cow => cow.type === category);
    //         setFilteredCows(selectedCows);
    //         setSelectedCategory(category);
    //     }
    // }

    // let defaultValue = data

    function addCow() {
        navigation.navigate('Redaktə', { screenTitle, tableName, name })
    }

    return (
        <View style={styles.container}>
            <View style={styles.categoriesContainer}>
                {/* {formattedCategories.map((category, index) => (
                    <Pressable
                        style={({ pressed }) => [styles.categoryText, pressed ? styles.buttonPressed : null]}
                        key={index}
                        onPress={() => showSelectedCategory(category.name)}
                    >
                        <Text style={styles.text}>{category.label}</Text>
                    </Pressable>
                ))} */}
            </View>

            {resData.length === 0 ?
                <>
                    <Text style={styles.title}>Gözləmədə olan əməliyyat yoxdur...</Text>
                </> :
                <>
                    <Text style={styles.text}>Toplam {name} sayı: {resData.length.toString()}</Text>

                    <View style={styles.flatContainer}>
                        <FlatList
                            data={resData}
                            renderItem={({ item }) => (
                                <FlatListItem
                                    id={item.id}
                                    name={item.name}
                                    gender={item.gender}
                                    birthdate={item.birthdate}
                                    health={item.health_status}
                                    data={resData}
                                />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </>
            }

            <FixedButton
                onPress={addCow}
                name='add'
            />
        </View>
    )
}

export default CategoryCowScreen;



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
    },
    title: { 
        color: GlobalStyles.colors.primary800,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});