import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";
export default function Camera() {
  return (
    <View style={[styles.container, { marginTop: '10%' }]}>
      <Text style={styles.title}>Camera Phase 5</Text>
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