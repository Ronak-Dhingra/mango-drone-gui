import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function RemainingFlightTime() {
  // const remainingFlightTim

  return (
    <TouchableOpacity style={styles.container}>
      {/* <Text style={styles.Text}> */}
        {/* Return to Home &nbsp; */}
        <FontAwesome name="home" size={18} color="white" />
      {/* </Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // button: {
  //   backgroundColor: '#add8e6',
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // text: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#add8e6",
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 9999,
  },
  Text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
});
