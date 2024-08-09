import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import RadioButton from '../components/UI/RadioButton';
import Milk from '../components/Milk/Milk';
import SoldMilk from '../components/Milk/SoldMilk';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../util/http';
import { GlobalStyles } from '../constants/styles';

function MilkScreen({ route }) {
    const { operation_type = '', pendingId = null, data = {}, id = 0, target_table = null } = route.params || {};
    
    const [component, setComponent] = useState(target_table ? target_table : 'milk');
    const [resData, setResData] = useState([]);
    const [total_milk, setTotalMilk] = useState('');


    useFocusEffect(
        useCallback(() => {
            getMilkReports();
        }, [])
    );

    useEffect(() => {
        if (resData.total_milk !== undefined) {
            setTotalMilk(resData.total_milk);
        }
    }, [resData]);

    async function getMilkReports() {
        const url = 'residualMilk/residualMilk';
        try {
            const data = await getData(url);
            if (data && data.length > 0) {
                setResData(data[0]);
            }
        } catch (error) {
            console.error('Error fetching milk reports:', error);
        }
    }

    return (
        <>
            <View>
                <View style={styles.radioButtonContainer}>
                    <RadioButton
                        text='Sağılmış süd'
                        selected={component === 'milk'}
                        onSelect={() => setComponent('milk')}
                    />
                    <RadioButton
                        text='Satılmış süd'
                        selected={component === 'sold_milk'}
                        onSelect={() => setComponent('sold_milk')}
                    />
                </View>
                <Text style={styles.title}>Çəndə olan süd miqdarı: {total_milk}</Text>
            </View>
            {component === 'milk' ? (
                <Milk operation_type={operation_type} pendingId={pendingId} data={data} id={id} />
            ) : (
                <SoldMilk operation_type={operation_type} pendingId={pendingId} data={data} total_milk={total_milk} id={id} />
            )}
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