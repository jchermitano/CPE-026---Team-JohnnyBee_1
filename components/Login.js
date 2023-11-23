import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import Logo from "./Logo";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Yawa mano mano muna bhie

    if (email === "ss@example.com" && password === "wow") {

      navigation.navigate("Dashboard");
    } else {
      navigation.navigate("Dashboard");

      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <View style={styles.container}>
        <Logo styles={StyleSheet.logostyle}/>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff8d6"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff8d6"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signupLink}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    backgroundColor: '#485613',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "#b07c3b",
    backgroundColor: "#b07c3b",
    color: "#fff8d6",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#fff8d6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 5,
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#b07c3b",
    textAlign: "center",
  },
  signupLink: {
    color: "#fff8d6",
    fontSize: 16,
    paddingTop: 10,
  },
  logostyle: {
    flex: 1,
  },
});
