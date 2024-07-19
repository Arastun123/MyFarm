import { ScrollView, StyleSheet, Text, TextInput, View, Button } from "react-native";
import Input from "./UI/Input";
import { GlobalStyles } from "../constants/styles";
import { useState } from "react";
import { getFormatedDate } from "../util/date";


function ManageCow({ route, defaultValues }) {
    const [inputs, setInputs] = useState({
        number: {
            value: defaultValues ? defaultValues.number.toString() : '',
            isValid: true 
        },
        name: {
            value: defaultValues ? defaultValues.name :'',
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
            value: defaultValues ? defaultValues.milk.toString() :'',
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
    });

    const { id, title } = route.params;

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: {value: enteredValue, isValid: true},
            }
        })
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
                    <Text>cins (radio)</Text>
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
                    <Text>Nece elde edilib</Text>
                    <TextInput placeholder="Alinibsa alindiqi qiymet veya elave melumat" />
                    <TextInput placeholder="Mayalanma olubsa anasının bilka nomrese" />
                    <TextInput placeholder="Erkeyin bilka nomresi" />
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
                    <Button 
                        title='Təsdiq et'
                    />
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
    }
})