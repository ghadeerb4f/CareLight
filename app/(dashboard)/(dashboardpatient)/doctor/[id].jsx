
// import {
//   Keyboard,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
//   ScrollView,
//   Pressable,
  
// } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect, useState, useRef } from "react";
// import { Colors } from "../../../../constants/Colors";
// import ThemedText from "../../../../components/ThemedText";
// import ThemedView from "../../../../components/ThemedView";
// import ThemedCard from "../../../../components/ThemedCard";
// import Spacer from "../../../../components/Spacer";
// import ThemedTextInput from "../../../../components/ThemedTextInput";
// import ThemedButton from "../../../../components/ThemedButton";

// import { useUser } from "../../../../hooks/useUser";
// import { useMessage } from "../../../../hooks/useMessage";

// const PatientMessageDetails = () => {
//   const { id } = useLocalSearchParams(); // patient id
//   const { user } = useUser();
//   const { getMessages, setMessage } = useMessage();

//   const [messages, setMessages] = useState([]);
//   const [typedMessage, setTypedMessage] = useState("");
//   const [refresh, setRefresh] = useState(false);

//   const scrollViewRef = useRef();

//   // Fetch messages on mount
//   useEffect(() => {
//     if (!id || !user?.email) return;

//     async function fetchMessages() {
//       try {
//         const msgs = await getMessages(id , user.email);
//         setMessages(msgs || []);
//       } catch (error) {
//         console.log("Error fetching messages:", error);
//       }
//     }

//     fetchMessages();
//   }, [id, user?.email]);

//   // Refresh messages when refresh is triggered
//   useEffect(() => {
//     if (!refresh) return;

//     async function refreshMessages() {
//       try {
//         const msgs = await getMessages(id , user.email);
//         setMessages(msgs || []);
//       } catch (error) {
//         console.log("Error refreshing messages:", error);
//       } finally {
//         setRefresh(false);
//       }
//     }

//     refreshMessages();
//   }, [refresh]);

//   // Handle sending a message
//   async function handleSend() {
//     if (!typedMessage) return;

//     try {
//       await setMessage(user.email, id, typedMessage, true); // true: patient is sender
//       setTypedMessage("");
//       setRefresh(true);
//     } catch (error) {
//       console.log("Error sending message:", error);
//     }
//   }

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <ThemedView safe={true} style={styles.container}>
//         <ScrollView
//           style={styles.messagesContainer}
//           ref={scrollViewRef}
//           onContentSizeChange={() =>
//             scrollViewRef.current?.scrollToEnd({ animated: true })
//           }
//         >
//           {messages.length === 0 ? (
//             <ThemedText>No messages yet</ThemedText>
//           ) : (
//             messages.map((msg, index) => (
//               <ThemedCard
//                 key={index}
//                 style={{
//                   marginVertical: 5,
//                   backgroundColor: msg.isPatientTheSender
//                     ? Colors.lightGray
//                     : Colors.primary,
//                   alignSelf: msg.isPatientTheSender ? "flex-end" : "flex-start",
//                   maxWidth: "80%",
//                   padding: 10,
//                   borderRadius: 8,
//                 }}
//               >
//                 <ThemedText
//                   style={{
//                     color: msg.isPatientTheSender ? "black" : "white",
//                   }}
//                 >
//                   {msg.messageText}
//                 </ThemedText>
//               </ThemedCard>
//             ))
//           )}
//         </ScrollView>

//         {/* Input & Buttons */}
//         <ThemedTextInput
//           style={{ marginBottom: 10, width: "80%" }}
//           placeholder="Send a message"
//           value={typedMessage}
//           onChangeText={setTypedMessage}
//         />

//         <ThemedView style={{ flexDirection: "row", gap: 10 }}>
//           <ThemedButton onPress={handleSend}>
//             <Text style={{ color: "#f2f2f2" }}>Send</Text>
//           </ThemedButton>

//           <ThemedButton onPress={() => setRefresh(true)}>
//             <Text style={{ color: "#f2f2f2" }}>Refresh</Text>
//           </ThemedButton>
//         </ThemedView>
//       </ThemedView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default PatientMessageDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 15,
//     paddingTop: 20,
    
//   },
//   messagesContainer: {
//     flex: 1,
//     marginVertical: 10,
//   },
// });
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
  ImageBackground,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { Colors } from "../../../../constants/Colors";
import ThemedText from "../../../../components/ThemedText";
import ThemedView from "../../../../components/ThemedView";
import ThemedCard from "../../../../components/ThemedCard";
import ThemedTextInput from "../../../../components/ThemedTextInput";
import ThemedButton from "../../../../components/ThemedButton";
import chatbg from "../../../../assets/chatBackground.jpeg";
import { useUser } from "../../../../hooks/useUser";
import { useMessage } from "../../../../hooks/useMessage";

const PatientMessageDetails = () => {
  const { id } = useLocalSearchParams(); // patient id
  const { user } = useUser();
  const { getMessages, setMessage } = useMessage();

  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const [isWriting , setIs]
  const scrollViewRef = useRef();

  // Fetch messages on mount
  useEffect(() => {
    if (!id || !user?.email) return;

    async function fetchMessages() {
      try {
        const msgs = await getMessages(id, user.email);
        setMessages(msgs || []);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    }

    fetchMessages();
  }, [id, user?.email]);

  // Refresh messages when refresh is triggered
  useEffect(() => {
    if (!refresh) return;

    async function refreshMessages() {
      try {
        const msgs = await getMessages(id, user.email);
        setMessages(msgs || []);
      } catch (error) {
        console.log("Error refreshing messages:", error);
      } finally {
        setRefresh(false);
      }
    }

    refreshMessages();
  }, [refresh]);

  // Handle sending a message
  async function handleSend() {
    if (!typedMessage){
      console.log("button pressed");

     return;}

    try {
      await setMessage(user.email, id, typedMessage, true); // true: patient is sender
      setTypedMessage("");
      setRefresh(true);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={chatbg}
        style={styles.background}
        resizeMode="cover"
      >
        <View safe={true} style={styles.container}>
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
                    alignSelf: !msg.isPatientTheSender
                      ? "flex-end"
                      : "flex-start",
                    maxWidth: "80%",
                    padding: 10,
                    borderRadius: 8,
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

          {/* Input & Buttons */}
          <ThemedTextInput
            style={{ marginBottom: 10, width: "100%" }}
            placeholder="Send a message"
            value={typedMessage}
            onChangeText={setTypedMessage}
          />

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

export default PatientMessageDetails;

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

