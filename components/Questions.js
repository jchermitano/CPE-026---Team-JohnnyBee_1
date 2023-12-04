import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from '@rneui/themed';
import Parse from 'parse/react-native';

export default function Questions({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      const query = new Parse.Query('Question');
      try {
        const parseQuestions = await query.find();
        const fetchedQuestions = parseQuestions.map((q) => {
          const id = q.id;
          const text = q.get('text');
          const isChecked = q.get('isChecked');
          return { id, text, isChecked };
        });
        setQuestions(fetchedQuestions);
        // Set initial checkbox states
        const initialCheckboxStates = {};
        fetchedQuestions.forEach((q) => {
          initialCheckboxStates[q.id] = q.isChecked;
        });
        setCheckboxStates(initialCheckboxStates);
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch questions from backend.');
      }
    };

    fetchQuestions();
  }, []);

  // Handler to add a new question to the Parse database and update local state.
  const questionsHandler = async () => {
    if (!enteredQuestions.trim()) {
      Alert.alert('Error', 'Please enter a question.');
      return;
    }
  
    const newQuestion = new Parse.Object('Question');
    newQuestion.set('text', enteredQuestions);
    newQuestion.set('isChecked', false); // Assuming 'isChecked' is a field in your Parse class
  
    try {
      await newQuestion.save();
      setQuestions(prevQuestions => [
        ...prevQuestions,
        { id: newQuestion.id, text: enteredQuestions, isChecked: false }
      ]);
      setCheckboxStates(prevStates => ({
        ...prevStates,
        [newQuestion.id]: false,
      }));
      setEnteredQuestions('');
    } catch (error) {
      console.error('Error while saving the question:', error);
      Alert.alert('Error', `Could not save the question: ${error.message}`);
    }
  };

  // Handler to toggle the checkbox state for a question in the Parse database and update local state.
  const toggleCheckbox = async (questionId) => {
    // Update checkbox state locally
    const updatedCheckboxStates = {
      ...checkboxStates,
      [questionId]: !checkboxStates[questionId],
    };
    setCheckboxStates(updatedCheckboxStates);

    // Find the question in the local state, update its isChecked property, and save to Parse.
    const index = questions.findIndex((q) => q.id === questionId);
    const questionToToggle = questions[index];
    const parseQuestion = new Parse.Object('Question');
    parseQuestion.id = questionId;
    parseQuestion.set('isChecked', updatedCheckboxStates[questionId]);

    try {
      await parseQuestion.save();
    } catch (error) {
      Alert.alert('Error', 'Unable to update question status.');
    }
  };

  const handleCheckPress = () => {
    Alert.alert('Questions Saved', 'Changes have been saved successfully.');
    navigation.navigate("Dashboard");
  };

  const onClose = () => {
    navigation.navigate("Dashboard");
  };

  const [enteredQuestions, setEnteredQuestions] = useState('');
  const [questions, setQuestions] = useState([]);

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
      </View>
      <View style={styles.questionsContainer}>
      <View style={styles.view}>
  <ScrollView style={styles.inputContainer}>
    {questions.map((Questions) => (
      <Text key={Questions} style={[styles.questionStyle]}multiline>
        {Questions}
        <CheckBox
                style={styles.checkBox}
                checked={checkboxStates[Questions]}
                onPress={() => toggleCheckbox(Questions)}
                iconType="material-community"
                checkedIcon="checkbox-outline"
                uncheckedIcon={'checkbox-blank-outline'}
                checkedColor="#6b4406"
              />
      </Text>
      
    ))}
  </ScrollView>
  </View>
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
  view: {
    flexDirection: 'row',
  },
  checkBox: {
    marginLeft: 150,
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