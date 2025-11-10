

import { StyleSheet, Text, Image, Platform, View, TouchableOpacity } from 'react-native'
import { useUser } from '../../../hooks/useUser'
import { useColorScheme } from 'react-native'
import Spacer from "../../../components/Spacer"
import ThemedText from "../../../components/ThemedText"
import ThemedView from "../../../components/ThemedView"
import ThemedButton from '../../../components/ThemedButton'
import { Info } from "lucide-react-native"
import { Link, useRouter } from 'expo-router'

import logo1 from '../../../assets/woma.png'
import lightlogo from '../../../assets/2r.png'

const Profile = () => {
  const { logout, user } = useUser()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const buttonBackgroundColor = isDark ? '#2B7CCE' : '#6849a7'
  const primaryColor = isDark ? '#2B7CCE' : '#6749A4'

  return (
    <ThemedView style={styles.container}>

      {/* Header */}
      <View style={[styles.headerContainer, { backgroundColor: primaryColor }]}>
        <Image source={lightlogo} style={styles.logo} />

        <Link href="meet">
          <Info size={28} color="#ffffff" />
        </Link>
      </View>

      {/* Profile Image */}
      <Image source={logo1} style={styles.img1} />

      {/* Divider Line */}
      <ThemedView style={[styles.line, { backgroundColor: primaryColor }]} />

      {/* Email */}
      <ThemedText title={true} style={styles.heading}>
        {user.email}
      </ThemedText>

      <Spacer />

      {/* Welcome */}
      <ThemedText>welcome patient</ThemedText>

      <Spacer />

      {/* Logout */}
      <ThemedButton onPress={logout} style={[styles.button, { backgroundColor: buttonBackgroundColor }]}>
        <Text style={{ color: '#f2f2f2' }}>Logout</Text>
      </ThemedButton>

    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  img1: {
    width: 178,
    height: 178,
  },
  line: {
    height: 1,
    width: '80%',
    marginVertical: 10
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 40 : 55,
    paddingBottom: 5,
    position: 'absolute',
    top: 4,
    width: '100%',
  },
  logo: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
})
