import { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";

function LoginScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curValues) => ({
      ...curValues,
      [inputIdentifier]: enteredValue,
    }));
    setError("");
  }

  async function login() {
    // if (!inputs.username || !inputs.password) {
    //   setError("Zəhmət olmasa boşluqları doldurun.");
    //   return;
    // }

    // try {
    //   const response = await axios.post("http://192.168.1.69:3000/auth/login", {
    //     username: inputs.username,
    //     password: inputs.password,
    //   });
    //   console.log(response);

    // if (response.status === 200) {
    navigation.replace("Naviqasiya");
    //   storeUserData(response.data);
    // }
    // } catch (error) {
    //   setError("İstifadəçi adı və ya parol yanlnışdır");
    //   console.log(error);
    // }
  }

  const storeUserData = async (userData) => {
    try {
      await AsyncStorage.setItem("role", userData.role);
      await AsyncStorage.setItem("token", userData.token);
      await AsyncStorage.setItem("username", userData.username);
    } catch (error) {
      Alert.alert("Məlumatı əldə edərkən xəta baş verdi:", error);
    }
  };

  return (
    <>
      <Text style={styles.title}>Farm Managment</Text>
      <View style={styles.container}>
        <Text style={styles.text}>
          Daxil olmaq üçün sizə təyin olunmuş istifadəçi adı və parolu daxil
          edin!
        </Text>
        {error !== "" ? (
          <Text style={{ ...styles.text, color: "red" }}>{error}</Text>
        ) : (
          ""
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="İstifadəçi adı"
            textinputConfig={{
              onChangeText: inputChangeHandler.bind(this, "username"),
              value: inputs.username,
            }}
          />

          <View style={styles.passwordContainer}>
            <View style={{ flex: 1 }}>
              <Input
                label="Parol"
                textinputConfig={{
                  onChangeText: inputChangeHandler.bind(this, "password"),
                  value: inputs.password,
                  secureTextEntry: !passwordVisible,
                }}
              />
            </View>
            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
              <Feather
                name={passwordVisible ? "eye-off" : "eye"}
                size={16}
                color={GlobalStyles.colors.primary800}
                style={styles.toggleText}
              />
            </Pressable>
          </View>
          <View style={{ alignItems: "center" }}>
            <Button text="Daxil ol" onPress={login} color="green" />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 70,
    justifyContent: "start",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: GlobalStyles.colors.green,
    textAlign: "center",
    marginTop: "20%",
  },
  text: {
    fontSize: 16,
    color: GlobalStyles.colors.gold,
    textAlign: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
  },
  toggleText: {
    margin: 8,
    marginTop: 10,
    color: GlobalStyles.colors.primary800,
    justifyContent: "center",
    alignItems: "center",
  },
});
