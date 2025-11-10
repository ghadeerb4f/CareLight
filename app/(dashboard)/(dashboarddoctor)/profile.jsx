
import { StyleSheet, Text, Image, TouchableOpacity, View, Platform } from 'react-native'
import { useUser } from '../../../hooks/useUser'
import { Link } from 'expo-router'
import Spacer from "../../../components/Spacer"
import ThemedText from "../../../components/ThemedText"
import ThemedView from "../../../components/ThemedView"
import ThemedButton from '../../../components/ThemedButton'
import doctor from '../../../assets/surgeon.png'
import lightlogo from '../../../assets/2r.png';
import { Info } from "lucide-react-native";
import { useColorScheme } from "react-native"

const Profile = () => {
  const { logout, user } = useUser()
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const primaryColor = isDark ? '#2B7CCE' : '#6749A4'; 

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={[styles.headerContainer, { backgroundColor: primaryColor }]}>
        <Image source={lightlogo} style={styles.logo} />
        <Link href="/meet">
          <Info size={28} color="#ffffff" />
        </Link>

      </View>

      {/* Doctor Image */}
      <Image source={doctor} style={styles.img1} />

      {/* Separator Line */}
      <ThemedView style={styles.line} />

      {/* Profile Info */}
      <ThemedText title={true} style={styles.heading}>
        {user.email}
      </ThemedText>
      <Spacer />
      <ThemedText>Welcome doctor</ThemedText>
      <Spacer />

      {/* Logout Button */}
      <ThemedButton onPress={logout} style={[styles.button, { backgroundColor: primaryColor }]}>
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
    marginTop: 20,
  },
  line: {
    height: 1,
    backgroundColor: '#6749a4',
    width: '80%',
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? 40 : 55,
    paddingBottom: 5,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  logo: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
  },
})
