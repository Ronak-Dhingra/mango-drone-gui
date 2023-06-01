import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PhaseContext } from "../../phaseContext";
import { PhaseContextType } from "../../types";
import SwipeButton from "rn-swipe-button";
import { AntidroneSocketContext } from "../../antidroneSocketContext";

export default function Follow() {
  const { setPhaseInfo, phaseInfo } = useContext(
    PhaseContext
  ) as PhaseContextType;

  const antidroneSocket = useContext(AntidroneSocketContext);

  return (
    // <SwipeButton
    //   height={50}
    //   title="Swipe to Follow"
    //   titleStyles={{ color: "white", fontSize: 15, fontWeight: "bold" }}
    //   swipeSuccessThreshold={50}
    //   railBackgroundColor="blue"
    //   railBorderColor="blue"
    //   railFillBackgroundColor="#000080"
    //   railFillBorderColor="#000080"
    //   thumbIconBackgroundColor="#000080"
    //   thumbIconBorderColor="#000080"
    //   onSwipeSuccess={() => {
    //     setPhaseInfo({ phase: 3, targetID: phaseInfo.targetID });
    //     antidroneSocket.emit("chase", { targetID: phaseInfo.targetID });
    //   }}
    // />
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => {
        setPhaseInfo({ phase: 3, targetID: phaseInfo.targetID });
        antidroneSocket.emit("chase", { targetID: phaseInfo.targetID });
      }}
    >
      <Text style={styles.Text}>Follow</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 15,
    marginBottom: 5,
    backgroundColor: "blue",
  },
  Text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
