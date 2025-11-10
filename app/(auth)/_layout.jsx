import { Stack } from "expo-router"
import { StatusBar } from "react-native"

import GuestOnly from "../../components/auth/GuestOnly"

export default function AuthLayout() {
  console.log("we reached auth layout")
  return (
    <GuestOnly>
      <StatusBar style="auto" />
      <Stack 
        screenOptions={{ headerShown: false, animation: "none" }} 
      />
    </GuestOnly>
  )
}