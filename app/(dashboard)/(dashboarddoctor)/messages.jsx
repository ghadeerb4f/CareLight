


import { Alert, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

// Themed components
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedButton from '../../../components/ThemedButton';
import ThemedTextInput from '../../../components/ThemedTextInput';

import { useMessage } from '../../../hooks/useMessage';
import { useUser } from '../../../hooks/useUser';

const Messages = () => {
  const router = useRouter();
  const { user } = useUser();
  const { getMessagesFromAllPatients, setMessage } = useMessage();

  const [messages, setMessages] = useState({});
  const [replyText, setReplyText] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function fetchMessages() {
      if (!user?.email) return;

      const allMsgs = await getMessagesFromAllPatients(user.email);

      // Group by patient
      const grouped = {};
      allMsgs.forEach(msg => {
        if (!grouped[msg.patientEmail]) {
          grouped[msg.patientEmail] = [];
        }
        grouped[msg.patientEmail].push(msg);
      });

      setMessages(grouped);
      setReady(true);
    }

    fetchMessages();
  }, [user.email]);

  async function handleSend(patientEmail) {
    if (!replyText[patientEmail] || replyText[patientEmail].trim() === "") {
      Alert.alert("Type a message to send");
      return;
    }

    await setMessage(
      patientEmail,      // patientEmail
      user.email,        // doctorEmail
      replyText[patientEmail],
      false              // doctor is sender
    );

    setReplyText({ ...replyText, [patientEmail]: "" });

    Alert.alert("Message sent!");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>

        {ready && (
          <ScrollView style={styles.scrollContainer}>
            <ThemedText style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Messages
            </ThemedText>

            {Object.keys(messages).length === 0 ? (
              <ThemedText>No messages found</ThemedText>
            ) : (
              Object.keys(messages).map((patientEmail) => {
                const patientMsgs = messages[patientEmail];
                const lastMessage = patientMsgs[patientMsgs.length - 1];

                return (
                  <ThemedView key={patientEmail} style={styles.chatBox}>
                    
                    <Pressable onPress={() => router.push(`/patient/${patientEmail}`)}>
                      <ThemedText style={styles.patientEmail}>{patientEmail}</ThemedText>
                      <ThemedText style={styles.lastMessage}>
                        {lastMessage.isPatientTheSender ? "Patient: " : "You: "}
                        {lastMessage.messageText}
                      </ThemedText>
                    </Pressable>

                    <ThemedTextInput
                      placeholder="Reply..."
                      value={replyText[patientEmail] || ""}
                      onChangeText={(text) =>
                        setReplyText({ ...replyText, [patientEmail]: text })
                      }
                      style={{ marginTop: 10 }}
                    />

                    <ThemedButton onPress={() => handleSend(patientEmail)}>
                      <Text style={{ color: "#fff" }}>Send</Text>
                    </ThemedButton>

                  </ThemedView>
                );
              })
            )}
          </ScrollView>
        )}

      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  scrollContainer: {
    marginTop: 20,
  },
  chatBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  patientEmail: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  lastMessage: {
    marginTop: 5,
    color: "gray",
  },
});

