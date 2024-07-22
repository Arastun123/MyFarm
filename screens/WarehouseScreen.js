import { useNavigation } from "@react-navigation/native";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { FontAwesome6, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { GlobalStyles } from "../constants/styles";

function WarehouseScreen() {
    const navigation = useNavigation();
    function changeScreen(screen, name, tablename) {
        navigation.navigate(screen, { name, tablename });
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Pressable
                    style={({ pressed }) => [
                        styles.cardContainer,
                        pressed && styles.press
                    ]}
                    onPress={() => changeScreen('Item', 'Neqliyat vasitəsi', 'vehicles')}
                >
                    <FontAwesome6 name='tractor' size={30} color={GlobalStyles.colors.primary700} />
                    <Text style={styles.cardTitle}>Tractor</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.cardContainer,
                        pressed && styles.press
                    ]}
                    onPress={() => changeScreen('Item', 'Yem', 'feed')}
                >
                    <MaterialCommunityIcons name='grass' size={30} color={GlobalStyles.colors.primary700} />
                    <Text style={styles.cardTitle}>Yem</Text>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable
                    style={({ pressed }) => [
                        styles.cardContainer,
                        pressed && styles.press
                    ]}
                    onPress={() => changeScreen('Item', 'Dərman', 'medicine')}
                >
                    <AntDesign name="medicinebox" size={30} color={GlobalStyles.colors.primary700} />
                    <Text style={styles.cardTitle}>Dərman</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.cardContainer,
                        pressed && styles.press
                    ]}
                    onPress={() => changeScreen('Item', 'Texniki alətlər', 'tools')}
                >
                    <AntDesign name="tool" size={30} color={GlobalStyles.colors.primary700} />
                    <Text style={styles.cardTitle}>Texniki alətlər</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default WarehouseScreen;

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