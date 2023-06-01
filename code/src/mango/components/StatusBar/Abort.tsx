import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PhaseContext } from "../../phaseContext";
import { PhaseContextType } from "../../types";
import SwipeButton from "rn-swipe-button";
import { AntidroneSocketContext } from "../../antidroneSocketContext";

export default function Abort() {
  const { setPhaseInfo } = useContext(PhaseContext) as PhaseContextType;
  const antidroneSocket = useContext(AntidroneSocketContext);

  return (
    // <SwipeButton
    //   height={50}
    //   // enableReverseSwipe
    //   title="Swipe to Abort"
    //   titleColor="white"
    //   swipeSuccessThreshold={50}
    //   railBackgroundColor="green"
    //   railBorderColor="green"
    //   railFillBackgroundColor="#013220"
    //   railFillBorderColor="#013220"
    //   thumbIconBackgroundColor="#013220"
    //   thumbIconBorderColor="#013220"
    //   titleStyles={{ color: "white", fontSize: 15, fontWeight: "bold" }}
    //   onSwipeSuccess={() => {
    //     setPhaseInfo({ phase: 1 });
    //     antidroneSocket.emit("abort");
    //   }}
    // />
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => {
        setPhaseInfo({ phase: 1 });
        antidroneSocket.emit("abort");
      }}
    >
      <Text style={styles.Text}>Abort</Text>
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
    backgroundColor: "green",
  },
  Text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
});
