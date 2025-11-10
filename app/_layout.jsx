
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../contexts/UserContext";
import { MessageProvider } from "../contexts/MessagesContext";
import { DoctorProvider } from "../contexts/DoctorContext";
import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";
import WelcomeScreen from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const [isShowSplashScreen, setIsShowSplashScreen] = useState(true);
  const [isIntroCompleted, setIsIntroCompleted] = useState(false);
  const [isLoadingIntroStatus, setIsLoadingIntroStatus] = useState(true);

  useEffect(() => {
    const checkIntroStatus = async () => {
      const completed = await AsyncStorage.getItem("introCompleted");
      if (completed === "true") {
        setIsIntroCompleted(true);
      }
      setIsLoadingIntroStatus(false);
    };

    checkIntroStatus();

    const timer = setTimeout(() => {
      setIsShowSplashScreen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleIntroDone = async () => {
    await AsyncStorage.setItem("introCompleted", "true");
    setIsIntroCompleted(true);
  };

  if (isShowSplashScreen || isLoadingIntroStatus) {
    return <SplashScreen />;
  }

  if (!isIntroCompleted) {
    return <WelcomeScreen onDone={handleIntroDone} />;
  }

  return (
    <UserProvider>
      <MessageProvider>
        <DoctorProvider>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: theme.navBackground },
              headerTintColor: theme.title,
            }}
          >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ title: "Home" }} />
          </Stack>
        </DoctorProvider>
      </MessageProvider>
    </UserProvider>
  );
}
