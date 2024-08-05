import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, FlatList, StyleSheet, Modal, Pressable } from 'react-native';

import Input from '../components/UI/Input';
import TableHead from '../components/UI/TableHead';
import FixedButton from '../components/UI/FixedButton';
import Button from '../components/UI/Button';
import { getFormatedDate } from '../util/date';
import RadioButton from '../components/UI/RadioButton';
import { GlobalStyles } from '../constants/styles';

const dailyMilkReports = [
    { id: '1', date: '2024-07-20', amount: '10', cowCount: '15', time: 'axşam' },
    { id: '2', date: '2024-07-19', amount: '12', cowCount: '15', time: 'səhər' },
    { id: '3', date: '2024-07-18', amount: '8', cowCount: '15', time: 'axşam' },
    { id: '4', date: '2024-07-17', amount: '11', cowCount: '15', time: 'səhər' },
    { id: '5', date: '2024-07-16', amount: '9', cowCount: '15', time: 'səhər' },
    { id: '6', date: '2024-07-15', amount: '7', cowCount: '15', time: 'səhər' },
    { id: '7', date: '2024-07-14', amount: '13', cowCount: '15', time: 'axşam' },
    { id: '8', date: '2024-07-13', amount: '10', cowCount: '15', time: 'axşam' },
    { id: '9', date: '2024-07-12', amount: '11', cowCount: '15', time: 'axşam' },
    { id: '10', date: '2024-07-11', amount: '12', cowCount: '15', time: 'axşam' },
];

const MilkReportItem = ({ id, date, amount }) => (
    <View style={styles.row}>
        <View style={styles.cell}>
            <Text style={styles.cellText}>{id}</Text>
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
    const [modalVisible, setModalVisible] = useState(false);
    const [inputs, setInputs] = useState({
        amount: '',
        date: today,
        cowCount: ''
    });
    const [selectTime, setSelectTime] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);

    const headers = ["N", "Tarix", "Miqdar"];
    const today = getFormatedDate(new Date());

    useEffect(() => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            date: today
        }));
    }, []);

    function inputChangeHandler(inputName, text) {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [inputName]: text
        }));
    };

    function addMilkReport() {
        modalVisibilty(false);
    }

    function modalVisibilty(status) {
        setModalVisible(status);
        status ? '' :
            setInputs({
                milk: '',
                date: '',
                cowCount: ''
            });
    }

    function handleSelectedRow(id) {
        if (selectedRow === id) {
            setSelectedRow(null);
            return;
        }
        else {
            setSelectedRow(id);
            const data = dailyMilkReports.find((item) => item.id === id);
            setInputs({
                amount: data.amount,
                date: data.date,
                cowCount: data.cowCount
            })
            setSelectTime(data.time);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <TableHead headers={headers} />
                <FlatList
                    data={dailyMilkReports}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => { handleSelectedRow(item.id) }}
                            style={[selectedRow === item.id && { backgroundColor: 'lightblue' }]}
                        >
                            <MilkReportItem date={item.date} amount={item.amount} id={item.id} />
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.id}
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
                <View style={styles.modalContent}>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton
                            text='Səhər'
                            selected={selectTime === 'səhər'}
                            onSelect={() => {
                                setSelectTime('səhər')
                            }}
                        />
                        <RadioButton
                            text='Axşam'
                            selected={selectTime === 'axşam'}
                            onSelect={() => {
                                setSelectTime('axşam')
                            }}
                        />
                    </View>
                    <Input
                        label='Günlük süd miqdarı'
                        textinputConfig={{
                            placeholder: 'Litr',
                            keyboardType: 'numeric',
                            maxLength: 10,
                            onChangeText: text => inputChangeHandler('amount', text),
                            value: inputs.amount,
                        }}
                    />
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
                        label="Sağılan heyvan sayı"
                        textinputConfig={{
                            placeholder: 'Heyvan sayı',
                            maxLength: 10,
                            keyboardType: 'numeric',
                            onChangeText: text => inputChangeHandler('cowCount', text),
                            value: inputs.cowCount,
                        }}
                    />
                </View>
                <View style={styles.justifyContentRight}>
                    <Button
                        text='Təsdiq et'
                        onPress={addMilkReport}
                        color={GlobalStyles.colors.green}
                    />
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
    justifyContentRight: {
        alignItems: 'flex-end'
    },
    radioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});

export default MilkScreen;