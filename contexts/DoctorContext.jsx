import { createContext, useEffect, useState } from "react";
import { account, databases } from "../lib/appwrite";
import { Query } from "react-native-appwrite";
import { ID } from "react-native-appwrite";
import { Alert } from "react-native";

export const DoctorContext = createContext();

export function DoctorProvider({ children }) {
  //   const [message, setMessage] = useState(null);
  //   const [authChecked, setAuthChecked] = useState(false);

  async function getDoctors() {
    try {
      const response = await databases.listDocuments(
        // "690c8e21002a31480d08",
        "691075950022f78a1f2f",
        "doctors"
      );
      // response.documents is an array of message objects
      console.log("all doctors loaded");
      return response.documents;
    } catch (error) {
      Alert.alert(error.message);
      return [];
    }
  }
  async function getOneDoctor(email) {
    try {
      if (!email) {
        Alert.alert("Not enough info to get messages.");
        return [];
      }

      const response = await databases.listDocuments(
        // "690c8e21002a31480d08",
        "691075950022f78a1f2f",
        "doctors",
        [Query.equal("email", email)]
      );

      // response.documents is an array of message objects
      console.log(response.documents);
      return response.documents;
    } catch (error) {
      Alert.alert(error.message);
      return [];
    }
  }
  async function getAllDepartmentDoctors(department) {
    if (department === "") {
      console.log("error no department");
      return [];
    }
    console.log("department worked");

    try {
      console.log("getAllDepartmentDoctors");
      if (!department) {
        Alert.alert("Not enough info to get messages.");
        return [];
      }

      const response = await databases.listDocuments(
        // "690c8e21002a31480d08",
        "691075950022f78a1f2f",
        "doctors",
        [Query.equal("department", department)]
      );

      // response.documents is an array of message objects
      console.log(response.documents);
      return response.documents;
    } catch (error) {
      console.log("getAllDepartmentDoctors failed");
      Alert.alert(error.message);
      return [];
    }
  }
  
  return (
    <DoctorContext.Provider
      value={{
        getDoctors,
        getOneDoctor,
        getAllDepartmentDoctors,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}
