import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Ammo() {
  const [icon2Color, setIcon2Color] = useState("black");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIcon2Color(icon2Color === "white" ? "#999" : "white");
    }, 500);

    return () => clearInterval(intervalId);
  }, [icon2Color]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.Text}>Ammo: </Text> */}
      <FontAwesome5 name="battle-net" size={24} color="white" style={{ marginRight: 10 }} />
      <FontAwesome5 name="battle-net" size={24} color={icon2Color} />
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
    // backgroundColor: "#C252E1",
  },
  Text: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
});
