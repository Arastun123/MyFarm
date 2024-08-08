import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import RadioButton from '../components/UI/RadioButton';
import Milk from '../components/Milk/Milk';
import SoldMilk from '../components/Milk/SoldMilk';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../util/http';
import { GlobalStyles } from '../constants/styles';

function MilkScreen({ route }) {
    const { operation_type = '', pendingId = null, data = {}, id = 0, target_table = null } = route.params || {};
  
    const [component, setCompnent] = useState(target_table ? target_table : 'milk');
    const [resData, setResData] = useState([]);
    const [total_milk, setTotalMilk] = useState('');

    useFocusEffect(
        useCallback(() => {
            getMilkReports();
        }, [])
    );

    async function getMilkReports() {
        const url = 'residualMilk/residualMilk';
        try {
            const data = await getData(url);
            setResData(data[0]);

            setTotalMilk(resData.total_milk);
        } catch (error) {
            console.error('Error fetching milk reports:', error);
        }
    }

    return (
        <>
            <View >
                <View style={styles.radioButtonContainer}>
                    <RadioButton
                        text='Sağılmış süd'
                        selected={component === 'milk'}
                        onSelect={() => {
                            setCompnent('milk')
                        }}
                    />
                    <RadioButton
                        text='Satılmış süd'
                        selected={component === 'sold_milk'}
                        onSelect={() => {
                            setCompnent('sold_milk')
                        }}
                    />
                </View>
                <Text style={styles.title}>Çəndə olan süd miqdarı: {total_milk}</Text>
            </View>
            {
                component === 'milk' ?
                    <Milk operation_type={operation_type} pendingId={pendingId} data={data} id={id} /> :
                    <SoldMilk operation_type={operation_type} pendingId={pendingId} data={data} total_milk={total_milk} id={id} />
            }
        </>
    );
}

const styles = StyleSheet.create({
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
        marginBottom: 10
    },
});

export default MilkScreen;