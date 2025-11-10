
import { Stack, useRouter } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors"
import { StatusBar } from "expo-status-bar"
import UserOnly from "../../components/auth/UserOnly"
import { useUser } from "../../hooks/useUser"
import { useEffect } from "react"

export default function DashboardLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const { user , authChecked } = useUser()
  const router = useRouter()
  console.log("we reacher dashboard layout")
useEffect(() => {
  console.log("useEffect")
  if (!authChecked) return;

  if (!user) {
    router.replace("/login");
    return;
  }

  if (user.name === "doctor") {
    console.log("we went to doctor layout");
    router.replace("(dashboarddoctor)");
  } else if (user.name === "patient") {
    router.replace("(dashboardpatient)");
    console.log("we went to patient layout")
  }
}, [authChecked, user]);
  return (
    <UserOnly>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </UserOnly>
  )
}
