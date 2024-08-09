import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';

import Input from '../UI/Input';
import MilkItem from './MilkItem';
import TableHead from '../UI/TableHead';
import FixedButton from '../UI/FixedButton';
import { GlobalStyles } from '../../constants/styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getData } from "../../util/http";


function Milk() {

    const [selectTime, setSelectTime] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [resData, setResData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredTotal, setFilteredTotal] = useState('');
    const [filterDate, setFilterDate] = useState({
        startDate: '',
        endDate: ''
    });
    const navigation = useNavigation();
    let count = 0;
    const headers = ["Tarix", "Miqdar"];

    let target_table = 'milk'

    useFocusEffect(
        useCallback(() => {
            getMilkReports();
            calculateTotalMilk();
            count = 0;
        }, [filteredTotal])
    );

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

    function handleSelectedRow(id) {
        if (selectedRow === id) {
            setSelectedRow(null);
            return;
        } else {
            setSelectedRow(id);
            const defaultValue = resData.find(item => item.id === id);
            navigation.navigate('Süd Redaktə', { target_table, defaultValue, id });
            setSelectedRow(null);
            setSelectTime(defaultValue.time);
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

    function changeScreen(){
        navigation.navigate('Süd Redaktə', {  target_table });
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
                    onPress={() => changeScreen()}
                    name={'add'}
                />
            </View>
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