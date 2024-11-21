import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";

import { GlobalStyles } from "../constants/styles";
import FlatListItem from "../components/Cow/FlatListItem";
import FixedButton from "../components/UI/FixedButton";
import { getData } from "../util/http";

// Static data for testing
const formattedCategories = [
  { name: "milk", label: "Milk Cows" },
  { name: "calf", label: "Calves" },
  { name: "bull", label: "Bulls" },
  { name: "sıfırla", label: "Reset" },
];

const resData = [
  {
    id: 1,
    bilka_number: "B001",
    gender: "Female",
    birthdate: "2023-01-15",
    categories: ["milk"],
  },
  {
    id: 2,
    bilka_number: "B002",
    gender: "Male",
    birthdate: "2023-05-20",
    categories: ["calf"],
  },
  {
    id: 3,
    bilka_number: "B003",
    gender: "Female",
    birthdate: "2022-11-10",
    categories: ["milk"],
  },
  {
    id: 4,
    bilka_number: "B004",
    gender: "Male",
    birthdate: "2021-06-01",
    categories: ["bull"],
  },
];

function CategoryCowScreen({ route }) {
  const [filteredCows, setFilteredCows] = useState(resData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  const { name, tableName } = route.params;

  useFocusEffect(
    useCallback(() => {
      getCategoryAnimal();
    }, [])
  );

  async function getCategoryAnimal() {
    let url = `${tableName}/${tableName}s`;
    try {
      const data = await getData(url);
      // Uncomment this line when using real API data
      // setFilteredCows(data.reverse());
    } catch (error) {
      Alert.alert("Error fetching data:", error.message);
    }
  }

  const showSelectedCategory = (category) => {
    if (category === "sıfırla" || category === selectedCategory) {
      setFilteredCows(resData);
      setSelectedCategory(null);
    } else {
      const selectedCows = resData.filter(
        (cow) => cow.categories && cow.categories.includes(category)
      );
      setFilteredCows(selectedCows);
      setSelectedCategory(category);
    }
  };

  function addCow() {
    if (tableName === "Satılmış") {
      navigation.navigate("Satılmış", { screenTitle: "Yeni məlumat", name });
    } else if (tableName === "Ölmüş") {
      navigation.navigate("Ölmüş", { screenTitle: "Yeni məlumat", name });
    } else {
      let mode = "add";
      navigation.navigate("Redaktə", {
        screenTitle: "Yeni məlumat",
        name,
        mode,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        {formattedCategories.map((category, index) => (
          <Pressable
            style={({ pressed }) => [
              styles.categoryText,
              pressed ? styles.buttonPressed : null,
              selectedCategory === category.name ? styles.activeCategory : null,
            ]}
            key={index}
            onPress={() => showSelectedCategory(category.name)}
          >
            <Text
              style={[
                styles.text,
                selectedCategory === category.name
                  ? styles.activeCategoryText
                  : null,
              ]}
            >
              {category.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {resData.length === 0 ? (
        <Text style={styles.title}>Daxil edilmiş məlumat yoxdur...</Text>
      ) : (
        <>
          <Text style={styles.text}>
            Toplam {name} sayı: {resData.length.toString()}
          </Text>
          <View style={styles.flatContainer}>
            <FlatList
              data={selectedCategory ? filteredCows : resData}
              renderItem={({ item }) => (
                <FlatListItem
                  id={item.id}
                  bilka_number={item.bilka_number}
                  gender={item.gender}
                  birthdate={item.birthdate}
                  categories={item.categories}
                  data={resData}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </>
      )}

      <FixedButton onPress={addCow} name="add" />
    </View>
  );
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    margin: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.green,
  },
  text: {
    padding: 6,
    color: GlobalStyles.colors.gold,
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
  },
  buttonPressed: {
    opacity: 0.5,
    backgroundColor: GlobalStyles.colors.green,
    overflow: "hidden",
  },
  title: {
    color: GlobalStyles.colors.green,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  activeCategory: {
    backgroundColor: GlobalStyles.colors.green,
  },
  activeCategoryText: {
    color: GlobalStyles.colors.lightGold,
  },
});
