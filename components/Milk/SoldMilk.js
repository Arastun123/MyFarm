import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, FlatList, StyleSheet, Modal, Pressable, Alert, ScrollView } from 'react-native';

import Input from '../UI/Input';
import Button from '../UI/Button';
import TableHead from '../UI/TableHead';
import MilkItem from '../Milk/MilkItem';
import FixedButton from '../UI/FixedButton';
import { getFormatedDate } from "../../util/date";
import { GlobalStyles } from '../../constants/styles';
import { useFocusEffect } from '@react-navigation/native';
import { addData, deleteData, getData, updateData } from "../../util/http";

function SoldMilk({ operation_type, pendingId, data, total_milk }) {
    const today = getFormatedDate(new Date());
    const [modalVisible, setModalVisible] = useState(operation_type ? true : false);
    const [inputs, setInputs] = useState({
        id: null,
        date: today,
        sold_to: '',
        quantity: '',
        total: '',
        price: '',
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

    const headers = ["Tarix", "Miqdar"];
    let count = 0;

    let parsedData = {};
    if (typeof data === 'string' && data.length !== 0) {
        try {
            parsedData = JSON.parse(data);
        } catch (error) {
            console.error('Error parsing data:', error);
        }
    }

    console.log(parsedData.date.slice(0, 10));
    console.log(parsedData);

    useFocusEffect(
        useCallback(() => {
            getMilkReports();
        }, [])
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

    // useEffect(() => {
    //     if (Object.keys(parsedData).length !== 0) {
    //         setModalVisible(true);
    //         setInputs({
    //             id: parsedData.id,
    //             date: parsedData.date,
    //             sold_to: parsedData.sold_to,
    //             quantity: parsedData.quantity,
    //             total: parsedData.total,
    //             price: parsedData.price,
    //             other_info: parsedData.other_info
    //         });
    //     }
    // }, [parsedData]);

    useEffect(() => {
        filterData();
        calculateTotalMilk();
    }, [filterDate, resData]);

    async function getMilkReports() {
        const url = 'soldmilk/sold_milk';
        try {
            const data = await getData(url);
            setResData(data.reverse());
        } catch (error) {
            console.error('Error fetching milk reports:', error);
        }
    }

    function calcMilkQuantity(updatedInputs) {
        const quantity = parseInt(updatedInputs.quantity, 10) || 0;
        const price = parseInt(updatedInputs.price, 10) || 0;
        const total = quantity * price;

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
        let endpoint = `soldmilk/add-sold_milk`;

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

            if (selectedRow !== null) {
                endpoint = `soldmilk/update-sold_milk`;
                response = await updateData(endpoint, inputs.id, data);
                if (operation_type === 'soldmilk/update-sold_milk') {
                    url = 'pendingOperation/deleteOperation'
                    deleteData(url, pendingId, data);
                }
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
        let url = 'soldmilk/delete-sold_milk';
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
            if (operation_type === 'soldmilk/delete-sold_milk') {
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
                sold_to: '',
                quantity: '',
                total: '',
                price: '',
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
                sold_to: data.sold_to,
                quantity: data.quantity,
                total: data.total,
                price: data.price,
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
            sold_to: '',
            quantity: '',
            total: '',
            price: '',
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
                <View style={{ ...styles.radioButtonContainer, justifyContent: 'space-evenly' }}>
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
                <Text style={styles.title}>Cəmi: {filteredTotal} manat</Text>
                <TableHead headers={headers} />
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => { handleSelectedRow(item.id) }}
                            style={[selectedRow === item.id && { backgroundColor: 'lightblue' }]}
                        >
                            <MilkItem date={item.date} amount={item.total} id={item.id} count={++count} />
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
                            label='Alan şəxs'
                            textinputConfig={{
                                onChangeText: text => inputChangeHandler('sold_to', text),
                                value: inputs.sold_to,
                            }}
                        />
                        <Input
                            label="Miqdarı"
                            textinputConfig={{
                                keyboardType: 'numeric',
                                onChangeText: text => inputChangeHandler('quantity', text),
                                value: inputs.quantity,
                            }}
                        />
                        <Input
                            label="Qiyməti"
                            textinputConfig={{
                                keyboardType: 'numeric',
                                onChangeText: text => inputChangeHandler('price', text),
                                value: inputs.price,
                            }}
                        />
                        <Input
                            label="Alınacaq məbləğ"
                            textinputConfig={{
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
                    {
                        operation_type !== 'soldMilk/delete-soldMilk' && (
                            <>
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
                            </>
                        )
                    }
                    {
                        operation_type === 'soldMilk/delete-soldMilk' && (
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
                </View>
            </Modal>
        </>
    )
};

export default SoldMilk;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        backgroundColor: '#f8f8f8',
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