import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Battery() {
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIconIndex((iconIndex + 1) % icons.length);
    }, 500);

    return () => clearInterval(intervalId);
  }, [iconIndex]);

  const icons = [
    "battery-empty",
    "battery-quarter",
    "battery-half",
    "battery-three-quarters",
    "battery-full",
  ];

  return (
    <View style={styles.container}>
      {/* <Text style={styles.Text}>Battery: &nbsp;</Text> */}
      <FontAwesome name={icons[iconIndex]} size={24} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    // marginTop: 5,
    // backgroundColor: "#E0D9F6",
  },
  Text: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
});
