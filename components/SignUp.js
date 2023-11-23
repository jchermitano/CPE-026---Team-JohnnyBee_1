import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import Logo from "./Logo";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [usern, setUsern] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    // herp me
    alert("Sign up successful!");

    // Hump me 
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <Logo/>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#fff8d6"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#fff8d6"
        value={usern}
        onChangeText={(text) => setUsern(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#fff8d6"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>Already have an account? Log in here</Text>
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
  signUpButton: {
    backgroundColor: "#fff8d6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 5,
  },
  signUpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#b07c3b",
    textAlign: "center",
  },
  loginLink: {
    color: "#fff8d6",
    fontSize: 16,
    paddingTop: 10,
  },
  logostyle: {
    flex: 1,
  },
});