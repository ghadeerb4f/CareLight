
import {
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import ThemedButton from "../../../components/ThemedButton";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import Spacer from "../../../components/Spacer";
import ThemedLoader from "../../../components/ThemedLoader";
import { useDoctor } from "../../../hooks/useDoctor";

import { Eye, Baby, HeartPulse, Ear, Stethoscope } from "lucide-react-native";
import header1 from "../../../assets/2r.png";
import header2 from "../../../assets/header.png";
const loadingAnimation = require("../../../assets/Doctor, Medical, Surgeon, Healthcare Animation.json");

const { width, height } = Dimensions.get("window");
const centerX = width * 0.19;
const centerY = height / 2.9;
const radius = 180;

const sections = [
  { id: 1, title: "Ophthalmology", icon: Eye },
  { id: 2, title: "Child Care", icon: Baby },
  { id: 3, title: "Cardiology", icon: HeartPulse },
  { id: 4, title: "Pulmonology", icon: Stethoscope },
  { id: 5, title: "Otolaryngology", icon: Ear },
];

const Books = () => {
  const router = useRouter();
  const { getAllDepartmentDoctors } = useDoctor();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("");
  const [depName, setDepName] = useState("");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const primaryColor = isDark ? "#2B7CCE" : "#6749A4";
  const backgroundColor = isDark ? "#181C3D" : "#FFFFFF";

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!depName) return;
      setLoading(true);
      try {
        const fetchedDocs = await getAllDepartmentDoctors(depName);
        setDoctors(fetchedDocs || []);
      } catch (error) {
        console.log("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [depName]);

  if (loading && display !== "") {
    return <ThemedLoader />;
  }

  return (
    <>
      {display === "" ? (
        <ThemedView safe={true} style={{ flex: 1, backgroundColor }}>
          <Stack.Screen options={{ headerShown: false }} />

          <View style={[styles.header, { backgroundColor: primaryColor }]}>
            <View style={styles.leftt}>
              <Image source={header1} style={styles.logohead} />
              <View>
                <Text style={styles.mainText}>CareLight</Text>
                <Text style={styles.subText}>Anytime Anywhere</Text>
              </View>
            </View>

            <View style={styles.right}>
              <Image source={header2} style={styles.dochead} />
            </View>
          </View>

          <View style={styles.container}>
            <LottieView source={loadingAnimation} autoPlay loop style={styles.centerCircle} />

            {sections.map((section, index) => {
              const customAngles = [
                -Math.PI / 2,
                -Math.PI / 2 + 0.9,
                -0.1,
                Math.PI / 2 - 1,
                Math.PI / 2 - 0.02,
              ];
              const angle = customAngles[index];
              const x = centerX + radius * Math.cos(angle) - 35;
              const y = centerY + radius * Math.sin(angle) - 4;
              const IconComponent = section.icon;

              return (
                <TouchableOpacity
                  key={section.id}
                  style={[styles.section, { top: y, left: x, backgroundColor: primaryColor }]}
                  onPress={() => {
                    setDisplay(section.title);
                    setDepName(section.title);
                  }}
                >
                  <View style={styles.iconLabelContainer}>
                    <IconComponent size={28} color="white" />
                    <Text style={styles.label}>{section.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ThemedView>
      ) : (
        <ThemedView safe={true} style={[styles.messages, { backgroundColor }]}>
          <ThemedButton onPress={() => { setDisplay(""); setDoctors([]); }} style={{ margin: 10 }}>
            <Text style={{ color: "#fff" }}>← Back to Departments</Text>
          </ThemedButton>

          <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
            {doctors.length === 0 ? (
              <ThemedText style={{ textAlign: "center", fontSize: 16 }}>
                No doctors found in {display}
              </ThemedText>
            ) : (
              doctors.map((doc) => (
                <Pressable
                  key={doc.email}
                  onPress={() => router.push(`/doctor/${doc.email}`)}
                >
                  <Spacer />
                  <ThemedText style={{ textAlign: "center", fontSize: 16 }}>
                    Dr.{doc.doctorName} — {doc.department}
                  </ThemedText>
                  <Spacer />
                </Pressable>
              ))
            )}
          </ScrollView>
        </ThemedView>
      )}
    </>
  );
};

export default Books;

const styles = StyleSheet.create({
  messages: {
    flex: 1,
  },
  header: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  leftt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginLeft: 12,
  },
  logohead: {
    height: 45,
    width: 45,
  },
  mainText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 9,
    color: "white",
  },
  right: {
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0,
  },
  dochead: {
    width: width * 0.3,
    height: "100%",
  },
  container: {
    flex: 1,
  },
  centerCircle: {
    position: "absolute",
    top: centerY - 110,
    left: centerX - 75,
    width: 200,
    height: 200,
  },
  section: {
    position: "absolute",
    width: 185,
    height: 50,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    padding: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  iconLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
