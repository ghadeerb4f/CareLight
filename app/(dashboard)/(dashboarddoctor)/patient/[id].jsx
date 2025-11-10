
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  Pressable,
  ImageBackground,
  View
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { Colors } from "../../../../constants/Colors";
import ThemedText from "../../../../components/ThemedText";
import ThemedView from "../../../../components/ThemedView";
import ThemedCard from "../../../../components/ThemedCard";
import Spacer from "../../../../components/Spacer";
import ThemedTextInput from "../../../../components/ThemedTextInput";
import ThemedButton from "../../../../components/ThemedButton";
import chatbg from "../../../../assets/chatBackground.jpeg";
import { useDoctor } from "../../../../hooks/useDoctor";
import { useUser } from "../../../../hooks/useUser";
import { useMessage } from "../../../../hooks/useMessage";

const Patient = () => {
  const { id } = useLocalSearchParams();
  const email = id ;
//   const { getOneDoctor } = useDoctor();
 
  
  const { getMessages, setMessage ,getMessagesFromOnePatinet } = useMessage();
  const { user } = useUser();
//   const [doctor, setDoctor] = useState(null);
  const [patiet, setPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");
  const scrollViewRef = useRef();
  const [refresh ,setRefresh] = useState(false);
  setTimeout(() => {
  }, 2000);
  // Fetch doctor info and messages
  useEffect(() => {
    if (!email || !user?.email) return;

    async function fetchData() {
      try {
        const doc = await getMessagesFromOnePatinet(user.email , email);
        setPatient(doc);

        const msgs = await getMessages(user.email , email);
        setMessages(msgs);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }

    fetchData();
  }, [email, user.email]);
  setTimeout(() => {
  }, 2000);
  // Refreshing
  useEffect(() => {
    console.log("refresh");
    if (!email || !user?.email || !refresh) return;

    async function R() {
      try {
        const msgs = await getMessages(user.email , email);
        setMessages(msgs);
        console.log("message refreshed");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
      finally{
        setRefresh(false);
      }
    }

    R();
  }, [refresh]);

  // Handle sending a message
async function handleSend() {
  console.log("Send button pressed");
  console.log("email" + email + "user.email " + user.email);
  if (!typedMessage || !user?.email || !email || !user) return;

  try {
    console.log("Sending message to:", email);

    await setMessage(
        email,
        user.email,
      typedMessage,
      false
    );
    setTypedMessage("");
    console.log(email + user.email)
    const updatedMessages = await getMessages(user.email , email);
    setMessages(updatedMessages);
  } catch (error) {
    console.log("Error sending message:", error);
  }
}
    function handleRefrsh(){
        setRefresh(true);
    }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
              source={chatbg}
              style={styles.background}
              resizeMode="cover"
            >

         
      <View safe={true} style={styles.container}>
        {/* patient Info */}
        {patiet && (
          <ThemedCard style={styles.card}>
            <ThemedText style={{ textAlign: "right" }}>
              {email}
            </ThemedText>
            <Spacer height={10} />
          </ThemedCard>
        )}
        <ScrollView
          style={styles.messagesContainer}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.length === 0 ? (
            <ThemedText>No messages yet</ThemedText>
          ) : (
            messages.map((msg, index) => (
              <ThemedCard
                key={index}
                style={{
                  marginVertical: 5,
                  backgroundColor: msg.isPatientTheSender
                    ? "white"
                    : Colors.primary,
                  alignSelf: msg.isPatientTheSender ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  borderRadios:10,
                  padding : 10 
                }}
              >
                <ThemedText
                  style={{
                    color: msg.isPatientTheSender ? "black" : "white",
                  }}
                >
                  {msg.messageText}
                </ThemedText>
              </ThemedCard>
            ))
          )}

        </ScrollView>

        {/* Input & Send Button */}
        <ThemedTextInput
          style={{ marginBottom: 10, width: "80%" }}
          placeholder="Send a message"
          value={typedMessage}
          onChangeText={setTypedMessage}
        />
        {/* <Pressable onPress={()=>{setRefresh(true)}}>
            <Text style={{width : 60}}>refresh</Text>
        </Pressable>
        <ThemedButton onPress={handleSend}>
          <Text style={{ color: "#f2f2f2" }}>Send</Text>
        </ThemedButton> */}
        <ThemedView style={styles.rowFlex}>
          <ThemedButton onPress={handleSend}>
            <Text style={{ color: "#f2f2f2" }}>Send</Text>
          </ThemedButton>

          <ThemedButton onPress={() => setRefresh(true)}>
            <Text style={{ color: "#f2f2f2" }}>Refresh</Text>
          </ThemedButton>
        </ThemedView>
      </View>
         </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default Patient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  messagesContainer: {
    flex: 1,
    marginVertical: 10,
  },
  background: {
    flex: 1,
  },
  rowFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});