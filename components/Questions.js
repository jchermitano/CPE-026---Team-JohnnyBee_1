import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import QuestionItems from './questionnaire/QuestionItems';
import QuestionInput from './questionnaire/QuestionInput';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Questions({ navigation }) {
  const handleCheckPress = () => {
    Alert.alert('Settings Saved', 'Changes have been saved successfully.');
    navigation.navigate("Dashboard");
  };
  const onClose = () => {
    navigation.navigate("Dashboard");
  };

  return(
    <View style={styles.container}>
      <View style={styles.icon}>
        <TouchableOpacity style={styles.addAlarmContainer} onPress={onClose}>
          <Icon name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addAlarmContainer} onPress={handleCheckPress}>
          <Icon name="check" style={styles.checkIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Questions</Text>

      <Text style={styles.text}>Add a New Question:</Text>
      <View style={styles.quest}>
      <TextInput
        style={styles.input}
        placeholder=""
        placeholderTextColor="#fff8d6"
        />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.addeText}>Add</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#485613',
  },
  text:{
    paddingLeft: 30,
    fontSize: 12,
    color: "#fff8d6",
  },
  quest: {
    flexDirection: "row",
  },
  input: {
    width: 250,
    height: 30,
    borderColor: "#fff8d6",
    backgroundColor: "#fff8d6",
    color: "#fff8d6",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  button:{
    borderRadius: 50,
    marginLeft: 20,
    borderColor: '#788f25',
    width: 60,
    height: 30,
    borderWidth: 1,
  },
  closeIcon: {
    fontSize: 30,
    color: "white",
    paddingLeft: 20,
  },
  checkIcon: {
    fontSize: 30,
    color: "white",
    paddingLeft: 280,
  },
  icon: {
    flexDirection: "row",
    paddingTop: 30,
  },
});