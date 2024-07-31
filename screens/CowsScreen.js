import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GlobalStyles } from "../constants/styles";
import FixedButton from "../components/UI/FixedButton";
import { getData } from "../util/http";

function CowsScreen() {
    const navigation = useNavigation();
    let title = 'Yeni məlumat';
    
    function addCow() { 
        navigation.navigate('Redaktə', { title }) 
    }
    
    function changeScreen(screen, name, tableName) {
        // let hide = name === 'Satılmış' || name === 'Ölmüş'
        // AsyncStorage.setItem('hide', hide);
        navigation.navigate(screen, { name, tableName });
    }


    return (
        <View style={{ flex: 1, marginHorizontal: 15 }}>
            <View style={styles.container}>
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
    }
});