import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from '@rneui/themed';
import { ViewArrayTwoTone } from '@mui/icons-material';

export default function Questions({ navigation }) {
  const [checked, setChecked] = React.useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCheckPress = () => {
    Alert.alert('Questions Saved', 'Changes have been saved successfully.');
    navigation.navigate("Dashboard");
  };
  const onClose = () => {
    navigation.navigate("Dashboard");
  };

  const [enteredQuestions, setEnteredQuestions] = useState('');
  const [questions, setQuestions] = useState([]);

  function questionsHandler() {
    setQuestions((currentCourseGoals) =>[
      ...currentCourseGoals,
      enteredQuestions,
    ]);
    setEnteredQuestions('');
  };

  function questionInputHandler(enteredText) {
    setEnteredQuestions(enteredText);
  };
  const closeModal = () => {
    setModalVisible(false);

  };

  return(
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => navigation.navigate("Settings")}>
                <Text style={styles.textStyle}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button1]}
                onPress={() => navigation.navigate("Analytics")}>
                <Text style={styles.textStyle}>View Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
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
  style={[styles.input]}
  placeholder=""
  placeholderTextColor="#fff8d6"
  onChangeText={questionInputHandler}
  value={enteredQuestions}
/>

      <TouchableOpacity style={styles.button} onPress={questionsHandler}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
      </View >
      <View style={styles.questionsContainer}>
  <ScrollView style={styles.inputContainer}>
    {questions.map((Questions) => (
      <Text key={Questions} style={[styles.questionStyle]}multiline>
        {Questions}
        <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           iconType="material-community"
           checkedIcon="checkbox-outline"
           uncheckedIcon={'checkbox-blank-outline'}
         />
      </Text>

    ))}
  </ScrollView>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 16,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: '#485613',
  },
  checkBox: {
    paddingTop: 10,
  },
  questionsContainer: {
    height: 600, 
    marginBottom: 20,
  },  
  questionStyle:{
    fontWeight: '300',
    width: 340,
    fontSize: 20,
    color: 'white',
    backgroundColor: '#6b4406',
    borderWidth: 5,
    borderRadius: 12,
    borderColor: '#6b4406',
    padding: 3,
    paddingLeft: 20,
    marginLeft: 15,
    marginTop: 10,
  },
  inputContainer:{
    backgroundColor: '#788F25',
    borderRadius: 20,
    width: 370,
    marginLeft: 5,
    marginTop: 50,
    marginBottom: 50,
    height:400,
  },
  text:{
    paddingLeft: 20,
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
    color: "black",
    borderWidth: 1,
    fontSize: 10,
    borderRadius: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 20,
    marginBottom: 5,
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
    backgroundColor: '#788f25',
    width: 80,
    height: 30,
    borderWidth: 1,
  },
  addText: {
    color: "white",
    textAlign: "center",
    paddingTop: 5,
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