import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Input from "../UI/Input";
import Button from "../UI/Button";
import Dropdown from "../UI/Dropdown";
import RadioButton from "../UI/RadioButton";
import CustomCheckbox from "../UI/CustomCheckbox";
import { GlobalStyles } from "../../constants/styles";
import { addData, deleteData, updateData } from "../../util/http";

function ManageCow({ route }) {
    const { id, defaultValue, title, name, mode, pendingId } = route.params;
    const navigation = useNavigation();

    const [selectedGender, setSelectedGender] = useState(defaultValue ? defaultValue.gender : '');
    const [selectGetWay, setSelectGetWay] = useState(defaultValue ? defaultValue.how_get : '');
    const [showDropdown, setShowDropdown] = useState(false);
    const [animalCategory, setAnimalCategory] = useState(defaultValue ? defaultValue.type : '');
    const [userData, setUserData] = useState({ role: '', token: '', username: '' });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState('');

    const [selectedDateIndex, setSelectedDateIndex] = useState(null);

    const [inseminationData, setInseminationData] = useState([
        {
            insemination_date: defaultValue?.insemination_dates?.insemination_date || '',
            birth_dates: defaultValue?.insemination_dates?.birth_dates || '',
            birth_info: defaultValue?.insemination_dates?.birth_info || ''
        }
    ]);

    const [inputs, setInputs] = useState({
        id: {
            value: defaultValue ? defaultValue.id : 0,
            isValid: true
        },
        bilka_number: {
            value: defaultValue ? defaultValue.bilka_number : 0,
            isValid: true
        },
        name: {
            value: defaultValue ? defaultValue.name : '',
            isValid: true
        },
        weight: {
            value: defaultValue ? defaultValue.weight : 0,
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
        other_info: {
            value: defaultValue ? defaultValue.other_info : '',
            isValid: true
        },
        mother_bilka: {
            value: defaultValue ? defaultValue.mother_bilka : '',
            isValid: true
        },
        getFrom: {
            value: defaultValue ? defaultValue.getFrom : '',
            isValid: true
        },
        child_count: {
            value: defaultValue ? defaultValue.child_count : 0,
            isValid: true
        },
        last_checkup_date: {
            value: defaultValue ? defaultValue.last_checkup_date : '',
            isValid: true
        },
        categories: {
            value: defaultValue ? defaultValue.categories : '',
            isValid: true
        },
        sold_price: {
            value: defaultValue ? defaultValue.sold_price : 0,
            isValid: true
        },
        sold_to: {
            value: defaultValue ? defaultValue.sold_to : '',
            isValid: true
        },
        info: {
            value: defaultValue ? defaultValue.info : '',
            isValid: true
        },
        dead_reason: {
            value: defaultValue ? defaultValue.dead_reason : '',
            isValid: true
        },
        mode: {
            value: defaultValue ? defaultValue.mode : '',
            isValid: true
        },
        selected_insemination_date: {
            value: defaultValue ? defaultValue.selected_insemination_date : '',
            isValid: true
        }
    });

    useEffect(() => {
        if (defaultValue !== undefined) {

            name !== undefined ? setAnimalCategory(name) : ''
            animalCategory === 'İnək' ? setSelectedGender('Dişi') : ''
        }

        const loadUserData = async () => {
            const role = await AsyncStorage.getItem('role');
            const token = await AsyncStorage.getItem('token');
            const username = await AsyncStorage.getItem('username');
            const hide = await AsyncStorage.getItem('hide');
            setUserData({ role, token, username, hide });
        };
        loadUserData();

        if (defaultValue?.insemination_dates) {
            const parsedInseminationDates = JSON.parse(defaultValue.insemination_dates);
            setInseminationData(parsedInseminationDates.map(data => ({
                insemination_date: data.insemination_date || '',
                birth_dates: data.birth_dates || '',
                birth_info: data.birth_info || ''
            })));
        }
    }, defaultValue);

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            }
        })
    };

    async function submitDeadOrSold(id, tableName, status) {
        let endPoint = `${modalType}Animal/addAnimal`;
        let data = {};
        let response = '';

        try {
            if (inputs !== '') {
                data = {
                    id: inputs.id.value,
                    bilka_number: inputs.bilka_number.value,
                    name: inputs.name.value,
                    weight: inputs.weight.value,
                    gender: selectedGender,
                    birthdate: inputs.birthdate.value,
                    type: animalCategory,
                    categories: inputs.categories.value,
                    mother_bilka: inputs.mother_bilka.value,
                    insemination_data: inseminationData,
                    how_get: selectGetWay,
                    get_from: inputs.getFrom.value,
                    other_info: inputs.other_info.value,
                    last_checkup_date: inputs.last_checkup_date.value,
                    child_count: inseminationData.length,
                    info: inputs.info.value,
                    dead_reason: inputs.dead_reason.value,
                    sold_price: inputs.sold_price.value,
                    sold_to: inputs.sold_to.value,
                    username: userData.username,
                    role: userData.role,
                };

                if (modalType === '') endPoint = route.params.operation_type;
                response = await addData(endPoint, data);

                if (response.status === 201) {
                    navigation.navigate('Heyvanlar');
                    Alert.alert('', response.message);
                }
                else {
                    Alert.alert('Xəta', response.message);
                }
            } else {
                Alert.alert('Xəta', 'Zəhmət olmasa məlumatları daxil edin!');
            }
        } catch (error) {
            console.error('Error submitting cow data:', error);
            Alert.alert('Xəta', 'error');
        }
    };

    const submitAnimal = async () => {
        let endPoint = `${animalCategory}/add-${animalCategory}`;
        let data = {};
        let response = '';
        try {
            if (inputs) {
                data = {
                    bilka_number: inputs.bilka_number.value,
                    name: inputs.name.value,
                    weight: inputs.weight.value,
                    gender: selectedGender,
                    birthdate: inputs.birthdate.value,
                    type: animalCategory,
                    categories: inputs.categories.value,
                    mother_bilka: inputs.mother_bilka.value,
                    insemination_data: inseminationData,
                    selected_insemination_date: inputs.selected_insemination_date.value.slice(0, 10),
                    how_get: selectGetWay,
                    get_from: inputs.getFrom.value,
                    other_info: inputs.other_info.value,
                    last_checkup_date: inputs.last_checkup_date.value,
                    child_count: inseminationData.length,
                    username: userData.username,
                    role: userData.role,
                    actionType: ''
                };

                if (defaultValue?.id === undefined) {
                    endPoint = `${animalCategory}/add-${animalCategory}`;
                    response = await addData(endPoint, data);
                } else {
                    if (defaultValue.type !== animalCategory) {
                        data.actionType = 'changeCategory';
                        endPoint = `${animalCategory}/add-${animalCategory}`;
                        response = await addData(endPoint, data);
                        let status = `${defaultValue.type}/delete-${defaultValue.type}`;
                        deleteData(status, inputs.id.value, data);
                    } else {
                        const integerId = parseInt(defaultValue.id, 10);
                        endPoint = `${animalCategory}/update-${animalCategory}`;
                        response = await updateData(endPoint, integerId, data);
                    }
                }

                if (response.status === 201) {
                    navigation.navigate('Heyvanlar');
                    Alert.alert('', response.message);
                } else {
                    Alert.alert('Xəta', response.message);
                }
            } else {
                Alert.alert('Xəta', 'Zəhmət olmasa məlumatları daxil edin!');
            }
        } catch (error) {
            console.error('Error submitting cow data:', error);
            Alert.alert('Xəta', 'error');
        }
    };

    async function deleteAnimal(id, status) {
        let endPoint = status !== '' ? status : `${animalCategory}/delete-${animalCategory}`;
        let role = userData.role;
        const data = {
            bilka_number: inputs.bilka_number.value,
            name: inputs.name.value,
            weight: inputs.weight.value,
            gender: selectedGender,
            birthdate: inputs.birthdate.value,
            type: animalCategory,
            mother_bilka: inputs.mother_bilka.value,
            insemination_data: inseminationData,
            how_get: selectGetWay,
            get_from: inputs.getFrom.value,
            other_info: inputs.other_info.value,
            last_checkup_date: inputs.last_checkup_date.value,
            child_count: inseminationData.length,
            username: userData.username,
            role: userData.role,
        };

        try {
            let response = await deleteData(endPoint, id, data);
            if (mode === 'delete') {
                endPoint = 'pendingOperation/deleteOperation'
                await deleteData(endPoint, pendingId, data);
            }

            if (response.status === 200) {
                Alert.alert('Məlumat silindi');
                navigation.navigate('Heyvanlar', { refresh: true });
            } else if (response.status === 201) {
                Alert.alert('Əməliyyat təsdiq gözləyir');
                navigation.navigate('Gözləmə', { refresh: true });
            } else {
                Alert.alert('Xəta', response.message);
            }
        } catch (error) {
            console.error('Error deleting cow:', error);
            Alert.alert('Xəta', 'An error occurred while deleting the cow.');
        }
    }

    const addInseminationDate = () => {
        setInseminationData([...inseminationData, { insemination_date: '', birth_dates: '', birth_info: '' }]);
    };

    const removeInseminationDate = () => {
        if (inseminationData.length > 1) {
            setInseminationData(inseminationData.slice(0, -1));
        }
    };

    const handleInputChange = (index, field, value) => {
        const newData = [...inseminationData];
        newData[index][field] = value;
        setInseminationData(newData);
    };

    function modalVisibilty(status, type) {
        setModalVisible(status);
        setModalType(type)
    }

    const handleCheckboxChange = (index) => {
        const selectedInseminationDate = inseminationData[index].insemination_date;
        setSelectedDateIndex((prevIndex) => {

            if (prevIndex === index) {
                setInputs((prevInputs) => ({
                    ...prevInputs,
                    selected_insemination_date: { value: '', isValid: true }
                }));
                return null;
            }
            setInputs((prevInputs) => ({
                ...prevInputs,
                selected_insemination_date: { value: selectedInseminationDate, isValid: true }
            }));
            return index;
        });
    };

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
                            value: inputs.bilka_number.value.toString(),
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
                    <Input
                        label="Doğum Tarix"
                        textinputConfig={{
                            placeholder: 'gün-ay-il',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'birthdate'),
                            value: inputs.birthdate.value,
                        }}
                    />
                    <Text style={styles.label}>Heyvanın cins və növü</Text>
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
                                        text={<AntDesign name="plus" size={24} color={GlobalStyles.colors.primary800} />}
                                        onPress={addInseminationDate}
                                    />
                                    <Button
                                        text={<AntDesign name="minus" size={24} color={GlobalStyles.colors.primary800} />}
                                        onPress={removeInseminationDate}
                                    />
                                </View>

                                {inseminationData.map((data, index) => (
                                    <View key={index}>
                                        <Input
                                            label={`Mayalanma Tarix ${index + 1}`}
                                            textinputConfig={{
                                                placeholder: 'gün-ay-il',
                                                maxLength: 10,
                                                onChangeText: (value) => handleInputChange(index, 'insemination_date', value),
                                                value: data.insemination_date,
                                            }}
                                        />
                                        <CustomCheckbox
                                            label="Mayalanmanı təsdiq edin."
                                            isChecked={selectedDateIndex === index || (inputs.selected_insemination_date.value === data.insemination_date)}
                                            onToggle={() => handleCheckboxChange(index)}
                                        />
                                        <Input
                                            label={`Doğum Tarix ${index + 1}`}
                                            textinputConfig={{
                                                placeholder: 'gün-ay-il',
                                                maxLength: 10,
                                                onChangeText: (value) => handleInputChange(index, 'birth_dates', value),
                                                value: data.birth_dates,
                                            }}
                                        />
                                        <Input
                                            label={`Doğum haqqında əlavə məlumat ${index + 1}`}
                                            textinputConfig={{
                                                multiline: true,
                                                onChangeText: (value) => handleInputChange(index, 'birth_info', value),
                                                value: data.birth_info,
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

                            </>
                    }
                    <Text style={styles.label}>Heyvanın necə əldə olunub</Text>
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
                        selectGetWay === 'Alınıb' ?
                            <Input
                                label='Alındıqı yer və şəxs'
                                textinputConfig={{
                                    onChangeText: inputChangeHandler.bind(this, 'getFrom'),
                                    value: inputs.getFrom.value,
                                }}
                            /> :
                            <Input
                                label='Anasının bilka nömrəsi'
                                textinputConfig={{
                                    maxLength: 10,
                                    onChangeText: inputChangeHandler.bind(this, 'mother_bilka'),
                                    value: inputs.mother_bilka.value,
                                }}
                            />
                    }
                    <Input
                        label='Son yoxlanış tarixi'
                        textinputConfig={{
                            placeholder: 'gün-ay-il',
                            maxLength: 10,
                            onChangeText: inputChangeHandler.bind(this, 'last_checkup_date'),
                            value: inputs.last_checkup_date.value,
                        }}
                    />
                    <Input
                        label='Qarın'
                        textinputConfig={{
                            // keyboardType: 'number',
                            onChangeText: inputChangeHandler.bind(this, 'child_count'),
                            value: inputs.child_count.value,
                        }}
                    />
                    <Input
                        label='Heyvanın hazırki vəziyyəti'
                        textinputConfig={{
                            // multiline: true,
                            placeholder: 'Sağmal, Boğaz',
                            onChangeText: inputChangeHandler.bind(this, 'categories'),
                            value: inputs.categories.value,
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
                    {
                        route.params.operation_type === 'deadAnimal/addAnimal' &&
                        (
                            <Input
                                label="Ölüm səbəbi"
                                textinputConfig={{
                                    multiline: true,
                                    onChangeText: inputChangeHandler.bind(this, 'dead_reason'),
                                    value: inputs.dead_reason.value,
                                }}
                            />
                        )
                    }
                    {
                        route.params.operation_type === 'soldAnimal/addAnimal' &&
                        (
                            <>
                                <Input
                                    label="Qiymət"
                                    textinputConfig={{
                                        keyboardType: 'numeric',
                                        onChangeText: inputChangeHandler.bind(this, 'sold_price'),
                                        value: inputs.sold_price.value,
                                    }}
                                />
                                <Input
                                    label="Satıldıqı şəxs"
                                    textinputConfig={{
                                        onChangeText: inputChangeHandler.bind(this, 'sold_to'),
                                        value: inputs.sold_to.value,
                                    }}
                                />
                                <Input
                                    label='Satış məlumatlar'
                                    textinputConfig={{
                                        multiline: true,
                                        onChangeText: text => inputChangeHandler('info', text),
                                        value: inputs.info.value,
                                    }}
                                />
                            </>
                        )
                    }
                    <View style={styles.radioButtonContainer}>
                        {id === undefined && (
                            <Button
                                text='Təsdiq et'
                                color='green'
                                onPress={submitAnimal}
                            />
                        )}
                        {pendingId !== undefined && userData.role === 'master_admin' && (
                            <>
                                <Button
                                    text='Təsdiq et'
                                    color='green'
                                    onPress={() => deleteAnimal(id, `${animalCategory}/delete-${animalCategory}`)}
                                />
                                <Button
                                    text='Ləğv et'
                                    color='red'
                                    onPress={() => deleteAnimal(id, 'pendingOperation/deleteOperation')}
                                />
                            </>
                        )}

                        {
                            pendingId === undefined &&
                            (
                                <>
                                    <Button
                                        text='Təsdiq et'
                                        color='green'
                                        onPress={submitDeadOrSold}
                                    />
                                    <Button
                                        text='Sil'
                                        color='red'
                                        onPress={() => deleteAnimal(id, 'pendingOperation/deleteOperation')}
                                    />
                                </>
                            )
                        }
                    </View>
                </ScrollView>
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
                    <Input
                        label='Bilka nomresi'
                        textinputConfig={{
                            onChangeText: inputChangeHandler.bind(this, 'bilka_number'),
                            value: inputs.bilka_number.value.toString(),
                        }}
                    />
                    {
                        modalType === 'sold' ?
                            <>
                                <Input
                                    label="Qiymət"
                                    textinputConfig={{
                                        keyboardType: 'numeric',
                                        onChangeText: inputChangeHandler.bind(this, 'sold_price'),
                                        value: inputs.sold_price.value,
                                    }}
                                />
                                <Input
                                    label="Satıldıqı şəxs"
                                    textinputConfig={{
                                        onChangeText: inputChangeHandler.bind(this, 'sold_to'),
                                        value: inputs.sold_to.value,
                                    }}
                                />
                                <Input
                                    label='Əlavə məlumatlar'
                                    textinputConfig={{
                                        multiline: true,
                                        onChangeText: text => inputChangeHandler('info', text),
                                        value: inputs.info,
                                    }}
                                />
                            </>

                            :
                            <>
                                <Input
                                    label="Ölüm səbəbi"
                                    textinputConfig={{
                                        multiline: true,
                                        onChangeText: inputChangeHandler.bind(this, 'dead_reason'),
                                        value: inputs.dead_reason.value,
                                    }}
                                />
                            </>
                    }
                </View>
                <View style={styles.justifyContentRight}>
                    <Button
                        text='Təsdiq et'
                        onPress={submitDeadOrSold}
                        color='green'
                    />
                </View>
            </Modal>
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
        color: GlobalStyles.colors.green,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: GlobalStyles.colors.lightGreen,
        marginBottom: 4
    },
    radioButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    dropdonwBox: {
        width: '44%',
        alignItems: 'center',
        position: 'absolute',
        top: -47,
        backgroundColor: GlobalStyles.colors.green,
    }
})