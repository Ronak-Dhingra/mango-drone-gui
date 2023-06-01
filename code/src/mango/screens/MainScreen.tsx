import React, { useEffect, useState, createContext, useContext } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { View, Text } from "../components/Themed";
import { StyleSheet, StatusBar } from "react-native";
import Status1 from "../components/StatusPhase1";
import Status2 from "../components/StatusPhase2";
import Status3 from "../components/StatusPhase3";
import Status4 from "../components/StatusPhase4";
import Status5 from "../components/StatusPhase5";
import Status6 from "../components/StatusPhase6";
import { PhaseContext } from "../phaseContext";
import { DistanceContext } from "../distanceContext";
import { AntidroneSocketContext } from "../antidroneSocketContext";
import { GroundControlSocketContext } from "../groundControlSocketContext";
import Tabbed from "../components/Tabbed";
import AlertBarPhase1 from "../components/AlertBarPhase1";
import AlertBarPhase2 from "../components/AlertBarPhase2";
import AlertBarPhase3 from "../components/AlertBarPhase3";
import AlertBarPhase4 from "../components/AlertBarPhase4";
import AlertBarPhase5 from "../components/AlertBarPhase5";
import AlertBarPhase6 from "../components/AlertBarPhase6";
import { io } from "socket.io-client";
import { PhaseInfo } from "../types";
import { localIP } from "../localip";

export default function MainScreen() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const [phaseInfo, setPhaseInfo] = useState<PhaseInfo>({ phase: 1 });

  let Status = Status1;
  switch (phaseInfo.phase) {
    case 1:
      Status = Status1;
      break;
    case 2:
      Status = Status2;
      break;
    case 3:
      Status = Status3;
      break;
    case 4:
      Status = Status4;
      break;
    case 5:
      Status = Status5;
      break;
    case 6:
      Status = Status6;
      break;
    default:
      break;
  }
  const [distance, setDistance] = useState(undefined);

  let AlertBar = <AlertBarPhase1 message="Drone ready for Take-Off" />;
  switch (phaseInfo.phase) {
    case 1:
      AlertBar = <AlertBarPhase1 message="Drone ready for Take-Off" />;
      break;
    case 2:
      AlertBar = (
        <AlertBarPhase2
          message={
            distance === undefined ? "" : `Distance to Target: ${distance}m`
          }
        />
      );
      break;
    case 3:
      AlertBar = (
        <AlertBarPhase3
          message={
            distance === undefined ? "" : `Distance to Target: ${distance}m`
          }
        />
      );
      break;
    case 4:
      AlertBar = (
        <AlertBarPhase4
          message={
            distance === undefined ? "" : `Distance to Target: ${distance}m`
          }
        />
      );
      break;
    case 5:
      AlertBar = <AlertBarPhase5 outcome="success" />;
      break;
    case 6:
      AlertBar = <AlertBarPhase6 message="Recovery Priority: Low" />;
      break;
    default:
      break;
  }

  const [antidroneSocket, setAntidroneSocket] = useState(null);
  useEffect(() => {
    const socket = io(`http://${localIP}:8070`);
    setAntidroneSocket(socket);
    socket.on("killed", () => {
      setPhaseInfo((oldPhase) => ({
        phase: 5,
        targetID: oldPhase.targetID,
        killConfirmed: true,
      }));
    });
    return () => {
      socket.close();
      setAntidroneSocket(null);
    };
  }, []);

  const [groundControlSocket, setGroundControlSocket] = useState<any>(null);
  useEffect(() => {
    const socket = io(`http://${localIP}:8080`);
    setGroundControlSocket(socket);
    return () => {
      groundControlSocket && groundControlSocket.close();
    };
  }, []);
  return (
    <>
      <PhaseContext.Provider
        value={{
          phaseInfo,
          setPhaseInfo,
        }}
      >
        <DistanceContext.Provider value={setDistance}>
          <GroundControlSocketContext.Provider value={groundControlSocket}>
            <AntidroneSocketContext.Provider value={antidroneSocket}>
              <StatusBar hidden={true} />
              <View style={styles.container}>
                {AlertBar}
                <View style={styles.tabbed}>
                  <Tabbed />
                </View>

                <View style={styles.status}>
                  <Status />
                </View>
              </View>
            </AntidroneSocketContext.Provider>
          </GroundControlSocketContext.Provider>
        </DistanceContext.Provider>
      </PhaseContext.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  tabbed: {
    width: "70%",
    height: "90%",
    position: "absolute",
    top: "10%",
  },
  status: {
    width: "30%",
    height: "90%",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: "70%",
  },
});
