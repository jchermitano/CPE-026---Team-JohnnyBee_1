import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, Text, View, Switch, ScrollView, Pressable, Alert, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertMessage from "./alert/AlertMessage";

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

  useEffect(() => {
    const query = new Parse.Query("Alarm");
    query.equalTo("userId", Parse.User.current()); // Link the alarms to the current user
    query.find().then(results => {
      // If successful, update the alarms state with the fetched data
      const loadedAlarms = results.map(alarm => ({
        id: alarm.id,
        time: alarm.get("time").toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOn: alarm.get("isOn"),
      }));
      setAlarms(loadedAlarms);
    }).catch(error => {
      console.error('Error fetching alarms', error);
    });
  }, []);

  // Function to add alarm to Backend
  const addAlarmToBackend = (time, isOn) => {
    if (time) {
      const Alarm = new Parse.Object("Alarm");
      Alarm.set("userId", Parse.User.current());
      Alarm.set("time", time);
      Alarm.set("isOn", isOn);
      Alarm.save().then(alarm => {
        // If successful, update state with new alarm
        setAlarms([...alarms, {
          id: alarm.id,
          time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOn: isOn
        }]);
        Alert.alert('Success', 'Alarm has been set.');
      }).catch(error => {
        console.error('Error saving alarm', error);
      });
    }
  };

  // Add alarm when a time is picked in DateTimePicker
  const addAlarm = (time) => {
    const isAlarmOn = true; // by default when adding an alarm, we can set it to be ON
    addAlarmToBackend(time, isAlarmOn);
  };

  const toggleAlarm = (index) => {
    const updatedAlarms = [...alarms];
    updatedAlarms[index].isOn = !updatedAlarms[index].isOn;
    setAlarms(updatedAlarms);
  };

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const closeModal = () => {
    setModal1Visible(false);
    setModal2Visible(false);
  };

  const okmodal = () => {
    Alert.alert('Alarm Saved', 'Changes have been saved successfully.');
    setModal2Visible(false);
  };

  const handleContinue = () => {
    setModal2Visible(false);
  };

  const handleCancel = () => {
    console.log('Canceled...');
  };

  const onPressButton = () => {
    AlertMessage(handleContinue, handleCancel);
  };

  return (
    <View style={styles.container}>
      <Modal // modal 1: for settings and view analytics
        animationType="none"
        transparent={true}
        visible={modal1Visible}
        onRequestClose={() => {
          setModal1Visible(!modal1Visible);
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
      
      <Modal // modal 2: to modify alarm and questionnaires -------------------------------------
        animationType="none"
        transparent={true}
        visible={modal2Visible}
        onRequestClose={() => {
          setModal2Visible(!modal2Visible);
        }}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.centeredView2}>
            <View style={styles.modalView2}>
              <TouchableOpacity>
              {alarms.map((alarm, index) => (
          <View key={index} style={styles.alarmItem2}>
            <Text style={styles.alarmTime2}>{alarm.time}</Text>
          </View>
        ))}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button2]}
                onPress={() => navigation.navigate("Questions")}>
                <Text style={styles.textStyle2}>Add a Question</Text>
              </TouchableOpacity>
              <View style={styles.view}>
              <TouchableOpacity
                style={[styles.cancelButton]}
                onPress={onPressButton}>
                <Text style={styles.textStyle2}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.okButton]}
                onPress={okmodal}>
                <Text style={styles.textStyle2}>OK</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.option}>
        <TouchableOpacity onPress={() => setModal1Visible(!modal1Visible)}>
          <Icon name="menu" style={styles.menuIcon}/>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Alarm</Text>
      <ScrollView style={styles.alarmsContainer}>
        {alarms.map((alarm, index) => (
          <TouchableOpacity onPress={() => setModal2Visible(!modal2Visible)}>
          <View key={index} style={styles.alarmItem}>
            <Text style={styles.alarmTime}>{alarm.time}</Text>
            <Switch
              value={alarm.isOn}
              onValueChange={() => toggleAlarm(index)}
            />
          </View>
          </TouchableOpacity >
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
  view:{
    flexDirection: 'row',
    paddingLeft: 120,
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

  alarmItem2: { // for modal 2222222222222222222222222222222222222222222222
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    marginVertical: 5,
    marginHorizontal: 10
  },

  alarmTime2: { // for modal 2222222222222222222222222222222222222222222222
    fontSize: 60,
    color: "#6b4406",
    fontWeight: "bold",
  },

  addAlarmContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
    width: 50, 
    height: 50, 
    borderRadius: 50, 
    backgroundColor: "#b07c3b"
  },

  addIcon: {
    fontSize: 30,
    color: "black",
  },

  centeredView: {
    flex: 1,
    paddingLeft: 85,
        paddingTop:  80,
    alignItems: 'center',
    marginTop: 30,
  },
  centeredView2: { // for modal 2222222222222222222222222222222222222222222222
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  modalView: {
    margin: 20,
    justifyContent: "space-between",
    borderRadius: 20,
    padding:15,
    alignItems: 'center',
  },
  modalView2: { // for modal 2222222222222222222222222222222222222222222222
  margin: 20,
  width: 380,
  height: 550,
  marginTop: 170,
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
    borderColor: '#fff8d6',
    borderRadius: 15,
    paddingRight: 160,
    borderWidth:2,
    marginTop: 5,
  },
  cancelButton: {// for modal 2222222222222222222222222222222222222222222222
    backgroundColor: "#6b4406",
    paddingVertical: 10,
    width: 110,
    paddingHorizontal: 30,
    borderColor: '#fff8d6',
    borderRadius: 15,
    borderWidth:2,
    alignItems: 'center',
    marginTop: 5,
  },
  okButton: {// for modal 2222222222222222222222222222222222222222222222
    backgroundColor: "#b07c3b",
    paddingVertical: 10,
    width: 110,
    paddingHorizontal: 30,
    borderColor: '#fff8d6',
    borderRadius: 15,
    borderWidth:2,
    alignItems: 'center',
    marginTop: 5,
  },
  button1: {
    backgroundColor: "#fff8d6",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: '#fff8d6',
    borderRadius: 15,
    borderWidth:2,
    paddingLeft: 10,
    paddingRight: 120,
    marginTop: 5,
  },
  button2: {// for modal 2222222222222222222222222222222222222222222222
    backgroundColor: "#788f25",
    paddingVertical: 10,
    width: 220,
    paddingHorizontal: 30,
    borderColor: '#fff8d6',
    borderRadius: 15,
    borderWidth:2,
    alignItems: 'center',
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
  textStyle2: { // for modal 2222222222222222222222222222222222222222222222
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle: {
    color: 'black',
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
