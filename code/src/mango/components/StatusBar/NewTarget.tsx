import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PhaseContext } from "../../phaseContext";
import { PhaseContextType } from "../../types";

export default function NewTarget({disabled}) {
  const { setPhaseInfo } = useContext(PhaseContext) as PhaseContextType;
  const opacity = disabled ? 0.5 : 1;
  return (
    <TouchableOpacity
    disabled = {disabled}
      style={[styles.container, {opacity: opacity}]}
      onPress={() => {
        setPhaseInfo({ phase: 1 });
      }}
    >
      <Text style={styles.Text}>Select New Target</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#ffdb58",
    width : "95%",
    alignSelf : "center"
  },
  Text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
});