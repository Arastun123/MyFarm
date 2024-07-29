import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../constants/styles";
import { getData } from "../util/http";
import { formatDate } from "../util/date";

function FlatListItem({ id, name, status, date, operationData }) {
    const navigation = useNavigation();

    let title = 'Gözləmədə olan əməliyat';
    let mode = 'pending';
    let defaultValue = JSON.parse(operationData[0].data);
    let pendingId = operationData[0].id;
    let operationType = operationData[0].operation_type;

    function showSelecetedOperation(id) {
        navigation.navigate('Redaktə', { id, defaultValue, title, mode, pendingId, operationType });
    }

    return (
        <Pressable
            style={({ pressed }) => pressed && styles.press}
            onPress={() => showSelecetedOperation(id)}
        >
            <View style={styles.item}>
                <View>
                    <Text style={styles.textBase}>{name}</Text>
                    <Text style={styles.textBase}>{status}</Text>
                    <Text style={styles.textBase}>{formatDate(date)}</Text>
                </View>
            </View>
        </Pressable>
    );
}

function PendingOperation({ navigation }) {
    const [resData, setResData] = useState([]);

    useFocusEffect(
        useCallback(() => {
            getOperations();
        }, [])
    );
    async function getOperations() {
        let endpoint = 'pendingOperation/getOperation';
        try {
            const data = await getData(endpoint);
            setResData(data);
        } catch (error) {
            console.error('Error', error);
        }
    }


    return (
        <View style={styles.container}>
            {resData.length === 0 ? (
                <>
                    <Text style={styles.title}>Gözləmədə olan əməliyyat yoxdur...</Text>
                </>
            ) : (
                <View style={styles.flatContainer}>
                    <FlatList
                        data={resData}
                        renderItem={({ item }) => {
                            let data = JSON.parse(item.data);
                            return (
                                <FlatListItem
                                    id={data.id}
                                    name={item.operationName}
                                    status={item.status}
                                    date={item.created_at}
                                    operationData={resData}
                                />
                            );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    );
}

export default PendingOperation;

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
    item: {
        height: 150,
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
    press: { opacity: 0.75 },
    title: {
        color: GlobalStyles.colors.primary800,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    }
});