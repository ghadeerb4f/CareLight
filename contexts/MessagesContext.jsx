// import { createContext, useEffect, useState } from "react";
// import { account, databases } from "../lib/appwrite";
// import { Query } from "react-native-appwrite";
// import { ID } from "react-native-appwrite";
// import { Alert } from "react-native";

// export const MessageContext = createContext();

// export function MessageProvider({ children }) {
//   async function setMessage(
//     patientEmail,
//     doctorEmail,
//     messageText,
//     isPatientTheSender
//   ) {
//     try {
//       if (!doctorEmail || !patientEmail) {
//         Alert.alert("No enought info te get a message");
//         return;
//       }
//       console.log("try to send a message");
//       await databases.createDocument(
//         "690c8e21002a31480d08",
//         "messages",
//         ID.unique(),
//         { doctorEmail, patientEmail, messageText, isPatientTheSender }
//       );
//       Alert.alert("Message sent successfully ! ");
//     } catch (error) {
//       Alert.alert(error.message);
//       console.log(error.message);
//     }
//   }
//   async function getMessages(doctorEmail, patientEmail) {
//     try {
//       if (!doctorEmail || !patientEmail) {
//         Alert.alert("Not enough info to get messages.");
//         return [];
//       }

//       const response = await databases.listDocuments(
//         "690c8e21002a31480d08", // Database ID
//         "messages", // Collection ID
//         [
//           Query.equal("doctorEmail", doctorEmail),
//           Query.equal("patientEmail", patientEmail),
//         ]
//       );

//       // response.documents is an array of message objects
//       console.log("getMessages response");
//       return response.documents;
//     } catch (error) {
//       Alert.alert(error.message);
//       return [];
//     }
//   }
//   async function getMessagesFromAllPatients(doctorEmail) {
//     try {
//       if (!doctorEmail) {
//         Alert.alert("Not enough info to get messages.");
//         return [];
//       }

//       const response = await databases.listDocuments(
//         "690c8e21002a31480d08", // Database ID
//         "messages", // Collection ID
//         [Query.equal("doctorEmail", doctorEmail)]
//       );

//       // response.documents is an array of message objects
//       console.log("getMessages response");
//       return response.documents;
//     } catch (error) {
//       Alert.alert(error.message);
//       return [];
//     }
//   }
//   async function getMessagesFromOnePatinet(doctorEmail , patientEmail) {
//     try {
//       if (!doctorEmail) {
//         Alert.alert("Not enough info to get messages.");
//         return [];
//       }

//       const response = await databases.listDocuments(
//         "690c8e21002a31480d08", // Database ID
//         "messages", // Collection ID
//         [
//           Query.equal("doctorEmail", doctorEmail),
//           Query.equal("patientEmail", patientEmail)
//         ]
//       );

//       // response.documents is an array of message objects
//       console.log("getMessages response");
//       return response.documents;
//     } catch (error) {
//       Alert.alert(error.message);
//       return [];
//     }
//   }
//   async function getMessagesFromAllDoctors(patientEmail) {
//     try {
//       if (!patientEmail) {
//         Alert.alert("Not enough info to get messages.");
//         return [];
//       }

//       const response = await databases.listDocuments(
//         "690c8e21002a31480d08", // Database ID
//         "messages", // Collection ID
//         [Query.equal("patientEmail", patientEmail)]
//       );

//       // response.documents is an array of message objects
//       console.log("getMessages response");
//       return response.documents;
//     } catch (error) {
//       Alert.alert(error.message);
//       return [];
//     }
//   }

//   return (
//     <MessageContext.Provider
//       value={{
//         setMessage,
//         getMessages,
//         getMessagesFromAllPatients,
//         getMessagesFromAllDoctors,
//         getMessagesFromOnePatinet
//       }}
//     >
//       {children}
//     </MessageContext.Provider>
//   );
// }
import { createContext, useEffect, useState } from "react";
import { account, databases } from "../lib/appwrite";
import { Query, ID } from "react-native-appwrite";
import { Alert } from "react-native";

export const MessageContext = createContext();

export function MessageProvider({ children }) {

  async function setMessage(
    patientEmail,
    doctorEmail,
    messageText,
    isPatientTheSender
  ) {
    try {
      if (!doctorEmail || !patientEmail) {
        Alert.alert("Not enough info to send message");
        return;
      }

      // Normalize email casing
      doctorEmail = doctorEmail.toLowerCase();
      patientEmail = patientEmail.toLowerCase();

      await databases.createDocument(
        // "690c8e21002a31480d08",
        "691075950022f78a1f2f",
        "messages",
        ID.unique(),
        { doctorEmail, patientEmail, messageText, isPatientTheSender }
      );
      
    } catch (error) {
      Alert.alert(error.message);
      console.log("error sending");
    }
  }

  async function getMessages(doctorEmail, patientEmail) {
    try {
      if (!doctorEmail || !patientEmail) return [];

      doctorEmail = doctorEmail.toLowerCase();
      patientEmail = patientEmail.toLowerCase();

      const response = await databases.listDocuments(
        // "690c8e21002a31480d08",
        "691075950022f78a1f2f",
        "messages",
        [
          Query.equal("doctorEmail", doctorEmail),
          Query.equal("patientEmail", patientEmail),
        ]
      );

      return response.documents;

    } catch (error) {
      Alert.alert(error.message);
      return [];
    }
  }

  async function getMessagesFromAllPatients(doctorEmail) {
    try {
      if (!doctorEmail) return [];

      doctorEmail = doctorEmail.toLowerCase();

      const response = await databases.listDocuments(
        // "690c8e21002a31480d08",
        "691075950022f78a1f2f",
        "messages",
        [
          Query.equal("doctorEmail", doctorEmail)
        ]
      );

      return response.documents;

    } catch (error) {
      Alert.alert(error.message);
      return [];
    }
  }

  async function getMessagesFromOnePatinet(doctorEmail, patientEmail) {
    try {
      if (!doctorEmail || !patientEmail) return [];

      doctorEmail = doctorEmail.toLowerCase();
      patientEmail = patientEmail.toLowerCase();

      const response = await databases.listDocuments(
        // "690c8e21002a31480d08",
        "691075950022f78a1f2f",
        "messages",
        [
          Query.equal("doctorEmail", doctorEmail),
          Query.equal("patientEmail", patientEmail),
        ]
      );

      return response.documents;

    } catch (error) {
      Alert.alert(error.message);
      return [];
    }
  }

  async function getMessagesFromAllDoctors(patientEmail) {
    try {
      if (!patientEmail) return [];

      patientEmail = patientEmail.toLowerCase();

      const response = await databases.listDocuments(
        // "690c8e21002a31480d08",
        "691075950022f78a1f2f",
        "messages",
        [
          Query.equal("patientEmail", patientEmail)
        ]
      );

      return response.documents;

    } catch (error) {
      Alert.alert(error.message);
      return [];
    }
  }

  return (
    <MessageContext.Provider
      value={{
        setMessage,
        getMessages,
        getMessagesFromAllPatients,
        getMessagesFromAllDoctors,
        getMessagesFromOnePatinet,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}
