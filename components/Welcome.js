import React, { useState } from "react";
import { StyleSheet, Modal, Text, View, Switch, ScrollView, Pressable, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Welcome({ navigation }) {
  const [alarms, setAlarms] = useState([]);
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const showTimePicker = () => setTimePickerVisible(true);

  const hideTimePicker = () => setTimePickerVisible(false);

  const handleTimeConfirm = (time) => {
    setSelectedTime(time);
    addAlarm(time); 
    hideTimePicker();
  };

  const addAlarm = (time) => {
    if (time) {
      const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const newAlarm = { time: formattedTime, isOn: isAlarmOn };
      setAlarms([...alarms, newAlarm]);
      setSelectedTime(null);
    }
  };

  const toggleAlarm = (index) => {
    const updatedAlarms = [...alarms];
    updatedAlarms[index].isOn = !updatedAlarms[index].isOn;
    setAlarms(updatedAlarms);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
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
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate("Settings")}>
                <Text style={styles.textStyle}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button1, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>View Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
      <View style={styles.option}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="menu" style={styles.menuIcon}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Alarm</Text>
      <ScrollView style={styles.alarmsContainer}>
        {alarms.map((alarm, index) => (
          <View key={index} style={styles.alarmItem}>
            <Text style={styles.alarmTime}>{alarm.time}</Text>
            <Switch
              value={alarm.isOn}
              onValueChange={() => toggleAlarm(index)}
            />
          </View>
        ))}
      </ScrollView>
      <Pressable style={styles.addAlarmContainer} onPress={showTimePicker}>
        <Icon name="add" style={styles.addIcon} />
      </Pressable>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#485613",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  alarmsContainer: {
    flex: 1,
    backgroundColor: '#788F25',
    borderRadius: 20
  },

  alarmItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#b07c3b",
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    marginVertical: 5,
    marginHorizontal: 10
  },

  alarmTime: {
    fontSize: 24,
    color: "white",
  },

  addAlarmContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    borderRadius: 50, // Half of the width and height for a circle
    backgroundColor: "#b07c3b"
  },

  addIcon: {
    fontSize: 30,
    color: "black",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff8d6',
  },

  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff8d6",
    borderRadius: 10,
  },

  centeredView: {
    flex: 1,
    paddingLeft: 110,
    paddingTop:  100,
    alignItems: 'center',
    marginTop: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff8d6',
    justifyContent: "space-between",
    borderRadius: 20,
    padding:15,
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#fff8d6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    paddingLeft: 10,
    borderRadius: 20,
    paddingRight: 120,
    marginTop: 5,
  },
  button1: {
    backgroundColor: "#fff8d6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 80,
    marginTop: 5,
  },
  buttonOpen: {
    color: '#fff8d6',
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    color: '#fff8d6',
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  option: {
    paddingLeft: 150,
    flexDirection: "row",
  },
  optionStyle: {
    paddingLeft: 120,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  menuIcon: {
    fontSize: 40,
    color: "white",
    paddingLeft: 170,
  },
});
