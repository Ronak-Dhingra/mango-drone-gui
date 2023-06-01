import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PhaseContext } from "../../phaseContext";
import { PhaseContextType } from "../../types";
import SwipeButton from "rn-swipe-button";
import { AntidroneSocketContext } from "../../antidroneSocketContext";

export default function Kill({ disabled }) {
  const { setPhaseInfo, phaseInfo } = useContext(
    PhaseContext
  ) as PhaseContextType;
  const antidroneSocket = useContext(AntidroneSocketContext);
  // const opacity = disabled ? 0.5 : 1;
  return (
    // <SwipeButton
    //   disabled={disabled}
    //   height={50}
    //   title="Swipe to Kill"
    //   railBackgroundColor="red"
    //   railBorderColor="red"
    //   swipeSuccessThreshold={50}
    //   titleColor="white"
    //   railFillBackgroundColor="#800000"
    //   railFillBorderColor="#800000"
    //   thumbIconBackgroundColor="#800000"
    //   thumbIconBorderColor="#800000"
    //   titleStyles={{ color: "white", fontSize: 15, fontWeight: "bold" }}
    //   onSwipeSuccess={() => {
    //     setPhaseInfo({ phase: 4, targetID: phaseInfo.targetID });
    //     antidroneSocket.emit("kill", { targetID: phaseInfo.targetID });
    //   }}
    // />
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => {
        setPhaseInfo({ phase: 4, targetID: phaseInfo.targetID });
        antidroneSocket.emit("kill", { targetID: phaseInfo.targetID });
      }}
    >
      <Text style={styles.Text}>Kill</Text>
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
    backgroundColor: "red",
  },
  Text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
