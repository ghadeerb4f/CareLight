// import {
//   Keyboard,
//   StyleSheet,
//   Text,
//   TouchableWithoutFeedback,
// } from "react-native";
// import { Link } from "expo-router";
// import { useState } from "react";
// import { useUser } from "../../hooks/useUser";

// import ThemedView from "../../components/ThemedView";
// import ThemedText from "../../components/ThemedText";
// import Spacer from "../../components/Spacer";
// import ThemedButton from "../../components/ThemedButton";
// import ThemedTextInput from "../../components/ThemedTextInput";
// import { Colors } from "../../constants/Colors";

// const Register = () => {
//   console.log("we reached register");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [doctorName, setDoctorName] = useState("");
//   const [department, setDepartment] = useState("");
//   const [error, setError] = useState(null);
//   const [doctorOrPatient, setDoctorOrPatient] = useState(false);
//   const { register } = useUser();

//   const handleSubmit = async () => {
//     setError(null);

//     try {
//       await register(email, password, doctorOrPatient, doctorName, department);
//     } catch (error) {
//       setError(error.message);
//     }
//   };
//   function patient() {
//     setDoctorOrPatient(false);
//   }
//   function doctor() {
//     setDoctorOrPatient(true);
//   }
//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <ThemedView style={styles.container}>
//         <Spacer />
//         <ThemedText title={true} style={styles.title}>
//           Register an Account
//         </ThemedText>

//         <Spacer />
//         <ThemedTextInput
//           style={{ marginBottom: 20, width: "80%" }}
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />

//         <ThemedTextInput
//           style={{ marginBottom: 20, width: "80%" }}
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />
//         {doctorOrPatient && (
//           <>
//             <ThemedTextInput
//               style={{ marginBottom: 20, width: "80%" }}
//               placeholder="Doctor Name"
//               value={doctorName}
//               onChangeText={setDoctorName}
//             />

//             <ThemedTextInput
//               style={{ marginBottom: 20, width: "80%" }}
//               placeholder="Department"
//               value={department}
//               onChangeText={setDepartment}
//             />
//           </>
//         )}
//         <ThemedView style={styles.doctorpatient}>
//           {/* only for doctors */}
//           <ThemedButton
//             onPress={patient}
//             style={{
//               margin: 10,
//               backgroundColor: doctorOrPatient ? "gray" : Colors.primary,
//               transform: [{ scale: !doctorOrPatient ? 1.1 : 1 }],
//             }}
//           >
//             <Text style={{ color: "#f2f2f2" }}>Patient</Text>
//           </ThemedButton>
//           <ThemedButton
//             onPress={doctor}
//             style={{
//               margin: 10,
//               backgroundColor: !doctorOrPatient ? "gray" : Colors.primary,
//               transform: [{ scale: doctorOrPatient ? 1.1 : 1 }],
//             }}
//           >
//             <Text style={{ color: "#f2f2f2" }}>Doctor</Text>
//           </ThemedButton>
//         </ThemedView>
//         <ThemedButton onPress={handleSubmit}>
//           <Text style={{ color: "#f2f2f2" }}>Register</Text>
//         </ThemedButton>

//         <Spacer />
//         {error && <Text style={styles.error}>{error}</Text>}

//         <Spacer height={100} />
//         <Link href="/login">
//           <ThemedText style={{ textAlign: "center" }}>Login instead</ThemedText>
//         </Link>
//       </ThemedView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default Register;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 18,
//     marginBottom: 30,
//   },
//   error: {
//     color: Colors.warning,
//     padding: 10,
//     backgroundColor: "#f5c1c8",
//     borderColor: Colors.warning,
//     borderWidth: 1,
//     borderRadius: 6,
//     margin: 10,
//   },
//   doctorpatient: {
//     flexDirection: "row",
//     alignContent: "center",
//     justifyContent: "center",
//   },
// });
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { useUser } from "../../hooks/useUser";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput";
import { Colors } from "../../constants/Colors";
import { SelectList } from "react-native-dropdown-select-list";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [department, setDepartment] = useState(""); // ✅ هذا هو المتغير الذي سنربطه بالقائمة
  const [error, setError] = useState(null);
  const [doctorOrPatient, setDoctorOrPatient] = useState(false);
  const { register } = useUser();
  // all done
  const data = [
    { key: "1", value: "Cardiology" },
    { key: "2", value: "Otolaryngology" },
    { key: "3", value: "Child Care" },
    { key: "4", value: "Ophthalmology" },
    { key: "5", value: "Pulmonology" },
  ];

  const handleSubmit = async () => {
    setError(null);
    try {
      await register(email, password, doctorOrPatient, doctorName, department);
    } catch (error) {
      setError(error.message);
    }
  };

  function patient() {
    setDoctorOrPatient(false);
  }

  function doctor() {
    setDoctorOrPatient(true);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Register an Account
        </ThemedText>

        <Spacer />
        <ThemedTextInput
          style={{
            marginBottom: 20,
            width: "80%",
            borderColor: "#6749A4",
            borderWidth: 2,
          }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <ThemedTextInput
          style={{
            marginBottom: 20,
            width: "80%",
            borderColor: "#6749A4",
            borderWidth: 2,
          }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {doctorOrPatient && (
          <>
            <ThemedTextInput
              style={{
                marginBottom: 20,
                width: "80%",
                borderColor: "#6749A4",
                borderWidth: 2,
              }}
              placeholder="Doctor Name"
              value={doctorName}
              onChangeText={setDoctorName}
            />

            <SelectList
              setSelected={setDepartment} // ✅ ربط مباشر مع department
              data={data}
              save="value"
              placeholder="Select Department"
              boxStyles={{
                marginBottom: 20,
                width: "80%",
                borderColor: "#6749A4",
                borderWidth: 2,
              }}
            />
          </>
        )}

        <ThemedView style={styles.doctorpatient}>
          <ThemedButton
            onPress={patient}
            style={{
              margin: 10,
              backgroundColor: doctorOrPatient ? "gray" : Colors.primary,
              transform: [{ scale: !doctorOrPatient ? 1.1 : 1 }],
            }}
          >
            <Text style={{ color: "#f2f2f2" }}>Patient</Text>
          </ThemedButton>

          <ThemedButton
            onPress={doctor}
            style={{
              margin: 10,
              backgroundColor: !doctorOrPatient ? "gray" : Colors.primary,
              transform: [{ scale: doctorOrPatient ? 1.1 : 1 }],
            }}
          >
            <Text style={{ color: "#f2f2f2" }}>Doctor</Text>
          </ThemedButton>
        </ThemedView>

        <Spacer />
        <ThemedButton onPress={handleSubmit}>
          <Text style={{ color: "#f2f2f2" }}>Register</Text>
        </ThemedButton>

        <Spacer />
        {error && <Text style={styles.error}>{error}</Text>}

        <Spacer height={10} />
        <Link href="/login" replace>
          <ThemedText style={{ textAlign: "center" }}>Login instead</ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
export default Register;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 18,
//     marginBottom: 30,
//   },
//   error: {
//     color: Colors.warning,
//     padding: 10,
//     backgroundColor: "#f5c1c8",
//     borderColor: Colors.warning,
//     borderWidth: 1,
//     borderRadius: 6,
//     margin: 10,
//   },
//   doctorpatient: {
//     flexDirection: "row",
//     alignContent: "center",
//     justifyContent: "center",
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "#6749A4",
    fontSize: 34,
    marginBottom: 30,
    fontWeight: "bold",
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: "#f5c1c8",
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    margin: 10,
  },
  doctorpatient: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
});
