import { StyleSheet, View, Text, Pressable } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../constants/styles";


function HomeScreen() {
    const navigation = useNavigation();
    function changeScreen(screen) {
        navigation.navigate(screen);
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Pressable
                    style={({ pressed }) => [
                        styles.cardContainer,
                        pressed && styles.press
                    ]}
                    onPress={() => changeScreen('İnəklər')}
                >
                    <FontAwesome6 name='cow' size={30} color={GlobalStyles.colors.primary700} />
                    <Text style={styles.cardTitle}>İnəklər</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.cardContainer,
                        pressed && styles.press
                    ]}
                    onPress={() => changeScreen('Süd')}
                >
                    <MaterialCommunityIcons name='water' size={30} color={GlobalStyles.colors.primary700} />
                    <Text style={styles.cardTitle}>Süd</Text>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable
                    style={({ pressed }) => [
                        styles.cardContainer,
                        pressed && styles.press
                    ]}
                    onPress={() => changeScreen('Maliyə')}
                >
                    <MaterialCommunityIcons name='finance' size={30} color={GlobalStyles.colors.primary700} />
                    <Text style={styles.cardTitle}>Maliyə</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.cardContainer,
                        pressed && styles.press
                    ]}
                    onPress={() => changeScreen('Anbar')}
                >
                    <FontAwesome6 name='warehouse' size={30} color={GlobalStyles.colors.primary700} />
                    <Text style={styles.cardTitle}>Anbar</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default HomeScreen;

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