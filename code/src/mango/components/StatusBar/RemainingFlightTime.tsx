import React from "react";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "../Themed";

export default function RemainingFlightTime() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.Text}>Flight Time Left</Text> */}
      <FontAwesome name="plane" size={15} color="white" />
      <Text style={styles.Text}> : 20:00 </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    // marginTop: 5,
    backgroundColor: "#808080",
  },
  Text: {
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "white",
  },
});
