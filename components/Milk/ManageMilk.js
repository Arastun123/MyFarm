import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Alert, ScrollView } from "react-native";

import Input from "../UI/Input";
import { getFormatedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { addData, deleteData, updateData } from "../../util/http";
import { useNavigation } from "@react-navigation/native";
import Button from "../UI/Button";

function ManageMilk({ route }) {
  const { id, operation_type, pendingId, defaultValue, target_table } =
    route.params;
  const navigation = useNavigation();

  const today = getFormatedDate(new Date());
  const [userData, setUserData] = useState({
    role: "",
    token: "",
    username: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [inputs, setInputs] = useState({
    id: defaultValue ? defaultValue.id : null,
    date: defaultValue ? defaultValue.date : today,
    morning: defaultValue ? defaultValue.morning : 0,
    night: defaultValue ? defaultValue.night : 0,
    total: defaultValue ? defaultValue.total : 0,
    used_milk: defaultValue ? defaultValue.used_milk : 0,
    sold_to: defaultValue ? defaultValue.sold_to : "",
    quantity: defaultValue ? defaultValue.quantity : 0,
    price: defaultValue ? defaultValue.price : 0,
    other_info: defaultValue ? defaultValue.other_info : "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      const role = await AsyncStorage.getItem("role");
      const token = await AsyncStorage.getItem("token");
      const username = await AsyncStorage.getItem("username");
      const hide = await AsyncStorage.getItem("hide");
      setUserData({ role, token, username, hide });
    };
    loadUserData();
  }, []);

  function calcMilkQuantity(updatedInputs) {
    let total = 0;
    if (target_table === "milk") {
      const morning = +updatedInputs.morning;
      const night = +updatedInputs.night;
      const used_milk = +updatedInputs.used_milk;
      total = morning + night - used_milk;
    }
    if (target_table === "soldmilk") {
      const quantity = +updatedInputs.quantity;
      const price = +updatedInputs.price;
      total = quantity * price;
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      total: total.toString(),
    }));
  }

  function inputChangeHandler(inputName, text) {
    if (inputName === "startDate" || inputName === "endDate") {
      setFilterDate((prevFilterDate) => ({
        ...prevFilterDate,
        [inputName]: text,
      }));
    } else {
      const updatedInputs = {
        ...inputs,
        [inputName]: text,
      };
      setInputs(updatedInputs);
      calcMilkQuantity(updatedInputs);
    }
  }

  async function addMilkReport() {
    let endpoint = `${target_table}/add-${target_table}`;

    const data = {
      id: inputs.id,
      date: inputs.date,
      sold_to: inputs.sold_to,
      quantity: inputs.quantity,
      total: inputs.total,
      price: inputs.price,
      morning: inputs.morning,
      night: inputs.night,
      used_milk: inputs.used_milk,
      other_info: inputs.other_info,
      username: userData.username,
      role: userData.role,
    };

    let response = "";
    try {
      if (defaultValue === undefined) {
        response = await addData(endpoint, data);
      } else {
        endpoint = `${target_table}/update-${target_table}`;
        response = await updateData(endpoint, inputs.id, data);
        if (operation_type === `${target_table}/update-${target_table}`) {
          url = "pendingOperation/deleteOperation";
          deleteData(url, pendingId, data);
        }
      }
      if (response.status === 201) {
        Alert.alert("", response.message);
        endpoint = "residualMilk/update-residual_milk";
        let resId = 1;
        let resData = { date: inputs.date };
        updateData(endpoint, resId, resData);
        navigation.goBack();
      } else {
        Alert.alert("Xəta", response.message);
      }
      setErrorMessage("");
    } catch (error) {
      Alert.alert("Məlumatı əlavə edərkən xəta baş verdi:", error);
    }
  }

  async function deleteMilkReport() {
    let url = `${target_table}/delete-${target_table}`;
    let response = "";
    const data = {
      id: inputs.id,
      date: inputs.date,
      morning: inputs.morning,
      night: inputs.night,
      total: inputs.total,
      used_milk: inputs.used_milk,
      other_info: inputs.other_info,
      username: userData.username,
      role: userData.role,
    };

    try {
      response = await deleteData(url, inputs.id, data);
      if (operation_type === `${target_table}/delete-${target_table}`) {
        url = "pendingOperation/deleteOperation";
        deleteData(url, pendingId, data);
      }
      if (response.status === 200 || response.status === 201) {
        Alert.alert("", response.message);
        endpoint = "residualMilk/update-residual_milk";
        let resId = 1;
        let resData = { date: inputs.date };
        updateData(endpoint, resId, resData);
        navigation.goBack();
      } else {
        Alert.alert("Xəta", response.message);
      }
    } catch (error) {
      Alert.alert("Məlumatı əlavə edərkən xəta baş verdi:", error);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Tarix"
            textinputConfig={{
              placeholder: "İl-ay-gün",
              maxLength: 10,
              onChangeText: (text) => inputChangeHandler("date", text),
              value: inputs.date,
            }}
          />
          {target_table === "milk" ? (
            <>
              <Input
                label="Səhər süd miqdarı"
                textinputConfig={{
                  placeholder: "Litr",
                  keyboardType: "numeric",
                  maxLength: 10,
                  onChangeText: (text) => inputChangeHandler("morning", text),
                  value: inputs.morning,
                }}
              />
              <Input
                label="Axşam süd miqdarı"
                textinputConfig={{
                  placeholder: "Litr",
                  keyboardType: "numeric",
                  maxLength: 10,
                  onChangeText: (text) => inputChangeHandler("night", text),
                  value: inputs.night,
                }}
              />
              <Input
                label="İstifadə olunan süd miqdarı"
                textinputConfig={{
                  maxLength: 10,
                  keyboardType: "numeric",
                  onChangeText: (text) => inputChangeHandler("used_milk", text),
                  value: inputs.used_milk,
                }}
              />
              <Input
                label="Cəmi"
                textinputConfig={{
                  maxLength: 10,
                  keyboardType: "numeric",
                  onChangeText: (text) => inputChangeHandler("total", text),
                  value: inputs.total,
                }}
              />
            </>
          ) : (
            <>
              <Input
                label="Alan şəxs"
                textinputConfig={{
                  onChangeText: (text) => inputChangeHandler("sold_to", text),
                  value: inputs.sold_to,
                }}
              />
              <Input
                label="Miqdarı"
                textinputConfig={{
                  keyboardType: "numeric",
                  onChangeText: (text) => inputChangeHandler("quantity", text),
                  value: inputs.quantity,
                }}
              />
              <Input
                label="Qiyməti"
                textinputConfig={{
                  keyboardType: "numeric",
                  onChangeText: (text) => inputChangeHandler("price", text),
                  value: inputs.price,
                }}
              />
              <Input
                label="Alınacaq məbləğ"
                textinputConfig={{
                  keyboardType: "numeric",
                  onChangeText: (text) => inputChangeHandler("total", text),
                  value: inputs.total.toString(),
                }}
              />
            </>
          )}

          <Input
            label="Əlavə məlumat"
            textinputConfig={{
              multiline: true,
              onChangeText: (text) => inputChangeHandler("other_info", text),
              value: inputs.other_info,
            }}
          />
        </ScrollView>
        <View style={styles.radioButtonContainer}>
          {operation_type === "soldMilk/delete-soldMilk" ||
            (operation_type === "milk/delete-milk" &&
              userData.role === "master_admin" && (
                <>
                  <Button
                    text="Təsdiq et"
                    onPress={deleteMilkReport}
                    color={GlobalStyles.colors.green}
                  />
                  {defaultValue ? (
                    <>
                      <Button
                        text="Sil"
                        color="red"
                        onPress={deleteMilkReport}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </>
              ))}
          {operation_type === "soldMilk/update-soldMilk" ||
            (operation_type === "milk/update-milk" &&
              userData.role === "master_admin" && (
                <>
                  <Button
                    text="Təsdiq et"
                    onPress={addMilkReport}
                    color={GlobalStyles.colors.green}
                  />
                  <Button text="Sil" color="red" onPress={deleteMilkReport} />
                </>
              ))}
          {operation_type !== "" ||
            (operation_type !== "" && userData.role !== "master_admin" && (
              <>
                <Button
                  text="Təsdiq et"
                  onPress={deleteMilkReport}
                  color={GlobalStyles.colors.green}
                />
                <Button text="Sil" color="red" onPress={deleteMilkReport} />
              </>
            ))}
          {defaultValue === undefined && (
            <Button
              text="Təsdiq et"
              onPress={addMilkReport}
              color={GlobalStyles.colors.green}
            />
          )}
          {defaultValue !== "" ||
            operation_type === "" ||
            (operation_type === "" && (
              <>
                <Button
                  text="Təsdiq et"
                  onPress={addMilkReport}
                  color={GlobalStyles.colors.green}
                />
                <Button text="Sil" color="red" onPress={deleteMilkReport} />
              </>
            ))}
        </View>
      </View>
    </>
  );
}

export default ManageMilk;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  flatList: {
    // flex: 1,
    backgroundColor: "#fff",
  },

  modalContent: {
    paddingHorizontal: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    color: GlobalStyles.colors.lightGreen,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },
});
