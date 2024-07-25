import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../UI/Input";
import Button from "../UI/Button";
import RadioButton from "../UI/RadioButton";
import { GlobalStyles } from "../../constants/styles";
import Dropdown from "../UI/Dropdown";
import { addData, deleteData } from "../../util/http";

const { width, height } = Dimensions.get('window');

function ManageCow({ route }) {
    const { id, defaultValue, title, name, mode } = route.params;

    const [selectedGender, setSelectedGender] = useState(defaultValue ? defaultValue.gender : '');
    const [selectGetWay, setSelectGetWay] = useState(defaultValue ? defaultValue.how_get : '');
    const [showDropdown, setShowDropdown] = useState(false);
    const [animalCategory, setAnimalCategory] = useState(defaultValue ? defaultValue.type : '');
    const [userData, setUserData] = useState({ role: '', token: '', username: '' });

    console.log(defaultValue);

    const [inputs, setInputs] = useState({
        bilka_number: {
            value: defaultValue ? defaultValue.bilka_number.toString() : '',
            isValid: true
        },
        name: {
            value: defaultValue ? defaultValue.name : '',
            isValid: true
        },
        weight: {
            value: defaultValue ? defaultValue.weight.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValue ? defaultValue.date : '',
            isValid: true
        },
        birthdate: {
            value: defaultValue ? defaultValue.birthdate : '',
            isValid: true
        },
        milk_quantity: {
            value: defaultValue ? defaultValue.milk_quantity.toString() : '',
            isValid: true
        },
        vaccine: {
            value: defaultValue ? defaultValue.vaccine : '',
            isValid: true
        },
        illness: {
            value: defaultValue ? defaultValue.illness : '',
            isValid: true
        },
        other_info: {
            value: defaultValue ? defaultValue.info : '',
            isValid: true
        },
        mother_bilka: {
            value: defaultValue ? defaultValue.mother_bilka : '',
            isValid: true
        },
        father_bilka: {
            value: defaultValue ? defaultValue.father_bilka : '',
            isValid: true
        },
        insemination_date: {
            value: defaultValue ? defaultValue.insemination_date : '',
            isValid: true
        },
        getFrom: {
            value: defaultValue ? defaultValue.getFrom : '',
            isValid: true
        },
        child_id: {
            value: defaultValue ? defaultValue.child_id : '',
            isValid: true
        },
        last_checkup_date: {
            value: defaultValue ? defaultValue.last_checkup_date : '',
            isValid: true
        },
        health_status: {
            value: defaultValue ? defaultValue.health_status : '',
            isValid: true
        },
        diet: {
            value: defaultValue ? defaultValue.diet : '',
            isValid: true
        },
    });

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

    useEffect(() => {
        name !== undefined ? setAnimalCategory(name) : ''
        animalCategory === 'İnək' ? setSelectedGender('Dişi') : ''

        const loadUserData = async () => {
            const role = await AsyncStorage.getItem('role');
            const token = await AsyncStorage.getItem('token');
            const username = await AsyncStorage.getItem('username');
            setUserData({ role, token, username });
        };
        loadUserData();

    })

    async function submitCow() {
        let endPoint = 'cows/add-cow';
        let data = {};

        try {
            if (inputs !== '') {
                data = {
                    bilka_number: inputs.bilka_number.value,
                    name: inputs.name.value,
                    weight: inputs.weight.value,
                    gender: selectedGender,
                    birthdate: inputs.birthdate.value,
                    type: animalCategory,
                    milk_quantity: inputs.milk_quantity.value,
                    vaccine: inputs.vaccine.value,
                    illness: inputs.illness.value,
                    mother_bilka: inputs.mother_bilka.value,
                    father_bilka: inputs.father_bilka.value,
                    insemination_date: inputs.insemination_date.value,
                    how_get: selectGetWay,
                    get_from: inputs.getFrom.value,
                    other_info: inputs.other_info.value,
                    child_id: inputs.child_id.value,
                    last_checkup_date: inputs.last_checkup_date.value,
                    health_status: inputs.health_status.value,
                    diet: inputs.diet.value,
                    username: userData.username,
                    role: userData.role,
                };

                const response = await addData(endPoint, data);
                if (response.status === 201) {
                    if (userData.role !== 'master_admin') {
                        Alert.alert('Sizin sorğunuz Master Admin tərəfindən təsdiq edilməlidir', response.message);
                        if (mode === 'pending') {
                            let pending = 'pendingOperation/deleteOperation';
                            deleteData(id, pending);
                        }
                    } else {
                        Alert.alert('', response.message);
                    }
                }


            } else {
                Alert.alert('Error', 'Please fill in all required fields.');
            }
        } catch (error) {
            console.error('Error submitting cow data:', error);
            Alert.alert('Error', 'An error occurred while submitting cow data.');
        }
    }

    function deleteCow(id, name) {
        let endPoint = 'cows/delete-cow';

        deleteData(endPoint, id)
            .then(response => {
                Alert.alert('Success', response.message);
            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });
    }

    return (
        <>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Input
                        label='Bilka nomresi'
                        textinputConfig={{
                            onChangeText: inputChangeHandler.bind(this, 'bilka_number'),
                            value: inputs.bilka_number.value,
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
                            text='İnək'
                            selected={animalCategory === 'İnək'}
                            onSelect={() => {
                                setAnimalCategory('İnək')
                            }}
                        />
                        <RadioButton
                            text='Gənc'
                            selected={animalCategory === 'Gənc'}
                            onSelect={() => {
                                setAnimalCategory('Gənc')
                            }}
                        />
                        <RadioButton
                            text='Buzov'
                            selected={animalCategory === 'Buzov'}
                            onSelect={() => {
                                setAnimalCategory('Buzov')
                            }}
                        />
                    </View>
                    {
                        animalCategory === 'İnək' ? '' :
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
                    }
                    <Input
                        label="Doğum Tarix"
                        textinputConfig={{
                            placeholder: 'İl-ay-gün',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'birthdate'),
                            value: inputs.birthdate.value,
                        }}
                    />
                    <View style={styles.radioButtonContainer}>
                        <RadioButton
                            text='Süni Mayalanma'
                            selected={selectGetWay === 'Süni Mayalanma'}
                            onSelect={() => {
                                setSelectGetWay('Süni Mayalanma')
                            }}
                        />
                        <RadioButton
                            text='Təbii Mayalanma'
                            selected={selectGetWay === 'Təbii Mayalanma'}
                            onSelect={() => {
                                setSelectGetWay('Təbii Mayalanma')
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
                        selectGetWay === 'Təbii Mayalanma' ?
                            <>
                                <Input
                                    label='Anasının bilka nömrəsi'
                                    textinputConfig={{
                                        maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'mother_bilka'),
                                        value: inputs.mother_bilka.value,
                                    }}
                                />

                                <Input
                                    label='Atasının bilka nömrəsi'
                                    textinputConfig={{
                                        maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'father_bilka'),
                                        value: inputs.father_bilka.value,
                                    }}
                                />
                            </>
                            : <></>

                    }

                    {
                        selectGetWay === 'Süni Mayalanma' ?
                            <>
                                <Input
                                    label='Mayalanma tarixi'
                                    textinputConfig={{
                                        placeholder: 'İl-ay-gün',
                                        maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'insemination_date'),
                                        value: inputs.insemination_date.value,
                                    }}
                                />
                                <Input
                                    label='Anasının bilka nömrəsi'
                                    textinputConfig={{
                                        maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'mother_bilka'),
                                        value: inputs.mother_bilka.value,
                                    }}
                                />
                            </>
                            : <></>

                    }
                    {
                        selectGetWay === 'Alınıb' ?
                            <>
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
                    {
                        selectedGender === 'Dişi' ?
                            <Input
                                label='Günlük süd miqdarı'
                                textinputConfig={{
                                    placeholder: 'Litr',
                                    keyboardType: 'numeric',
                                    maxLength: 4,
                                    onChangeText: inputChangeHandler.bind(this, 'milk_quantity'),
                                    value: inputs.milk_quantity.value,
                                }}
                            />
                            : ''
                    }
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
                            onChangeText: inputChangeHandler.bind(this, 'illness'),
                            value: inputs.illness.value,
                        }}
                    />
                    <Input
                        label='Əlavə məlumatlar'
                        textinputConfig={{
                            multiline: true,
                            onChangeText: inputChangeHandler.bind(this, 'other_info'),
                            value: inputs.other_info.value,
                        }}
                    />
                    <Input
                        label='Uşaqları'
                        textinputConfig={{
                            multiline: true,
                            onChangeText: inputChangeHandler.bind(this, 'child_id'),
                            value: inputs.child_id.value,
                        }}
                    />
                    <Input
                        label='Son yoxlanış tarixi'
                        textinputConfig={{
                            placeholder: 'İl-ay-gün',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'last_checkup_date'),
                            value: inputs.last_checkup_date.value,
                        }}
                    />
                    <Input
                        label='Sağlamlıq vəziyəti'
                        textinputConfig={{
                            multiline: true,
                            onChangeText: inputChangeHandler.bind(this, 'health_status'),
                            value: inputs.health_status.value,
                        }}
                    />
                    <Input
                        label='Diet'
                        textinputConfig={{
                            multiline: true,
                            onChangeText: inputChangeHandler.bind(this, 'diet'),
                            value: inputs.diet.value,
                        }}
                    />
                    <View style={styles.radioButtonContainer}>
                        {mode === 'pending' && userData.role === 'master_admin' ? (
                            <>
                                <Button
                                    text='Təsdiq et'
                                    color='green'
                                    onPress={submitCow}
                                />
                                <Button
                                    text='Ləğv et'
                                    color='red'
                                    onPress={() => deleteCow(id, 'pending')}
                                />
                            </>
                        ) : (
                            mode !== 'pending' && (
                                <>
                                    <Button
                                        text='Ləğv et'
                                        color='red'
                                        onPress={() => deleteCow(id, 'pending')}
                                    />
                                    <Button
                                        text='Sil'
                                        color='red'
                                        onPress={() => deleteCow(id, 'animal')}
                                    />
                                    {showDropdown && (
                                        <View style={styles.dropdownBox}>
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
                                    )}
                                    <Button
                                        text={<FontAwesome name="exchange" size={24} color="white" />}
                                        color={showDropdown ? GlobalStyles.colors.primary800 : 'green'}
                                        onPress={() => { setShowDropdown(!showDropdown) }}
                                    />
                                </>
                            )
                        )}
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
        color: GlobalStyles.colors.primary800,
        textAlign: 'center',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    dropdonwBox: {
        width: width * 1,
        alignItems: 'center',
        position: 'absolute',
        top: -149,
    }
})