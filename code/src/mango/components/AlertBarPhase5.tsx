import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SettingsScreen from "./StatusBar/SettingsScreen";
import Battery from "./StatusBar/Battery";

interface AlertBarProps {
  //   message: string;
  outcome: "success" | "failure";
}

const AlertBarPhase5: React.FC<AlertBarProps> = ({ outcome }) => {
  const color = outcome === "success" ? "green" : "red";

  // return (
  //   <View style={[styles.container, { backgroundColor: color }]}>
  //     <SettingsScreen />
  //     <Text style={styles.message}>{outcome.toUpperCase()}</Text>
  //   </View>
  // )
  // return (
  //   <View style={[styles.container, { backgroundColor: color }]}>
  //     <View style={styles.settingsContainer}>
  //       <SettingsScreen />
  //     </View>
  //     <View style={styles.settingsContainer}>
  //       <Text style={styles.battery_alert}> Battery Low </Text>
  //     </View>
  //     <View style={styles.messageContainer}>
  //       <Text style={styles.outcome}>{outcome.toUpperCase()}</Text>
  //     </View>
  //   </View>
  // )
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text style={styles.message}>{outcome.toUpperCase()}</Text>
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

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1, // take up all the available horizontal space
//   //   flexDirection: "row",
//   //   alignItems: "center",
//   //   position: "absolute",
//   //   top: 0,
//   //   left: 0,
//   //   right: 0,
//   //   height: "10%",
//   //   zIndex: 1,
//   // },
//   container: {
//     flex: 1, // take up all the available horizontal space
//     flexDirection: "row-reverse",
//     alignItems: "center",
//     justifyContent: "center", // center vertically
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: "10%",
//     zIndex: 1,
//   },
//   settingsContainer: {
//     flex: 1,
//     alignItems: "flex-end",
//     paddingRight: 10,
//   },
//   outcome: {
//     color: "white",
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   // message: {
//   //   color: "white",
//   //   fontSize: 18,
//   //   fontWeight: "bold",
//   //   // alignSelf: "center",
//   //   position: "absolute",
//   //   left: "45%",
//   // },
//   messageContainer: {
//     flex: 2,
//     // width: "60%", 
//     alignItems: "center",
//   },
//   battery_alert: {
//     color: "red",
//   },

// });

const styles = StyleSheet.create({
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
    fontSize: 24,
    fontWeight: "bold",
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


export default AlertBarPhase5;
