import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, FlatList, StyleSheet, Modal, Pressable, Alert, ScrollView } from 'react-native';

import Input from '../UI/Input';
import Button from '../UI/Button';
import MilkItem from './MilkItem';
import TableHead from '../UI/TableHead';
import FixedButton from '../UI/FixedButton';
import { getFormatedDate } from "../../util/date";
import { GlobalStyles } from '../../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { addData, deleteData, getData, updateData } from "../../util/http";


function Milk({ id, operation_type, pendingId, data }) {

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
    const [filteredTotal, setFilteredTotal] = useState('');
    const [userData, setUserData] = useState({ role: '', token: '', username: '' });
    const [filterDate, setFilterDate] = useState({
        startDate: '',
        endDate: ''
    });

    let count = 0;
    const headers = ["Tarix", "Miqdar"];

    let parsedData = {};
    if (typeof data === 'string' && data.length !== 0) {
        try {
            parsedData = JSON.parse(data);
        } catch (error) {
            console.error('Error parsing data:', error);
        }
    }
    useFocusEffect(
        useCallback(() => {
            getMilkReports();
            calculateTotalMilk();
            count = 0;
        }, [filteredTotal])
    );

    useEffect(() => {
        const loadUserData = async () => {
            const role = await AsyncStorage.getItem('role');
            const token = await AsyncStorage.getItem('token');
            const username = await AsyncStorage.getItem('username');
            const hide = await AsyncStorage.getItem('hide');
            setUserData({ role, token, username, hide });
        };
        loadUserData();
    }, []);

    useEffect(() => {
        if (Object.keys(parsedData).length !== 0) {
            setModalVisible(true);
            setInputs({
                id: parsedData.id,
                date: parsedData.date,
                morning: parsedData.morning,
                night: parsedData.night,
                total: parsedData.total,
                used_milk: parsedData.used_milk,
                other_info: parsedData.other_info
            });
        }

    }, [parsedData]);

    useEffect(() => {
        filterData();
        calculateTotalMilk();
    }, [filterDate, resData,]);


    async function getMilkReports() {
        const url = 'milk/milk';
        try {
            const data = await getData(url);
            setResData(data.reverse());
        } catch (error) {
            console.error('Error fetching milk reports:', error);
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
            id: inputs.id,
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

            if (selectedRow !== null || operation_type === 'milk/update-milk') {
                endpoint = `milk/update-milk`;
                response = await updateData(endpoint, inputs.id, data);
                url = 'pendingOperation/deleteOperation'
                deleteData(url, pendingId, data);
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
        let response = '';
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

        try {
            response = await deleteData(url, selectedRow, data);
            if (operation_type === 'milk/milk-delete') {
                url = 'pendingOperation/deleteOperation'
                deleteData(url, pendingId, data);
            }
            if (response.status === 200 || response.status === 201) {
                Alert.alert('', response.message);
                getMilkReports();
                modalVisibilty(false);
            } else {
                Alert.alert('Xəta', response.message);
            }
        } catch (error) {
            console.error('Error deleting milk report:', error);
        }
    }

    function modalVisibilty(status) {
        setModalVisible(status);
        if (!status) {
            setInputs({
                date: today,
                morning: '',
                night: '',
                total: '',
                used_milk: '',
                other_info: ''
            });
        }
        if (status === false) setSelectedRow(null);
    }

    function handleSelectedRow(id) {
        if (selectedRow === id) {
            setSelectedRow(null);
            return;
        } else {
            setSelectedRow(id);
            modalVisibilty(true);
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

    function filterData() {
        const { startDate, endDate } = filterDate;
        const filtered = resData.filter(item => {
            const itemDate = new Date(item.date);
            const start = startDate ? new Date(startDate) : new Date('1900-01-01');
            const end = endDate ? new Date(endDate) : new Date();
            return itemDate >= start && itemDate <= end;
        });
        setFilteredData(filtered);
    };

    function calculateTotalMilk() {
        const total = filteredData.reduce((acc, item) => acc + parseInt(item.total, 10), 0);
        setFilteredTotal(total);
    };

    function resetState() {
        setInputs({
            date: today,
            morning: '',
            night: '',
            total: '',
            used_milk: '',
            other_info: ''
        });
        setSelectedRow(null);
        getMilkReports();
        modalVisibilty(false);
        operation_type = '';
        pendingId = null;
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
                            <MilkItem date={item.date} amount={item.total} count={++count} />
                        </Pressable>
                    )}
                    keyExtractor={item => item.id}
                    style={styles.flatList}
                />
                <FixedButton
                    onPress={() => modalVisibilty(true)}
                    name={'add'}
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
                                value: inputs.morning,
                            }}
                        />
                        <Input
                            label='Axşam süd miqdarı'
                            textinputConfig={{
                                placeholder: 'Litr',
                                keyboardType: 'numeric',
                                maxLength: 10,
                                onChangeText: text => inputChangeHandler('night', text),
                                value: inputs.night,
                            }}
                        />
                        <Input
                            label="İstifadə olunan süd miqdarı"
                            textinputConfig={{
                                maxLength: 10,
                                keyboardType: 'numeric',
                                onChangeText: text => inputChangeHandler('used_milk', text),
                                value: inputs.used_milk,
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
                    {
                        operation_type === 'milk/delete-milk' && (
                            <>
                                <Button
                                    text='Təsdiq et'
                                    onPress={deleteMilkReport}
                                    color={GlobalStyles.colors.green}
                                />
                                <Button
                                    text='Sil'
                                    color='red'
                                    onPress={deleteMilkReport}
                                />
                            </>
                        )
                    }
                    {
                        operation_type !== '' && (
                            <Button
                                text='Sil'
                                color='red'
                                onPress={deleteMilkReport}
                            />
                        )
                    }
                </View>
            </Modal>
        </>
    )
};

export default Milk;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    flatList: {
        // flex: 1,
        backgroundColor: '#fff',
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