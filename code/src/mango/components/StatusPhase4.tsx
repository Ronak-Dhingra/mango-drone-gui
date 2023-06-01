import { StyleSheet, ScrollView } from "react-native";
import SignalStrength from "./StatusBar/SignalStrength";
import Ammo from "./StatusBar/Ammo";
import Battery from "./StatusBar/Battery";
import RemainingFlightTime from "./StatusBar/RemainingFlightTime";
import ReturnToHome from "./StatusBar/ReturnToHome";
import NewTarget from "./StatusBar/NewTarget";
import DeselectDrone from "./StatusBar/DeselectDrone";
import Follow from "./StatusBar/Follow";
import Kill from "./StatusBar/Kill";
import Abort from "./StatusBar/Abort";
import NavigateToKill from "./StatusBar/NavigateToKill";
import { View, Text } from "./Themed";
import RadarSignalStrength from "./StatusBar/RadarSignalStrength";

export default function Status() {
  return (
    <>
      {/* <ScrollView> */}
        <View style={styles.container}>
          <View style={styles.icons}>
            <Text style={styles.title}>Status</Text>
            <View style={styles.signalcontainer}>
              <SignalStrength />
              <RadarSignalStrength />
            </View>
            <Ammo />
            <RemainingFlightTime />
          </View>
          <View style={styles.buttons}>
            <View style={styles.separator} />
            <Follow disabled = {false}/>
          {/* <Kill disabled = {true}/> */}
          <Abort disabled = {false}/>
          {/* <NewTarget disabled = {true}/> */}
          {/* <DeselectDrone disabled = {true}/> */}
          {/* <NavigateToKill disabled = {true}/> */}
          </View>
        </View>
      {/* </ScrollView> */}
          <ReturnToHome />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  icons: {
    padding: 10,
    backgroundColor: "#808080",
    alignContent: "center",
    width: "100%",
    height: "35%",
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  signalcontainer: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#808080",
    // paddingVertical: 5,
    // paddingHorizontal: 20,
    // backgroundColor: "#6ECBF5",
    // borderRadius: 10,
    // marginTop: 5,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    width: "100%",
    height: "45%",
    position: "relative",
    bottom: 0,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: '100%',
  },
});
