import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";

import Input from "./UI/Input";
import Button from "./UI/Button";
import RadioButton from "./UI/RadioButton";
import { getFormatedDate } from "../util/date";
import { GlobalStyles } from "../constants/styles";
import Dropdown from "./UI/Dropdown";


function ManageCow({ route, defaultValues }) {
    const [inputs, setInputs] = useState({
        number: {
            value: defaultValues ? defaultValues.number.toString() : '',
            isValid: true
        },
        name: {
            value: defaultValues ? defaultValues.name : '',
            isValid: true
        },
        weight: {
            value: defaultValues ? defaultValues.weight.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? getFormatedDate(defaultValues.date) : '',
            isValid: true
        },

        enteredDate: {
            value: defaultValues ? getFormatedDate(defaultValues.enteredDate) : '',
            isValid: true
        },
        milk: {
            value: defaultValues ? defaultValues.milk.toString() : '',
            isValid: true
        },
        vaccine: {
            value: defaultValues ? defaultValues.vaccine : '',
            isValid: true
        },
        illnes: {
            value: defaultValues ? defaultValues.illnes : '',
            isValid: true
        },
        info: {
            value: defaultValues ? defaultValues.info : '',
            isValid: true
        },
        motherBilka: {
            value: defaultValues ? defaultValues.motherBilka : '',
            isValid: true
        },
        fatherBilka: {
            value: defaultValues ? defaultValues.fatherBilka : '',
            isValid: true
        },
        mayalanmatarixi: {
            value: defaultValues ? defaultValues.mayalanmatarixi : '',
            isValid: true
        },
        buyDate: {
            value: defaultValues ? defaultValues.buyDate : '',
            isValid: true
        },
        getFrom: {
            value: defaultValues ? defaultValues.getFrom : '',
            isValid: true
        }
    });
    const [selectedGender, setSelectedGender] = useState('');
    const [selectGetWay, setSelectGetWay] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const { id, title } = route.params;

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            }
        })
    };

    const handleOptionSelect = (id, tableName, status) => {
        Alert.alert(`Option Selected: ${status}`);
        switch (status) {
            case 'satılıb':
                break;
            case 'sağılır':
                break;
            case 'tələf olub':
                break;
            case 'boğaz':
                break;
            default:
                break;
        }
    };

    function submitCow(){
        console.log(inputs);
    }

    function deleteCow(id){
        console.log(id);
    }

    return (
        <>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text>{id !== '' ? id : "Insert new cow's data"}</Text>
            </View>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Input
                        label='Bilka nomresi'
                        textinputConfig={{
                            keyboardType: 'decimal-pad',
                            onChangeText: inputChangeHandler.bind(this, 'number'),
                            value: inputs.number.value,
                        }}
                    />
                    <Input
                        label='Ad'
                        textinputConfig={{
                            onChangeText: inputChangeHandler.bind(this, 'name'),
                            value: inputs.name.value,
                        }}
                    />
                    <Input
                        label='Çəki'
                        textinputConfig={{
                            placeholder: 'Kg',
                            keyboardType: 'decimal-pad',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'weight'),
                            value: inputs.weight.value,
                        }}
                    />
                    <View style={styles.radioButtonContainer}>
                        <RadioButton
                            text='Erkək'
                            selected={selectedGender === 'Erkək'}
                            onSelect={() => {
                                setSelectedGender('Erkək')
                            }}
                        />
                        <RadioButton
                            text='Dişi'
                            selected={selectedGender === 'Dişi'}
                            onSelect={() => {
                                setSelectedGender('Dişi')
                            }}
                        />
                    </View>
                    <Input
                        label="Tarix"
                        textinputConfig={{
                            placeholder: 'İl-ay-gün',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'date'),
                            value: inputs.date.value,
                        }}
                    />
                    <Input
                        label="Fermaya daxil olduqu tarix"
                        textinputConfig={{
                            placeholder: 'İl-ay-gün',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'enteredDate'),
                            value: inputs.enteredDate.value,
                        }}
                    />
                    <Text>Daxil olduqu qrup</Text>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton
                            text='Mayalanma'
                            selected={selectGetWay === 'Mayalanma'}
                            onSelect={() => {
                                setSelectGetWay('Mayalanma')
                            }}
                        />
                        <RadioButton
                            text='Təbii yolla'
                            selected={selectGetWay === 'Təbii yolla'}
                            onSelect={() => {
                                setSelectGetWay('Təbii yolla')
                            }}
                        />
                        <RadioButton
                            text='Alınıb'
                            selected={selectGetWay === 'Alınıb'}
                            onSelect={() => {
                                setSelectGetWay('Alınıb')
                            }}
                        />
                    </View>
                    {
                        selectGetWay === 'Təbii yolla' ?
                            <>
                                <Input
                                    label='Anasının bilka nömrəsi'
                                    textinputConfig={{
                                        keyboardType: 'numeric',
                                        // maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'motherBilka'),
                                        value: inputs.motherBilka.value,
                                    }}
                                />

                                <Input
                                    label='Atasının bilka nömrəsi'
                                    textinputConfig={{
                                        keyboardType: 'numeric',
                                        // maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'fatherBilka'),
                                        value: inputs.fatherBilka.value,
                                    }}
                                />
                            </>
                            : <></>

                    }

                    {
                        selectGetWay === 'Mayalanma' ?
                            <>
                                <Input
                                    label='Mayalanma tarixi'
                                    textinputConfig={{
                                        placeholder: 'İl-ay-gün',
                                        maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'mayalanmatarixi'),
                                        value: inputs.mayalanmatarixi.value,
                                    }}
                                />
                                <Input
                                    label='Anasının bilka nömrəsi'
                                    textinputConfig={{
                                        keyboardType: 'numeric',
                                        // maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'motherBilka'),
                                        value: inputs.motherBilka.value,
                                    }}
                                />
                            </>
                            : <></>

                    }
                    {
                        selectGetWay === 'Alınıb' ?
                            <>
                                <Input
                                    label='Alınma tarixi'
                                    textinputConfig={{
                                        placeholder: 'İy-ay-gün',
                                        keyboardType: 'numeric',
                                        maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'buyDate'),
                                        value: inputs.buyDate.value,
                                    }}
                                />

                                <Input
                                    label='Alındıqı yer və şəxs'
                                    textinputConfig={{
                                        onChangeText: inputChangeHandler.bind(this, 'getFrom'),
                                        value: inputs.getFrom.value,
                                    }}
                                />
                            </>
                            : <></>

                    }
                    <Input
                        label='Günlük süd miqdarı'
                        textinputConfig={{
                            placeholder: 'Litr',
                            keyboardType: 'numeric',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'milk'),
                            value: inputs.milk.value,
                        }}
                    />
                    <Input
                        label='Vaksinlər'
                        textinputConfig={{
                            multiline: true,
                            onChangeText: inputChangeHandler.bind(this, 'vaccine'),
                            value: inputs.vaccine.value,
                        }}
                    />
                    <Input
                        label='Xəsdəliklər'
                        textinputConfig={{
                            multiline: true,
                            onChangeText: inputChangeHandler.bind(this, 'illnes'),
                            value: inputs.illnes.value,
                        }}
                    />
                    <Input
                        label='Əlavə məlumatlar'
                        textinputConfig={{
                            multiline: true,
                            onChangeText: inputChangeHandler.bind(this, 'info'),
                            value: inputs.info.value,
                        }}
                    />
                    <View style={styles.radioButtonContainer}>
                        <Button
                            text='Təsdiq et'
                            style={styles.button}
                            color={GlobalStyles.colors.primary800}
                            onPress={submitCow}
                        />
                        {id === undefined ? '' :
                            <>
                                <Button
                                    text='Sil'
                                    style={styles.button}
                                    color='red'
                                    onPress={() => deleteCow(id)}
                                />
                                {showDropdown ?
                                    <View style={styles.dropdonwBox}>
                                        <Dropdown
                                            text='Sat'
                                            id={id}
                                            tableName='sold'
                                            status='satılıb'
                                            onSelect={handleOptionSelect}
                                        />
                                        <Dropdown
                                            text='Sağmal'
                                            id={id}
                                            tableName='sağmal'
                                            status='sağılır'
                                            onSelect={handleOptionSelect}
                                        />
                                        <Dropdown
                                            text='Tələf olub'
                                            id={id}
                                            tableName='dead'
                                            status='tələf olub'
                                            onSelect={handleOptionSelect}
                                        />
                                        <Dropdown
                                            text='Boğaz'
                                            id={id}
                                            tableName='boğaz'
                                            status='boğaz'
                                            onSelect={handleOptionSelect}
                                        />
                                    </View>
                                    : ''
                                }
                                <Button
                                    text={<FontAwesome name="exchange" size={24} color="white" />}
                                    style={styles.button}
                                    color={showDropdown ? GlobalStyles.colors.primary800 : 'green'}
                                    onPress={() => { setShowDropdown(!showDropdown) }}
                                />
                            </>
                        }
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default ManageCow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    title: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: GlobalStyles.colors.gray700,
        textAlign: 'center',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    dropdonwBox: {
        width: 150,
        // height: 400,
        position: 'absolute',
        top: -169,
        right: 121,
    }
})