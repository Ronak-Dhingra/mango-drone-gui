import { useEffect, useRef, useState, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { PhaseContext } from "../phaseContext";
import { PhaseContextType } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Magnetometer } from "expo-sensors";
import { Subscription } from "expo-screen-orientation";
import { DistanceContext } from "../distanceContext";
import { AntidroneSocketContext } from "../antidroneSocketContext";
import { GroundControlSocketContext } from "../groundControlSocketContext";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";

const _angle = (magnetometer) => {
  let angle = 0;
  if (magnetometer) {
    let { x, y, z } = magnetometer;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(y, x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
    }
  }
  return Math.round(angle);
};

function radiansToDegrees(angle: number) {
  return angle * (180 / Math.PI);
}

function degreesToRadians(angle: number) {
  return angle * (Math.PI / 180);
}

function latitudesToKM(latitudes: number) {
  return latitudes * 110.574;
}

function kMToLatitudes(km: number) {
  return km / 110.574;
}

function longitudesToKM(longitudes: number, atLatitude: number) {
  return longitudes * 111.32 * Math.cos(degreesToRadians(atLatitude));
}

function kMToLongitudes(km: number, atLatitude: number) {
  return (km * 0.0089831) / Math.cos(degreesToRadians(atLatitude));
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const coordinates = require("./coordinates.json");

export default function Map() {
  const ref = useRef<MapView | null>(null);

  const [threatLocations, setThreatLocations] = useState([]);
  const [initialLock, setInitialLock] = useState(true);

  const [nonthreatLocations, setNonThreatLocations] = useState([]);

  const [antidroneLocation, setAntidroneLocation] = useState(null);

  const [locked, setLocked] = useState<"antidrone" | "user" | null>(null);

  const { setPhaseInfo, phaseInfo } = useContext(
    PhaseContext
  ) as PhaseContextType;

  const setDistance = useContext(DistanceContext);

  const antidroneSocket = useContext(AntidroneSocketContext);
  const groundControlSocket = useContext(GroundControlSocketContext);
  useEffect(() => {
    if (groundControlSocket === null) return;
    groundControlSocket.on("groundControlUpdate", (update) => {
      setThreatLocations(update["threatLocations"]);
      setNonThreatLocations(update["nonthreatLocations"]);
    });
  }, [groundControlSocket]);

  useEffect(() => {
    if (antidroneSocket === null) return;
    antidroneSocket.on("antidroneUpdate", (update) => {
      setAntidroneLocation(update["antidroneLocation"]);
    });
  }, [antidroneSocket]);

  const [userLocation, setUserLocation] =
    useState<null | Location.LocationObject>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setUserLocation(() => {
        setInitialLock(true);
        return location;
      });
    })();
    const interval = setInterval(async () => {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setUserLocation(location);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const [heading, setHeading] = useState(0);
  useEffect(() => {
    if (phaseInfo.targetID !== undefined) {
      threatLocations.forEach((element) => {
        if (element.id === phaseInfo.targetID) {
          setDistance(
            Math.round(
              getDistanceFromLatLonInKm(
                element.latitude,
                element.longitude,
                antidroneLocation.latitude,
                antidroneLocation.longitude
              ) * 1000
            )
          );
        }
      });
    }
    if (initialLock && userLocation !== null) {
      ref?.current?.animateToRegion(
        {
          latitude: userLocation?.coords.latitude,
          longitude: userLocation?.coords.longitude,
          latitudeDelta: kMToLatitudes(0.1),
          longitudeDelta: kMToLongitudes(0.1, userLocation?.coords.latitude),
        },
        0.1
      );
      setInitialLock(false);
    }

    if (locked == "user")
      ref?.current?.animateCamera(
        {
          heading: heading,
          center: {
            latitude: userLocation?.coords.latitude,
            longitude: userLocation?.coords.longitude,
          },
        },
        0.05
      );
    else if (locked === "antidrone")
      ref?.current?.setCamera(
        {
          heading: heading,
          center: {
            latitude: antidroneLocation?.latitude,
            longitude: antidroneLocation?.longitude,
          },
        },
        0.05
      );
    else if (locked === null)
      ref?.current?.animateCamera({
        heading: heading,
      });
  }, [
    locked === "user"
      ? userLocation
      : locked === null
      ? undefined
      : antidroneLocation,
    heading,
  ]);

  useEffect(() => {
    const listener = Magnetometer.addListener(async (result) => {
      if (result) {
        const newHeading = _angle(result);
        setHeading(newHeading);
      }
    });
    return () => listener.remove();
  }, []);
  // const _unsubscribe = () => {
  //   subscription && subscription.remove();
  //   setSubscription(null);
  // };
  // useEffect(() => {
  //   _subscribe();
  //   return () => _unsubscribe();
  // }, []);

  const homeBase = coordinates.homeBase;
  const chargingStation = coordinates.chargingStation;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={ref}
        style={styles.map}
        scrollEnabled={locked === null}
        mapType="satellite"
        rotateEnabled={false}
        onDoublePress={() => {
          setPhaseInfo({ phase: 1 });
        }}
      >
        {nonthreatLocations.map((coord) => {
          return (
            <Marker
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={coord}
              key={coord.id}
              // tracksViewChanges={false}
              tracksInfoWindowChanges={false}
              pinColor="#90EE90"
              style={{ backgroundColor: "#90EE90" }}
            >
              <FontAwesome name="plane" size={25} color="black" />
            </Marker>
          );
        })}
        {antidroneLocation !== null ? (
          <Marker
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={antidroneLocation}
            key={"antidrone"}
            // tracksViewChanges={false}
            tracksInfoWindowChanges={false}
            pinColor="green"
            style={{ backgroundColor: "#90EE90" }}
          >
            <FontAwesome name="star" size={25} color="black" />
          </Marker>
        ) : null}

        <Marker
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={homeBase}
          // tracksViewChanges={false}
          tracksInfoWindowChanges={false}
          key={"Home"}
          pinColor="#873260"
          style={{ backgroundColor: "#90EE90" }}
        >
          <FontAwesome name="home" size={27} color="#873260" />
        </Marker>
        {userLocation !== null ? (
          <Marker
            coordinate={userLocation?.coords}
            key="user"
            // tracksViewChanges={false}
            tracksInfoWindowChanges={false}
            anchor={{ x: 0.5, y: 0.5 }}
            pinColor="green"
            style={{ backgroundColor: "#90EE90" }}
          >
            <AntDesign name="user" color="black" size={24} />
          </Marker>
        ) : null}

        <Marker
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={chargingStation}
          key={"Charging Station"}
          // tracksViewChanges={false}
          tracksInfoWindowChanges={false}
          pinColor="#E6BF00"
          style={{ backgroundColor: "#90EE90" }}
        >
          <FontAwesome5 name="charging-station" size={22} color="#E6BF00" />
        </Marker>
        {threatLocations.map((coord) => {
          return (
            <Marker
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={coord}
              tracksViewChanges={false}
              tracksInfoWindowChanges={false}
              key={coord.id}
              onPress={() => {
                if (phaseInfo.phase === 1)
                  setPhaseInfo({ phase: 2, targetID: coord.id });
                else {
                  if (phaseInfo.targetID == coord.id)
                    setPhaseInfo({ phase: 1 });
                  else setPhaseInfo({ phase: 2, targetID: coord.id });
                }
              }}
            >
              {coord.id === phaseInfo.targetID ? (
                <View style={styles.targetContainer}>
                  <View style={styles.targeted}>
                    <FontAwesome name="plane" size={25} color="red" />
                  </View>
                  <View style={styles.targeted}>
                    {phaseInfo.killConfirmed ? (
                      <Entypo name="cross" size={40} color="#90EE90" />
                    ) : (
                      <MaterialCommunityIcons
                        name="target"
                        size={40}
                        color="#8B0000"
                      />
                    )}
                  </View>
                </View>
              ) : (
                <View style={{ backgroundColor: "red" }}>
                  <FontAwesome name="plane" size={25} color="black" />
                </View>
              )}
            </Marker>
          );
        })}
      </MapView>
      <View
        style={{
          position: "absolute",
          right: 10,
          bottom: 70,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setLocked(locked !== "user" ? "user" : null);
          }}
        >
          {locked === "user" ? (
            <FontAwesome5
              style={{ backgroundColor: "red", padding: 5 }}
              name="user-alt-slash"
              size={18}
              color="white"
            />
          ) : (
            <FontAwesome5
              style={{ backgroundColor: "green", padding: 5 }}
              name="user-alt"
              size={18}
              color="white"
            />
          )}
        </TouchableWithoutFeedback>
        <View style={{ marginTop: 5 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setLocked(locked !== "antidrone" ? "antidrone" : null);
            }}
          >
            {locked === "antidrone" ? (
              <MaterialCommunityIcons
                style={{ backgroundColor: "red", padding: 5 }}
                name="star-off"
                size={18}
                color="white"
              />
            ) : (
              <Entypo
                style={{ backgroundColor: "green", padding: 5 }}
                name="star"
                size={18}
                color="white"
              />
            )}
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  targeted: {
    position: "absolute",
  },
  targetContainer: {
    position: "relative",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
