import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PhaseContext } from "../../phaseContext";
import { PhaseContextType } from "../../types";

interface Props {
  missionOutcome?: "success" | "failure";
}

const KillStatus: React.FC<Props> = ({ missionOutcome }) => {
  const { setPhaseInfo } = useContext(PhaseContext) as PhaseContextType;
  const boxColor = missionOutcome === "success" ? "green" : "red";
  const message = missionOutcome === "success" ? "Kill success" : "Kill fail";
  return (
    // <TouchableOpacity
    // style={[styles.box, { backgroundColor: boxColor }]}
    // onPress={() => {
    //     setPhaseInfo({ phase: 1 });
    // }}
    <View style={[styles.box, { backgroundColor: boxColor }]}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: "#add5f6",
    borderRadius: 10,
    margin: 2,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default KillStatus;
