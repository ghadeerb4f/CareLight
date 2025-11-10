// import { createContext, useEffect, useState } from "react";
// import { account } from "../lib/appwrite";
// import { ID } from "react-native-appwrite";
// import { databases } from "../lib/appwrite";
// import { Alert } from "react-native";
// export const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [authChecked, setAuthChecked] = useState(false);

//   async function login(email, password) {
//     try {
//       await account.createEmailPasswordSession(email, password);
//       const response = await account.get();
//       setUser(response);
//     } catch (error) {
//       throw Error(error.message);
//     }
//   }

//   async function register(
//     email,
//     password,
//     DoctorOrPatient,
//     doctorName,
//     department
//   ) {
//     if (!DoctorOrPatient) {
//       try {
//         await account.create(ID.unique(), email, password);
//         await login(email, password);
//         await account.updateName(DoctorOrPatient ? "doctor" : "patient");
//       } catch (error) {
//         Alert.alert(error.message);
//       }
//       return;
//     } else {
//       if (DoctorOrPatient && (doctorName === "" || department === "")) {
//         Alert.alert("please fill all fields");
//         return;
//       }
//       try {
//         const response = await databases.createDocument(
//           //  real "690c8e21002a31480d08"
//           "690f053400006324bbde",
//           "doctorr",
//           "unique()",
//           {
//             doctorName,
//             department,
//             email,
//           }
//         );
//         await account.create(ID.unique(), email, password);
//         console.log("finished creating account");

//         await login(email, password);
//         console.log("finished logging in");
//         await account.updateName(DoctorOrPatient ? "doctor" : "patient");
//         console.log("finished updating name");
//         Alert.alert("Doctor added to database");
//       } catch (error) {
//         Alert.alert(error.message);
//       }
//     }
//   }

//   async function logout() {
//     await account.deleteSession("current");
//     setUser(null);
//   }

//   async function getInitialUserValue() {
//     try {
//       const res = await account.get();
//       setUser(res);
//     } catch (error) {
//       setUser(null);
//     } finally {
//       setAuthChecked(true);
//     }
//   }

//   useEffect(() => {
//     getInitialUserValue();
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         register,
//         authChecked,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// // Wrap the UserProvider component around the root layout stack

// import { createContext, useEffect, useState } from "react";
// import { account } from "../lib/appwrite";
// import { ID } from "react-native-appwrite";
// import { databases } from "../lib/appwrite";
// import { Alert } from "react-native";

// export const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [authChecked, setAuthChecked] = useState(false);
//   function updateUserIfChanged(newUser) {
//     setUser((prevUser) => {
//       if (!prevUser || prevUser.$id !== newUser.$id) {
//         return newUser;
//       }
//       return prevUser;
//     });
//   }

//   async function login(email, password) {
//     console.log("login function start");
//     try {
//       await account.createEmailPasswordSession(email, password);
//       const response = await account.get();
//       updateUserIfChanged(response);
//       console.log("login function end");
//     } catch (error) {
//       throw Error(error.message);
//     }
//   }

//   async function register(
//     email,
//     password,
//     DoctorOrPatient,
//     doctorName,
//     department
//   ) {
//     console.log("register function start");
//     if (!DoctorOrPatient) {
//       try {
//         await account.create(ID.unique(), email, password);
//         await login(email, password);
//         await account.updateName("patient");
//       } catch (error) {
//         Alert.alert(error.message);
//       }
//       return;
//     } else {
//       if (doctorName === "" || department === "") {
//         Alert.alert("Please fill all fields");
//         return;
//       }
//       try {
//       //   await databases.createDocument(
//       //     "690c8e21002a31480d08",
//       //     "doctors",
//       //     ID.unique(),
//       //     { doctorName, department, email }
//       //   );
//         await account.create(ID.unique(), email, password);
//         // await login(email, password);
//         await account.updateName("doctor");
//         console.log("register function end");
//         Alert.alert("Doctor added to database");
//       } catch (error) {
//         Alert.alert(error.message);
//       }
//     }
//   }

//   async function logout() {
//     await account.deleteSession("current");
//     setUser(null);
//   }

//   async function getInitialUserValue() {
//     try {
//       const res = await account.get();
//       updateUserIfChanged(res);
//     } catch (error) {
//       setUser(null);
//     } finally {
//       console.log("auth true")
//       setAuthChecked(true);
//     }
//   }

//   useEffect(() => {
//     console.log("initializing function");
//     getInitialUserValue();
//     console.log("finish initializing")
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         register,
//         authChecked,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }
import { createContext, useEffect, useState } from "react";
import { account, databases } from "../lib/appwrite";
import { ID } from "react-native-appwrite";
import { Alert } from "react-native";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);
    } catch (error) {
      throw Error(error.message);
    }
  }

  async function register(email, password, DoctorOrPatient, doctorName, department) {
    try {
      email = email.toLowerCase();
      if (!DoctorOrPatient) {
        await account.create(ID.unique(), email, password);
        await login(email, password);
        await account.updateName("patient");
        Alert.alert("Patient registered successfully");
      } else {
        
        if ( doctorName === "" || department === "") {
          Alert.alert("Please fill all fields");
          return;
        }
        await account.create(ID.unique(), email, password);
        await login(email, password);
        await account.updateName("doctor");
        console.log(doctorName + department + email);
        await databases.createDocument(
        // "690c8e21002a31480d08",
        "691075950022f78a1f2f",
          "doctors",              
          ID.unique(),
          { doctorName, department, email }
        );
        console.log("Docoter added successfully")
      }

      const updatedUser = await account.get();
      setUser(updatedUser);
    } catch (error) {
      Alert.alert(error.message);
      console.log(error.message);
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function getInitialUserValue() {
    try {
      const res = await account.get();
      setUser(res);
    } catch {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        authChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}