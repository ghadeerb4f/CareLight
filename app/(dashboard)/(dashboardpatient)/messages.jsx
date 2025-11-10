
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import Spacer from "../../../components/Spacer";
import ThemedButton from "../../../components/ThemedButton";

import { useMessage } from "../../../hooks/useMessage";
import { useUser } from "../../../hooks/useUser";

const Create = () => {
  const router = useRouter();
  const { user } = useUser();
  const { getMessagesFromAllDoctors } = useMessage();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const primaryColor = isDark ? "#2B7CCE" : "#6849A7";
  const backgroundColor = isDark ? "#181C3D" : "#FFFFFF";

  const getHoursAndMinutes = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const [messages, setMessages] = useState([]);
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadMessages() {
    if (!user?.email) return;
    const allMsgs = await getMessagesFromAllDoctors(user.email.toLowerCase());
    setMessages(allMsgs || []);
    setReady(true);
    setRefreshing(false);
  }

  useEffect(() => {
    loadMessages();
  }, [user?.email]);

  function handleRefresh() {
    setRefreshing(true);
    loadMessages();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={[styles.container, { backgroundColor }]}>

        <Spacer height={10} />

        <ThemedButton onPress={handleRefresh}>
          <Text style={{ color: "#fff" }}>
            {refreshing ? "Refreshing..." : "Refresh Messages"}
          </Text>
        </ThemedButton>

        <Spacer height={20} />

        {ready && (
          <ScrollView style={styles.scrollContainer}>
            <ThemedText style={styles.sectionTitle}>Messages</ThemedText>

            {messages.length === 0 ? (
              <ThemedText>No messages found</ThemedText>
            ) : (
              messages.map((message) => (
                <Pressable
                  key={message.$id}
                  onPress={() =>
                    router.push(`/doctor/${message.doctorEmail.toLowerCase()}`)
                  }
                >
                  <ThemedView
                    style={[styles.doctorItem, { borderColor: primaryColor }]}
                  >
                    <ThemedText style={{ color: isDark ? "#fff" : "#000" }}>
                      {message.messageText}{" "}
                      {message.isPatientTheSender ? "from you" : `from ${message.doctorEmail}`}{" "}
                      to{" "}
                      {message.isPatientTheSender ? `${message.doctorEmail}` : "you"}{" "}
                      at {getHoursAndMinutes(message.$createdAt)}
                    </ThemedText>
                  </ThemedView>
                </Pressable>
              ))
            )}
          </ScrollView>
        )}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  scrollContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  doctorItem: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
});
