import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../UI/Input";
import Button from "../UI/Button";
import RadioButton from "../UI/RadioButton";
import { GlobalStyles } from "../../constants/styles";
import Dropdown from "../UI/Dropdown";
import { addData, deleteData, updateData } from "../../util/http";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');

function ManageCow({ route }) {
    const { id, defaultValue, title, name, mode, pendingId, operationType } = route.params;
    const navigation = useNavigation();

    const [selectedGender, setSelectedGender] = useState(defaultValue ? defaultValue.gender : '');
    const [selectGetWay, setSelectGetWay] = useState(defaultValue ? defaultValue.how_get : '');
    const [showDropdown, setShowDropdown] = useState(false);
    const [animalCategory, setAnimalCategory] = useState(defaultValue ? defaultValue.type : '');
    const [userData, setUserData] = useState({ role: '', token: '', username: '' });
    const [inputCount, setInputCount] = useState(1);
    const [inputs, setInputs] = useState({
        bilka_number: {
            value: defaultValue ? defaultValue.bilka_number : '',
            isValid: true
        },
        name: {
            value: defaultValue ? defaultValue.name : '',
            isValid: true
        },
        weight: {
            value: defaultValue ? defaultValue.weight : '',
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
            value: defaultValue ? defaultValue.milk_quantity : '',
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
        insemination_date: {
            value: defaultValue ? defaultValue.insemination_date : '',
            isValid: true
        },
        birth_dates: {
            value: defaultValue ? defaultValue.birth_dates : '',
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
        child_count: {
            value: defaultValue ? defaultValue.child_count : '',
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
        if (defaultValue !== undefined) {

            name !== undefined ? setAnimalCategory(name) : ''
            animalCategory === 'İnək' ? setSelectedGender('Dişi') : ''
        }

        const loadUserData = async () => {
            const role = await AsyncStorage.getItem('role');
            const token = await AsyncStorage.getItem('token');
            const username = await AsyncStorage.getItem('username');
            setUserData({ role, token, username });
        };
        loadUserData();

    })

    async function submitCow() {
        let endPoint = `${animalCategory}/add-${animalCategory}`;
        let data = {};
        let response = '';

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
                    insemination_date: inputs.insemination_date.value,
                    how_get: selectGetWay,
                    get_from: inputs.getFrom.value,
                    other_info: inputs.other_info.value,
                    child_id: inputs.child_id.value,
                    last_checkup_date: inputs.last_checkup_date.value,
                    health_status: inputs.health_status.value,
                    diet: inputs.diet.value,
                    birth_dates: inputs.birth_dates.value,
                    child_count: inputs.child_count.value,
                    username: userData.username,
                    role: userData.role,
                };
                if (mode === undefined) {
                    if (id === undefined) {
                        endPoint = `${animalCategory}/add-${animalCategory}`;
                        response = await addData(endPoint, data);
                        console.log('add');
                    } else {
                        const integerId = parseInt(id, 10);
                        endPoint = `${animalCategory}/update-${animalCategory}`;
                        response = await updateData(endPoint, integerId, data);
                        console.log('update');

                    }
                }
                else if (mode === 'pending') {
                    if (operationType === 'add') {
                        endPoint = `${animalCategory}/add-${animalCategory}`;
                        response = await addData(endPoint, data);
                        console.log('pending');
                    }
                    else {
                        const integerId = parseInt(id, 10);
                        endPoint = `${animalCategory}/update-${animalCategory}`;
                        response = await updateData(endPoint, integerId, data);
                        console.log('not pending');

                    }
                    deleteCow(pendingId);
                }


                if (response.status === 201) {
                    navigation.navigate('Heyvanlar');
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
                else {
                    Alert.alert('Xəta', response.message);
                }
            } else {
                Alert.alert('Error', 'Please fill in all required fields.');
            }
        } catch (error) {
            console.error('Error submitting cow data:', error);
            Alert.alert('Error', 'An error occurred while submitting cow data.');
        }
    }

    async function deleteCow(id, name) {
        let endPoint = 'cow/delete-cow';
        if (mode === '') {

            const response = await deleteData(endPoint, id);
            if (response.status === 200) {
                Alert.alert('Məlumat silindi');
                navigation.navigate('Heyvanlar');
            }
            else {
                Alert.alert('Xəta', response.message);
            }
        }
        else {
            endPoint = 'pendingOperation/deleteOperation/';
            deleteData(endPoint, pendingId);
            navigation.navigate('Gözləmə');
        }


    }

    function handleInputs(type) {
        setInputCount((prevCount) => {
            if (type === '+1') {
                return prevCount + 1;
            } else if (type === '-1' && prevCount > 1) {
                return prevCount - 1;
            } else {
                return prevCount;
            }
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
                            selected={animalCategory === 'cow'}
                            onSelect={() => {
                                setAnimalCategory('cow')
                            }}
                        />
                        <RadioButton
                            text='Gənc'
                            selected={animalCategory === 'younge'}
                            onSelect={() => {
                                setAnimalCategory('younge')
                            }}
                        />
                        <RadioButton
                            text='Buzov'
                            selected={animalCategory === 'calf'}
                            onSelect={() => {
                                setAnimalCategory('calf')
                            }}
                        />
                    </View>
                    {
                        animalCategory === 'cow' ?

                            <View>
                                <View style={styles.radioButtonContainer}>
                                    <Button
                                        text={<AntDesign name="plus" size={24} color="white" />}
                                        color={showDropdown ? GlobalStyles.colors.primary800 : 'green'}
                                        onPress={() => { handleInputs('+1') }}
                                    />
                                    <Button
                                        text={<AntDesign name="minus" size={24} color="white" />}
                                        color={showDropdown ? GlobalStyles.colors.primary800 : 'green'}
                                        onPress={() => { handleInputs('-1') }}
                                    />
                                </View>
                                {[...Array(inputCount)].map((_, index) => (
                                    <View key={index}>
                                        <Input
                                            label={`Mayalanma Tarix ${index + 1}`}
                                            textinputConfig={{
                                                placeholder: 'İl-ay-gün',
                                                maxLength: 10,
                                                onChangeText: inputChangeHandler.bind(this, `insemination_date_${index + 1}`),
                                                value: inputs[`insemination_date_${index + 1}`]?.value || '',
                                            }}
                                        />
                                        <Input
                                            label={`Doğum Tarix ${index + 1}`}
                                            textinputConfig={{
                                                placeholder: 'İl-ay-gün',
                                                maxLength: 10,
                                                onChangeText: inputChangeHandler.bind(this, `birth_dates_${index + 1}`),
                                                value: inputs[`birth_dates_${index + 1}`]?.value || '',
                                            }}
                                        />
                                    </View>
                                ))}
                            </View>
                            :
                            <>
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
                                    label="Doğum Tarix"
                                    textinputConfig={{
                                        placeholder: 'İl-ay-gün',
                                        maxLength: 10,
                                        onChangeText: inputChangeHandler.bind(this, 'birthdate'),
                                        value: inputs.birthdate.value,
                                    }}
                                />
                            </>
                    }
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
                        selectGetWay !== 'Alınıb' ?
                            <>
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
                        selectedGender === 'Dişi' || animalCategory === 'cow' ?
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
                    {/* <Input
                        label='Uşaqlarının sayı'
                        textinputConfig={{
                            keyboardType: 'numeric',
                            onChangeText: inputChangeHandler.bind(this, 'child_count'),
                            value: inputs.child_count.value,
                        }}
                    /> */}
                    <View style={styles.radioButtonContainer}>
                        {mode === 'pending' && userData.role === 'master_admin' &&
                            (
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
                            )
                        }

                        {
                            mode !== 'pending' && id === undefined &&
                            (
                                <Button
                                    text='Təsdiq et'
                                    color='green'
                                    onPress={submitCow}
                                />
                            )
                        }

                        {
                            mode !== 'pending' && id !== undefined &&
                            (
                                <>
                                    <Button
                                        text='Təsdiq et'
                                        color='green'
                                        onPress={submitCow}
                                    />
                                    <Button
                                        text='Sil'
                                        color='red'
                                        onPress={() => deleteCow(id, 'animal')}
                                    />
                                    {showDropdown && (
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
                                    )}
                                    <Button
                                        text={<FontAwesome name="exchange" size={24} color="white" />}
                                        color={showDropdown ? GlobalStyles.colors.primary800 : 'green'}
                                        onPress={() => { setShowDropdown(!showDropdown) }}
                                    />
                                </>
                            )
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