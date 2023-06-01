import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import SignalStrengthIcon from "./SignalStrengthIcon";
import RadarIcon from "./RadarIcon";

export default function RadarSignalStrength() {
    const [signalStrength, setSignalStrength] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSignalStrength((signalStrength + 1) % 5);
        }, 500);

        return () => clearInterval(intervalId);
    }, [signalStrength]);

    return (
        <View style={styles.container}>
            {/* <Text style={styles.Text}>Radar Signal Strength: </Text> */}
            <RadarIcon signalStrength={signalStrength} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // alignItems: "center",
        // justifyContent: "center",
        // paddingVertical: 5,
        paddingHorizontal: 20,
        // backgroundColor: "#6ECBF5",
        borderRadius: 10,
        // marginTop: 5,
        // marginLeft: 30,
    },
    Text: {
        fontSize: 15,
        fontWeight: "bold",
        // marginLeft: 10,
        color: "white",
    },
});


