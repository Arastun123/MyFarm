import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { StyleSheet, View, FlatList, Modal, Pressable } from "react-native";

import TableHead from "../components/UI/TableHead";
import TableCell from "../components/UI/TableCell";
import FixedButton from "../components/UI/FixedButton";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";

function ItemScreen({ }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputs, setInputs] = useState({
        name: '',
        price: '',
        date: '',
        info: '',
    });
    const route = useRoute();
    const { title, tablename } = route.params;
    const headersMap = {
        vehicles: ["N", "Ad", "Vəziyəti"],
        feed: ["N", "Növ", "Miqdar"],
        medicine: ["N", "Ad", "Miqdar"],
        tools: ["N", "Ad", "Model",],
    };

    const vehicles = [
        { id: '1', name: 'John Deere 5055E', model: '5055E', purchaseDate: '2022-05-12', condition: 'Good' },
        { id: '2', name: 'Kubota L3301', model: 'L3301', purchaseDate: '2021-03-10', condition: 'Excellent' },
        { id: '3', name: 'Massey Ferguson 4710', model: '4710', purchaseDate: '2020-07-22', condition: 'Good' },
        { id: '4', name: 'New Holland Workmaster 75', model: '75', purchaseDate: '2019-09-15', condition: 'Fair' },
    ];

    const feed = [
        { id: '1', type: 'Hay', quantity: '500 kg', purchaseDate: '2024-07-01' },
        { id: '2', type: 'Silage', quantity: '300 kg', purchaseDate: '2024-06-15' },
        { id: '3', type: 'Grain', quantity: '200 kg', purchaseDate: '2024-06-20' },
        { id: '4', type: 'Alfalfa', quantity: '100 kg', purchaseDate: '2024-07-10' },
    ];

    const medicine = [
        { id: '1', name: 'Ivermectin', type: 'Antiparasitic', quantity: '50 doses', expiryDate: '2025-05-12' },
        { id: '2', name: 'Oxytetracycline', type: 'Antibiotic', quantity: '30 doses', expiryDate: '2024-12-01' },
        { id: '3', name: 'Penicillin', type: 'Antibiotic', quantity: '20 doses', expiryDate: '2024-11-15' },
        { id: '4', name: 'Vitamin B12', type: 'Vitamin Supplement', quantity: '100 doses', expiryDate: '2026-01-10' },
    ];

    const tools = [
        { id: '1', name: 'Milking Machine', model: 'DeLaval AMR', purchaseDate: '2023-02-10', condition: 'Excellent' },
        { id: '2', name: 'Hay Baler', model: 'New Holland Roll-Belt 450', purchaseDate: '2022-08-05', condition: 'Good' },
        { id: '3', name: 'Feed Mixer', model: 'KUHN Knight 3130', purchaseDate: '2021-10-12', condition: 'Fair' },
        { id: '4', name: 'Cow Brush', model: 'Schurr Cow Brush', purchaseDate: '2020-11-25', condition: 'Excellent' },
    ];

    let data = [];
    let headers = headersMap[tablename];
    switch (tablename) {
        case 'vehicles':
            data = vehicles;
            break;
        case 'feed':
            data = feed;
            break;
        case 'medicine':
            data = medicine;
            break;
        case 'tools':
            data = tools;
            break;
        default:
            data = [];
    }

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curValue) => {
            return {
                ...curValue,
                [inputIdentifier]: enteredValue
            }
        })
    }

    function addItem() {
        console.log(tablename);
    }

    function modalVisibilty(status) {
        setModalVisible(status);
    }

    return (
        <>
            <View style={styles.container}>
                <TableHead headers={headers} />
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TableCell data={[
                            { value: item.id },
                            { value: item.name || item.type },
                            { value: item.quantity || item.model || item.condition || item.expiryDate }
                        ]} />
                    )}
                />
                <FixedButton
                    onPress={() => modalVisibilty(true)}
                    name='add'
                />
            </View>
            <Modal visible={modalVisible} animationType='slide'>
                <Pressable style={{ padding: 5 }}>
                    <Ionicons
                        name="close"
                        size={30}
                        color="red"
                        onPress={() => modalVisibilty(false)}
                        style={{ textAlign: 'right' }}
                    />
                </Pressable>

                <View style={styles.modalContent}>
                    <Input
                        label='Ad'
                        textinputConfig={{
                            onChangeText: inputChangeHandler.bind(this, 'name'),
                            value: inputs.name,
                        }}
                    />
                    <Input
                        label="Qiymət"
                        textinputConfig={{
                            keyboardType: 'numeric',
                            onChangeText: inputChangeHandler.bind(this, 'price'),
                            value: inputs.price,
                        }}
                    />
                    <Input
                        label="Gəliş tarixi"
                        textinputConfig={{
                            placeholder: 'İl-ay-gün',
                            maxLength: 10,
                            keyboardType: 'numeric',
                            onChangeText: text => inputChangeHandler('date', text),
                            value: inputs.date,
                        }}
                    />
                    <Input
                        label='Əlavə məlumatlar'
                        textinputConfig={{
                            multiline: true,
                            onChangeText: text => inputChangeHandler('info', text),
                            value: inputs.info,
                        }}
                    />
                </View>
                <View style={styles.justifyContentRight}>
                    <Button
                        text='Təsdiq et'
                        onPress={addItem}
                        color={GlobalStyles.colors.green}
                    />
                </View>
            </Modal>
        </>
    )
}

export default ItemScreen;

const styles = StyleSheet.create({
    container: { flex: 1, },
    modalContent: { paddingHorizontal: 20, },
    justifyContentRight: { alignItems: 'flex-end' },
});