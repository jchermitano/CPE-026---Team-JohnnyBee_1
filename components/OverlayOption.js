import React, { useState } from "react";
import { StyleSheet, Modal, Text, View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const OverlayOption = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
      setModalVisible(false);
    };

    const settinghandler = () => {
        navigation.navigate("Settings");
    };

    const analytichandler = () => {
        navigation.navigate("Analytics");
    };

    return(
    <View>
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
                  onPress={settinghandler}>
                  <Text style={styles.textStyle}>Settings</Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  style={[styles.button1]}
                  onPress={analytichandler}>
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
    </View>
    )
}

export default OverlayOption;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        paddingLeft: 85,
        paddingTop:  80,
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
    buttonOpen: {
        color: '#fff8d6',
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        color: '#fff8d6',
        backgroundColor: '#2196F3',
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
})
