import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import {
  PhaseContextType,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import Map from "./Map";
import CameraPhase1 from "./CameraPhase1";
import CameraPhase2 from "./CameraPhase2";
import CameraPhase3 from "./CameraPhase3";
import CameraPhase4 from "./CameraPhase4";
import CameraPhase5 from "./CameraPhase5";
import CameraPhase6 from "./CameraPhase6";
import { useContext } from "react";
import { PhaseContext } from "../phaseContext";
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function Tabbed() {
  const colorScheme = useColorScheme();
  const { phaseInfo } = useContext(PhaseContext) as PhaseContextType;
  let Camera = CameraPhase1;
  switch (phaseInfo.phase) {
    case 1:
      Camera = CameraPhase1;
      break;
    case 2:
      Camera = CameraPhase2;
      break;
    case 3:
      Camera = CameraPhase3;
      break;
    case 4:
      Camera = CameraPhase4;
      break;
    case 5:
      Camera = CameraPhase5;
      break;
    case 6:
      Camera = CameraPhase6;
      break;
    default:
      break;
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}
