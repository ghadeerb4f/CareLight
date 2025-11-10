import { StyleSheet, Text, Keyboard, TouchableWithoutFeedback , View , TextInput , TouchableOpacity,Linking} from 'react-native'
import { Link } from 'expo-router'
import { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { Ambulance  ,Siren} from 'lucide-react-native';
// import ThemedView from '../../components/ThemedView'
// import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import { SafeAreaView } from 'react-native-safe-area-context'
// import ThemedButton from '../../components/ThemedButton'
// import ThemedTextInput from "../../components/ThemedTextInput"
// import { Colors } from '../../constants/Colors'
// import { Scale } from 'lucide-react-native'


import { useColorScheme } from 'react-native';
 import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
  function Login(){
    
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState()

  const { login } = useUser()

  const handleSubmit = async () => {
    setError(null)

    try {
      await login(email, password)
    } catch (error) {
      setError(error.message)
    }
  }

  const phoneNumber = '110'; // ضع الرقم الذي تريد الاتصال به

  const makeCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
const colorScheme = useColorScheme();

  const iconColor = colorScheme === 'dark' ? '#FFFFFF' : '#6749A4';
 const isDark = colorScheme === 'dark';


 const buttonBackgroundColor = isDark ? '#2B7CCE' : '#6849a7'; 

  return (<SafeAreaView style={{ flex: 1 }}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <ThemedView style={styles.container}>
            <Spacer/>
            <ThemedText style={styles.header}>LOGIN </ThemedText>
            {/* <Button title=  onPress={makeCall} /> */}
<TouchableOpacity onPress={makeCall}>
  <Ambulance
            size={34} 
            color={iconColor} 
          />
</TouchableOpacity>

            
            <ThemedText style={{marginBottom:10}}>Email</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Spacer/>
            <ThemedText style={{marginBottom:10}}>Password</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { backgroundColor: buttonBackgroundColor }]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <Spacer/>
            <Text style={styles.Text}>Dont you have an acount?</Text>
            <Link href="register" replace>
              <ThemedText style={{textDecorationLine: 'underline',textAlign:'center'}}>Registerr</ThemedText>
            </Link>

                    {/* <View style={styles.buttonContainer2}>
                  <TouchableOpacity style={styles.button1} onPress={() => user.login(email, password)}>
              <Text style={styles.buttonText}>Doctor</Text>
            </TouchableOpacity>

                    <TouchableOpacity style={styles.button1} onPress={() => user.register(email, password)}>
              <Text style={styles.buttonText}>patient</Text>
            </TouchableOpacity>

              
              
              
              
            </View> */}
            </View>
          </ThemedView>
        </TouchableWithoutFeedback></SafeAreaView>
  );
}
export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 16,
   top:-10,
    zIndex:1000,
    // position:'absolute',
    justifyContent:'center',
    alignItems:'center'
  },
  header: {
    textAlign:'center',
    // color:'#6749A4',
    fontSize: 34,
    marginBottom: 60,
    fontWeight:'bold'
  },
  button:{
     elevation: 5 ,
    backgroundColor:'#6749A4',
    color:'#fffdfdff',
    borderRadius:5,
    padding:10,
    //width:90,
   marginTop:5,
   alignItems:'center'
  
  },
  button1:{
    elevation: 5 ,
    backgroundColor:'#6749A4',
    color:'#fffdfdff',
    borderRadius:5,
    padding:10,
    //width:90,
   marginTop:5,
   textAlign:'center',

  
  },
  buttonText:{color:'#fff',
    fontSize:16,
    fontFamily:'Roboto',


  },
  input: {
  
  width:'90%',
    height: 60,
    borderColor: "#6749A4",
    borderWidth: 2,
    marginBottom: 10,
   backgroundColor:'#FFF' ,
    borderRadius:10
  },
  buttonContainer: {
    flexDirection: "column",
     justifyContent:'center', 
    //  alignItems:'center',
    
     
  },
  buttonContainer2: {
    display:'flex',
    flexDirection: "row",
  marginTop:20,
justifyContent:'space-between',


  
     
  },
  Text:{
    textAlign:'center'
  }
});

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <ThemedView style={styles.container}>
        
//         <Spacer />
//         <ThemedText title={true} style={styles.title}>
//           Login to Your Account
//         </ThemedText>

//         {/* <TextInput placeholder="Email" /> */}

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


//         <ThemedButton onPress={handleSubmit}>
//           <Text style={{ color: '#f2f2f2' }}>Login</Text>
//         </ThemedButton>

//         <Spacer />
//         {error && <Text style={styles.error}>{error}</Text>}

//         <Spacer height={100} />
//         <Link href="/register" replace>
//           <ThemedText style={{ textAlign: "center" }}>
//             Register instead
//           </ThemedText>
//         </Link>

//         {/* <ActivityIndicator size="large" color="white" /> */}

//       </ThemedView>
//     </TouchableWithoutFeedback>
//   )
// }

// export default Login

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 18,
//     marginBottom: 30
//   },
//   error: {
//     color: Colors.warning,
//     padding: 10,
//     backgroundColor: '#f5c1c8',
//     borderColor: Colors.warning,
//     borderWidth: 1,
//     borderRadius: 6,
//     marginHorizontal: 10,
//   }
// })