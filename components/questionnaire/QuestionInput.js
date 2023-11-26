import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";

export default function QuestionInput() {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    const [clearInput, setClearInput] = useState(false);
  
    function addGoalHandler() {
      props.onAddGoal(enteredGoalText);
      setEnteredGoalText('');
    };
  
    function goalInputHandler(enteredText) {
      setEnteredGoalText(enteredText);
    };
  
    function clearInputHandler() {
      setEnteredGoalText('');
    };
  
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your course goal!"
          style={styles.textInput}
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button color='green' title="Add Goal" onPress={addGoalHandler} />
  
        <View style={styles.clearButtonContainer}>
            <Button color='red' title='  Clear  ' 
            onPress={clearInputHandler}
            />
        </View>
  
      </View>
    );
}