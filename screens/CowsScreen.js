import { useCallback, useState } from "react";
import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../constants/styles";
import FixedButton from "../components/UI/FixedButton";
import { getData } from "../util/http";
import { formatDate } from "../util/date";

function FlatListItem({ id, bilka_number, selected_insemination_date, left_day, last_two_weeks, seven_month }) {
    const navigation = useNavigation();

    let title = 'Gözləmədə olan əməliyat';
    let mode = 'pending';

    function showSelecetedOperation(id) {
        navigation.navigate('Redaktə', { id, defaultValue, title, mode, pendingId, operation_type });
    }


    return (
        <Pressable
            style={({ pressed }) => pressed && styles.press}
            onPress={() => showSelecetedOperation(id)}
        >
            <View style={styles.item}>
                <View>
                    <Text style={styles.textBase}>Bilka nömrəsi: {bilka_number}</Text>
                    <Text style={styles.textBase}>Mayalanma tarixi: {selected_insemination_date.slice(0, 10)}</Text>
                    <Text style={styles.textBase}>Gözlənilən doğum tarixi {left_day}  </Text>
                    <Text style={styles.textBase}>7 ay sonra {seven_month} </Text>
                    <Text style={styles.textBase}>Son 2 həftə {last_two_weeks} </Text>
                </View>
            </View>
        </Pressable>
    );
}


function CowsScreen() {
    const navigation = useNavigation();
    const [cows, setCows] = useState([]);
    const [calves, setCalves] = useState([]);
    const [younges, setYounges] = useState([]);
    const [pregnancies, setPregnancies] = useState([]);

    let title = 'Yeni məlumat';
    let mode = 'add'
    function addCow() {
        navigation.navigate('Redaktə', { title, mode })
    }

    function changeScreen(screen, name, tableName) {
        navigation.navigate(screen, { name, tableName });
    }


    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const [cowData, calfData, youngeData, pregnanciesData] = await Promise.all([
                        getCategoryAnimal('cow/cows'),
                        getCategoryAnimal('calf/calfs'),
                        getCategoryAnimal('younge/younges'),
                        getCategoryAnimal('pregnancies/getPregnancies'),
                    ]);

                    setCows(cowData);
                    setCalves(calfData);
                    setYounges(youngeData);
                    setPregnancies(pregnanciesData);

                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchData();
        }, [])
    );

    async function getCategoryAnimal(name) {
        let url = `${name}`;
        try {
            const data = await getData(url);
            return data;
        } catch (error) {
            console.error('Error fetching data for', name, ':', error);
            return [];
        }
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 15 }}>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.title}>İnək sayı: {cows.length}</Text>
                        <Text style={styles.title}>Buzov sayı: {calves.length}</Text>
                        <Text style={styles.title}>Gənc sayı: {younges.length}</Text>
                        <Text style={styles.title}>Toplam: {younges.length + calves.length + cows.length}</Text>
                    </View>
                    <Text style={styles.title}>Boğaz inəklər</Text>
                    <View style={styles.flatContainer}>
                        <FlatList
                            data={pregnancies}
                            renderItem={({ item }) => {
                                return (
                                    <FlatListItem
                                        id={item.id}
                                        bilka_number={item.bilka_number}
                                        selected_insemination_date={item.selected_insemination_date}
                                        left_day={item.left_day}
                                        seven_month={item.seven_month}
                                        last_two_weeks={item.last_two_weeks}
                                    />
                                );
                            }}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.row}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.cardContainer,
                                pressed && styles.press
                            ]}
                            onPress={() => changeScreen('Heyvan', 'İnək', 'cow')}
                        >
                            <FontAwesome6 name='cow' size={30} color={GlobalStyles.colors.primary700} />
                            <Text style={styles.cardTitle}>İnəklər</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.cardContainer,
                                pressed && styles.press
                            ]}
                            onPress={() => changeScreen('Heyvan', 'Buzov', 'calf')}
                        >
                            <FontAwesome6 name='cow' size={30} color={GlobalStyles.colors.primary700} />
                            <Text style={styles.cardTitle}>Buzovlar</Text>
                        </Pressable>
                    </View>
                    <View style={styles.row}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.cardContainer,
                                pressed && styles.press
                            ]}
                            onPress={() => changeScreen('Heyvan', 'Gənc', 'younge')}
                        >
                            <FontAwesome6 name='cow' size={30} color={GlobalStyles.colors.primary700} />
                            <Text style={styles.cardTitle}>Gənclər</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.cardContainer,
                                pressed && styles.press
                            ]}
                            onPress={() => changeScreen('Heyvan', 'Satılmış', 'soldAnimal')}
                        >
                            <FontAwesome6 name='cow' size={30} color={GlobalStyles.colors.primary700} />
                            <Text style={styles.cardTitle}>Satılmış heyvanlar</Text>
                        </Pressable>
                    </View>
                    <View style={{ ...styles.row, justifyContent: 'center' }}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.cardContainer,
                                pressed && styles.press
                            ]}
                            onPress={() => changeScreen('Heyvan', 'Ölmüş', 'deadAnimal')}
                        >
                            <FontAwesome6 name='cow' size={30} color={GlobalStyles.colors.primary700} />
                            <Text style={styles.cardTitle}>Ölmüş heyvanlar</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
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
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    cardContainer: {
        width: '45%',
        height: 120,
        margin: 10,
        padding: 5,
        borderRadius: 2,
        textAlign: 'center',
        elevation: 3,
        shadowColor: GlobalStyles.colors.primary800,
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        color: GlobalStyles.colors.primary700,
    },
    press: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary200,
    },
    title: {
        color: GlobalStyles.colors.primary800,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    flatContainer: {
        // flex: 1,
        marginBottom: 10,
    },
    item: {
        height: 120,
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
});