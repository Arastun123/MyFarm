import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import RadioButton from '../components/UI/RadioButton';
import Milk from '../components/Milk/Milk';
import SoldMilk from '../components/Milk/SoldMilk';

function MilkScreen({ route }) {
    const { operation_type = '', pendingId = null, data = {} } = route.params || {};

    const [component, setCompnent] = useState('milk')
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
            </View>
            {
                component === 'milk' ?
                    <Milk operation_type={operation_type} pendingId={pendingId} data={data} /> :
                    <SoldMilk operation_type={operation_type} pendingId={pendingId} data={data} />
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
});

export default MilkScreen;