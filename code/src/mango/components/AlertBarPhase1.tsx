import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SettingsScreen from "./StatusBar/SettingsScreen";
import Battery from "./StatusBar/Battery";

interface AlertBarProps {
  message: string;
}

const AlertBarPhase1: React.FC<AlertBarProps> = ({ message }) => {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.message}>{message}</Text>
    // </View>
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.settings}>
        {/* <Text style={styles.battery_alert}> Battery Low </Text> */}
        <Battery />
      </View>
      <View style={styles.settings}>
        <SettingsScreen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: "10%",
  //   backgroundColor: "black",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   zIndex: 1,
  // },
  // message: {
  //   color: "white",
  //   fontSize: 18,
  // },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "10%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    zIndex: 1,
  },
  message: {
    color: "white",
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    marginLeft: "10%"
  },
  settings: {
    flex: 0,
    marginRight: 10,
  },
  // battery_alert: {
  //   color: "red",
  // },

});

export default AlertBarPhase1;
