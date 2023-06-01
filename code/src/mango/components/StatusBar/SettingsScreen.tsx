import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, Dimensions, Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';
const SettingsIcon = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
  const [isLeftHandModeEnabled, setLeftHandModeEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English'); 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleDarkMode = () => {
    setDarkModeEnabled(!isDarkModeEnabled);
  };
  const toggleLeftHandMode = () => {
    setLeftHandModeEnabled(!isLeftHandModeEnabled);
  };
  const onLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
      <Ionicons name="settings-outline" size={24} color="white" />
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Dark Mode</Text>
              <Switch value={isDarkModeEnabled} onValueChange={toggleDarkMode} />
              </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Left Hand Mode</Text>
              <Switch value={isLeftHandModeEnabled} onValueChange={toggleLeftHandMode} />
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Language</Text>
              <Picker
                selectedValue={selectedLanguage}
                onValueChange={onLanguageChange}
                style={{ height: 50, width: 150 }}
              >
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Hindi" value="Hindi" />
                <Picker.Item label="Telugu" value="Telugu" />
              </Picker>
            </View>
            <TouchableOpacity onPress={toggleModal} style={styles.modalCloseButton}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: Dimensions.get('window').width - 40,
    maxHeight: Dimensions.get('window').height - 80,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  modalLabel: {
    fontSize: 16,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
  },
});

export default function SettingsScreen() {
  return (
    <View>
      <SettingsIcon />
    </View>
  );
}