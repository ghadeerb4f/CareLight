
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../../../constants/Colors";

import { CircleUserRound, MessageCircle, Hospital } from "lucide-react-native";
import UserOnly from "../../../components/auth/UserOnly";

export default function DashboardLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: theme.navBackground, paddingTop: 10, height: 90 },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        {/* Visible Tabs */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <CircleUserRound
                size={24}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarIcon: ({ focused }) => (
              <MessageCircle
                size={24}
                color={focused ? theme.iconColorFocused : theme.iconColor}
              />
            ),
          }}
        />
         {/* hidden  routes */}
        <Tabs.Screen name="message/[id]" options={{ href: null }} />
        <Tabs.Screen name="patient/[id]" options={{ href: null }} />
        <Tabs.Screen name="meet" options={{ href: null }} />
      </Tabs>
    </UserOnly>
  );
}
