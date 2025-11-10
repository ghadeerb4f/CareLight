import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Colors } from "../../../../constants/Colors";
import ThemedTextInput from "../../../../components/ThemedTextInput";
// themed components
import ThemedText from "../../../../components/ThemedText";
import ThemedButton from "../../../../components/ThemedButton";
import ThemedView from "../../../../components/ThemedView";
import Spacer from "../../../../components/Spacer";
import ThemedCard from "../../../../components/ThemedCard";
import { useUser } from "../../../../hooks/useUser";
// import ThemedLoader from "../../../../components/ThemedCard"
import { useMessage } from "../../../../hooks/useMessage";
const pm = [
  "I am hungry",
  "patient message2",
  "patient message3",
  "patient message4",
  "patient message2",
  "patient message2",
  "patient message3",
  "patient message4",
];
const dm = [
  "eat",
  "doctor message2",
  "",
  "doctor message4",
  "patient message2",
  "patient message2",
  "patient message3",
  "patient message4",
];
const Message = () => {
  const [reply, setReply] = useState();
  const {user} = useUser();
  const { id } = useLocalSearchParams();
const { setMessage } = useMessage();
  const [typedMessage ,setTypedMessage] = useState("");
  function handleSend(){
    if(typedMessage === ""){
      Alert.alert("type a message");
      return;
    }
    setMessage(id , user.email , typedMessage , true );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe={true} style={styles.container}>
        {/* <ThemedCard style={styles.card}>
          <ThemedText style={{ textAlign: "right" }}>{pm[id]}</ThemedText>
          <Spacer />
          {dm[id] === "" && (
            <ThemedTextInput
              style={{ marginBottom: 20, width: "80%" }}
              placeholder="Reply to doctor"
              value={reply}
              onChangeText={setReply}
            />
          )}
          <ThemedText title={true} style={{ textAlign: "left" }}>
            {dm[id]}
          </ThemedText>
          <Spacer height={10} />
        </ThemedCard> */}   
        <ThemedTextInput
          style={{ marginBottom: 10, width: "80%" }}
          placeholder="Send a message"
          value={typedMessage}
          onChangeText={setTypedMessage}
        />
        <ThemedButton onPress={handleSend}>
          <Text style={{ color: "#f2f2f2" }}>Send</Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
  },
  card: {
    margin: 20,
  },
  delete: {
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: "center",
  },
});
