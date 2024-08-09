import { useCallback, useState } from "react";
import { FontAwesome6, FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../constants/styles";
import FixedButton from "../components/UI/FixedButton";
import { getData } from "../util/http";
import Dropdown from "../components/UI/Dropdown";
import Button from "../components/UI/Button";

function FlatListItem({ id, bilka_number, selected_insemination_date, left_day, last_two_weeks, seven_month }) {
    const navigation = useNavigation();

    let title = 'Gözləmədə olan əməliyat';
    let mode = 'pending';

    function showSelecetedOperation(id) {
        navigation.navigate('Redaktə', { id, defaultValue, title, mode, pendingId, operation_type });
    }


    return (
        <Pressable>
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
    const [showDropdown, setShowDropdown] = useState(false);

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
            setShowDropdown(false)
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
            {showDropdown && (
                <View style={styles.dropdonwBox}>
                    <Dropdown
                        text='İnək'
                        tableName='sold'
                        status='satılıb'
                        onSelect={() => changeScreen('Heyvan', 'İnək', 'cow')}
                    />
                    <Dropdown
                        text='Gənc'
                        tableName='dead'
                        status='tələf olub'
                        onSelect={() => changeScreen('Heyvan', 'Gənc', 'younge')}

                    />
                    <Dropdown
                        text='Buzov'
                        tableName='sold'
                        status='satılıb'
                        onSelect={() => changeScreen('Heyvan', 'Buzov', 'calf')}

                    />
                    <Dropdown
                        text='Satılıb'
                        tableName='dead'
                        status='tələf olub'
                        onSelect={() => changeScreen('Heyvan', 'Satılmış', 'soldAnimal')}

                    />
                    <Dropdown
                        text='Tələf olub'
                        tableName='dead'
                        status='tələf olub'
                        onSelect={() => changeScreen('Heyvan', 'Ölmüş inəklər', 'deadAnimal')}
                    />
                </View>
            )}
            <Button
                text={'Qruplar'}
                color={showDropdown ? GlobalStyles.colors.lightGreen : GlobalStyles.colors.green}
                onPress={() => { setShowDropdown(!showDropdown) }}
            />
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>İnək sayı: {cows.length}</Text>
                    <Text style={styles.title}>Buzov sayı: {calves.length}</Text>
                    <Text style={styles.title}>Gənc sayı: {younges.length}</Text>
                    <Text style={styles.title}>Toplam: {younges.length + calves.length + cows.length}</Text>
                </View>
                <Text style={styles.title}>Boğaz olan inəklər: {pregnancies.length}</Text>
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
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 20
    },
    press: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.lightGreen,
    },
    title: {
        color: GlobalStyles.colors.lightGreen,
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
        backgroundColor: '#fff',
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
        color: GlobalStyles.colors.lightGreen,
        fontSize: 14,
    },
    dropdonwBox: {
        width: '44%',
        alignItems: 'center',
        position: 'absolute',
        top: 48,
        left: 7,
        backgroundColor: GlobalStyles.colors.green,
        zIndex: 11,
    }
});