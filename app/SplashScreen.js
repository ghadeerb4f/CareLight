
import { View, Text, StyleSheet,Image } from 'react-native';
import logo from '../assets/logo.png'
import LottieView from 'lottie-react-native';


export default function SplashScreen() {
    
  // const loadingAnimation = require('../assets/Emergency Hospital.json');
  // const loadingAnimation = require('../assets/ambulancia.json');
  const loadingAnimation = require('../assets/hospital.json');
  // const loadingAnimation = require('../assets/Loading.json');

  return (
    <View style={styles.container}>
        <Image source={logo} style={styles.img}/>
      {/* <Text style={styles.text}>A smarter way to manage your health</Text> */}
      <Text style={styles.text}> Anytime-Anywhere</Text>
      <View >
      <LottieView
        source={loadingAnimation}
        autoPlay // تبدأ الحركة تلقائيًا
        loop    // تتكرر الحلقة باستمرار (مثالي للتحميل)
        style={styles.lottie}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 27,
    color: '#627AE0',
    fontWeight:'bold'
  },
  img:{
    width:400,
    height:400,
    resizeMode:'cover'
  },
  lottie: { width: 200, height: 200 },
});





