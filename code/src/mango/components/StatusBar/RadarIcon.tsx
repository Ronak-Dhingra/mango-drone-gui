import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RadarIconProps {
  signalStrength: number;
}

const RadarIcon: React.FC<RadarIconProps> = ({ signalStrength }) => {
  const iconSize = 30;

  const getIconName = () => {
    switch (signalStrength) {
      case 0:
        return "radio-outline";
      case 1:
        return "radio-outline";
      case 2:
        return "radio-outline";
      case 3:
        return "radio-outline";
      case 4:
        return "radio";
      default:
        return "radio-outline";
    }
  };

  const iconName = getIconName();

  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={iconSize} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
});

export default RadarIcon;
