import { useEffect } from "react";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";
// import {
//   RNSerialport,
//   actions,
//   definitions,
// } from "react-native-usb-serialport";
// import { DeviceEventEmitter } from "react-native";

export default function Camera() {
  // useEffect(() => {
  //   DeviceEventEmitter.addListener(actions.ON_DEVICE_ATTACHED, () => {
  //     console.log("device attached");
  //   });

  //   DeviceEventEmitter.addListener(actions.ON_SERVICE_STARTED, () => {
  //     console.log("service started");
  //   });

  //   DeviceEventEmitter.addListener(actions.ON_CONNECTED, () => {
  //     console.log("connected");
  //   });
  //   RNSerialport.setInterface(-1); //default -1
  //   RNSerialport.setReturnedDataType(definitions.RETURNED_DATA_TYPES.HEXSTRING); //default INTARRAY
  //   RNSerialport.setAutoConnectBaudRate(9600);
  //   RNSerialport.setAutoConnect(true); // must be true for auto connect
  //   RNSerialport.startUsbService();
  // }, []);
  return (
    <View style={[styles.container, { marginTop: "10%" }]}>
      <Text style={styles.title}>Camera</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
