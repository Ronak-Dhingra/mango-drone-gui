import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SignalStrengthIcon from "./SignalStrengthIcon";

export default function SignalStrength() {
  const [signalStrength, setSignalStrength] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSignalStrength((signalStrength + 1) % 5);
    }, 500);

    return () => clearInterval(intervalId);
  }, [signalStrength]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.Text}>Drone Signal Strength: </Text> */}
      <SignalStrengthIcon signalStrength={signalStrength} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    // paddingVertical: 5,
    paddingHorizontal: 20,
    // backgroundColor: "#6ECBF5",
    borderRadius: 10,
    // marginLeft: 65,
    // marginRight: 30,
    // marginTop: 5,
  },
  Text: {
    fontSize: 15,
    fontWeight: "bold",
    // marginLeft: 10,
    color: "white",
  },
});
