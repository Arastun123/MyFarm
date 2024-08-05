import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, FlatList, StyleSheet, Modal, Pressable, Alert, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from '../components/UI/Input';
import TableHead from '../components/UI/TableHead';
import FixedButton from '../components/UI/FixedButton';
import Button from '../components/UI/Button';
import { getFormatedDate } from '../util/date';
import RadioButton from '../components/UI/RadioButton';
import { GlobalStyles } from '../constants/styles';
import { addData, deleteData, getData, updateData } from '../util/http';
import { useFocusEffect } from '@react-navigation/native';


const MilkReportItem = ({ id, date, amount, count }) => (
    <View style={styles.row}>
        <View style={styles.cell}>
            <Text style={styles.cellText}>{count}</Text>
        </View>
        <View style={styles.cell}>
            <Text style={styles.cellText}>{date}</Text>
        </View>
        <View style={styles.cell}>
            <Text style={styles.cellText}>{amount}</Text>
        </View>
    </View>
);

function MilkScreen() {
    const today = getFormatedDate(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [inputs, setInputs] = useState({
        date: today,
        morning: '',
        night: '',
        total: '',
        used_milk: '',
        other_info: ''
    });
    const [selectTime, setSelectTime] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [resData, setResData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredTotal, setFilteredTotal] = useState(0);
    const [userData, setUserData] = useState({ role: '', token: '', username: '' });
    const [filterDate, setFilterDate] = useState({
        startDate: '',
        endDate: ''
    });

    const headers = ["N", "Tarix", "Miqdar"];
    let count = 0;

    useFocusEffect(
        useCallback(() => {
            getMilkReports();
            calculateTotalMilk();

        }, [])
    );

    useEffect(() => {
        setInputs(prevInputs => ({
            ...prevInputs,
            date: today
        }));
        const loadUserData = async () => {
            const role = await AsyncStorage.getItem('role');
            const token = await AsyncStorage.getItem('token');
            const username = await AsyncStorage.getItem('username');
            const hide = await AsyncStorage.getItem('hide');
            setUserData({ role, token, username, hide });
        };
        loadUserData();
        filterData();
        calculateTotalMilk();
    }, [filterDate, resData]);

    async function getMilkReports() {
        const url = 'milk/milk';
        try {
            const data = await getData(url);
            setResData(data.reverse());
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function calcMilkQuantity(updatedInputs) {
        const morning = parseInt(updatedInputs.morning, 10) || 0;
        const night = parseInt(updatedInputs.night, 10) || 0;
        const used_milk = parseInt(updatedInputs.used_milk, 10) || 0;
        const total = morning + night - used_milk;

        setInputs(prevInputs => ({
            ...prevInputs,
            total: total.toString()
        }));
    }

    function inputChangeHandler(inputName, text) {
        if (inputName === 'startDate' || inputName === 'endDate') {
            setFilterDate(prevFilterDate => ({
                ...prevFilterDate,
                [inputName]: text
            }));
        } else {
            const updatedInputs = {
                ...inputs,
                [inputName]: text
            };
            setInputs(updatedInputs);
            calcMilkQuantity(updatedInputs);
        }
    }

    async function addMilkReport() {
        let endpoint = `milk/add-milk`;

        const data = {
            date: inputs.date,
            morning: inputs.morning,
            night: inputs.night,
            total: inputs.total,
            used_milk: inputs.used_milk,
            other_info: inputs.other_info,
            username: userData.username,
            role: userData.role,
        };
        let response = '';
        try {
            if (selectedRow === null) {
                response = await addData(endpoint, data);
            }
            else {
                endpoint = `milk/update-milk`
                response = await updateData(endpoint, selectedRow, data);
            }
            if (response.status === 201) {
                Alert.alert('', response.message);
                resetState();
            }
        } catch (error) {
            console.error('Error adding milk report:', error);
        }
    }

    async function deleteMilkReport() {
        let url = 'milk/delete-milk';
        const data = {
            date: inputs.date,
            morning: inputs.morning,
            night: inputs.night,
            total: inputs.total,
            used_milk: inputs.used_milk,
            other_info: inputs.other_info,
            username: userData.username,
            role: userData.role,
        }

        try {
            let response = await deleteData(url, selectedRow, data);
            if (response.status === 200) {
                Alert.alert('', response.message);
                getMilkReports();
                modalVisibilty(false);
            }
            else if (response.status === 201) {
                Alert.alert('', response.message);
                getMilkReports();
                modalVisibilty(false);
            }
            else {
                Alert.alert('Xəta', response.message);
            }
        } catch (error) {

        }
    }

    function modalVisibilty(status) {
        setModalVisible(status);
        if (!status) {
            setInputs({
                date: today,
                morning: 0,
                night: 0,
                total: '',
                used_milk: 0,
                other_info: ''
            });
        }
    }

    function handleSelectedRow(id) {
        if (selectedRow === id) {
            setSelectedRow(null);
            return;
        } else {
            setSelectedRow(id);
            const data = resData.find(item => item.id === id);
            setInputs({
                id: data.id,
                date: data.date,
                morning: data.morning,
                night: data.night,
                total: data.total,
                used_milk: data.used_milk,
                other_info: data.other_info
            });
            setSelectTime(data.time);
        }
    }

    const filterData = () => {
        const { startDate, endDate } = filterDate;
        const filtered = resData.filter(item => {
            const itemDate = new Date(item.date);
            const start = startDate ? new Date(startDate) : new Date('1900-01-01');
            const end = endDate ? new Date(endDate) : new Date();
            return itemDate >= start && itemDate <= end;
        });
        setFilteredData(filtered);
    };

    const calculateTotalMilk = () => {
        const total = filteredData.reduce((acc, item) => acc + parseInt(item.total, 10), 0);
        setFilteredTotal(total);
    };

    function resetState() {
        setInputs({
            id: 0,
            date: today,
            morning: 0,
            night: 0,
            total: '',
            used_milk: 0,
            other_info: ''
        });
        setSelectedRow(null);
        getMilkReports();
        modalVisibilty(false);
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.radioButtonContainer}>
                    <Input
                        label="Başlanğıc Tarix"
                        textinputConfig={{
                            placeholder: 'İl-ay-gün',
                            maxLength: 10,
                            onChangeText: text => inputChangeHandler('startDate', text),
                            value: filterDate.startDate,
                        }}
                    />
                    <Input
                        label="Son Tarix"
                        textinputConfig={{
                            placeholder: 'İl-ay-gün',
                            maxLength: 10,
                            onChangeText: text => inputChangeHandler('endDate', text),
                            value: filterDate.endDate,
                        }}
                    />
                </View>
                <Text style={styles.title}>Süd miqdarı {filteredTotal} litr</Text>
                <TableHead headers={headers} />
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => { handleSelectedRow(item.id) }}
                            style={[selectedRow === item.id && { backgroundColor: 'lightblue' }]}
                        >
                            <MilkReportItem date={item.date} amount={item.total} id={item.id} count={++count} />
                        </Pressable>
                    )}
                    keyExtractor={item => item.id.toString()}
                    style={styles.flatList}
                />
                <FixedButton
                    onPress={() => modalVisibilty(true)}
                    name={selectedRow === null ? 'add' : 'preview'}
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
                <ScrollView>
                    <View style={styles.modalContent}>
                        <Input
                            label="Tarix"
                            textinputConfig={{
                                placeholder: 'İl-ay-gün',
                                maxLength: 10,
                                onChangeText: text => inputChangeHandler('date', text),
                                value: inputs.date,
                            }}
                        />
                        <Input
                            label='Səhər süd miqdarı'
                            textinputConfig={{
                                placeholder: 'Litr',
                                keyboardType: 'numeric',
                                maxLength: 10,
                                onChangeText: text => inputChangeHandler('morning', text),
                                value: inputs.morning.toString(),
                            }}
                        />
                        <Input
                            label='Axşam süd miqdarı'
                            textinputConfig={{
                                placeholder: 'Litr',
                                keyboardType: 'numeric',
                                maxLength: 10,
                                onChangeText: text => inputChangeHandler('night', text),
                                value: inputs.night.toString(),
                            }}
                        />
                        <Input
                            label="İstifadə olunan süd miqdarı"
                            textinputConfig={{
                                maxLength: 10,
                                keyboardType: 'numeric',
                                onChangeText: text => inputChangeHandler('used_milk', text),
                                value: inputs.used_milk.toString(),
                            }}
                        />
                        <Input
                            label="Cəmi"
                            textinputConfig={{
                                maxLength: 10,
                                keyboardType: 'numeric',
                                onChangeText: text => inputChangeHandler('total', text),
                                value: inputs.total,
                            }}
                        />
                        <Input
                            label="Əlavə məlumat"
                            textinputConfig={{
                                multiline: true,
                                onChangeText: text => inputChangeHandler('other_info', text),
                                value: inputs.other_info,
                            }}
                        />
                    </View>
                </ScrollView>
                <View style={styles.radioButtonContainer}>
                    <Button
                        text='Təsdiq et'
                        onPress={addMilkReport}
                        color={GlobalStyles.colors.green}
                    />
                    {selectedRow !== null ?
                        <>
                            <Button
                                text='Sil'
                                color='red'
                                onPress={deleteMilkReport}
                            />
                        </>
                        : ''
                    }
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    row: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#ddd',
        justifyContent: 'space-between',
    },
    cell: {
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderColor: '#ddd',
        borderWidth: 0.3,
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16,
    },
    modalContent: {
        paddingHorizontal: 20,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    title: {
        color: GlobalStyles.colors.lightGreen,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
});

export default MilkScreen;