import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import pic1 from '../../../assets/woma.png'
import pic2 from '../../../assets/blank.jpg'
import { FontAwesome } from '@expo/vector-icons';

const Meet = () => {
  return (
   <>
      <View style={styles.container}>
        <Text style={styles.texto}>MEET OUR TEAM </Text>
        <View style={styles.div1}>
   <Image source={pic1} style={styles.img1} />
   <Text style={styles.texto1}>Haneen Zahra</Text>
   <Text  style={styles.texto2}>Frontend Developer</Text>
   <View style={styles.container2}> 
    <FontAwesome name="facebook" size={23} color="#3b5998" />
      <FontAwesome name="instagram" size={23} color="#C13584" />
    <FontAwesome name="twitter" size={23} color="#1DA1F2" />
    <FontAwesome name="linkedin" size={23} color="#0077B5" />
    <FontAwesome name="youtube" size={23} color="#FF0000" />
    </View>
   


      </View >
      <View style={styles.container1}>
        <View><View style={styles.div2}>
               <Image source={pic2} style={styles.img} />
   <Text  style={styles.texto3}>Mohammd Mousa</Text>
   <Text  style={styles.texto4}>Backend Developer</Text>
   <View style={styles.container3}> 
    <FontAwesome name="facebook" size={23} color="#3b5998" />
      <FontAwesome name="instagram" size={23} color="#C13584" />
    <FontAwesome name="twitter" size={23} color="#1DA1F2" />
    <FontAwesome name="linkedin" size={23} color="#0077B5" />
    <FontAwesome name="youtube" size={23} color="#FF0000" />
    </View>
      </View>
       <View style={styles.div2}>
         <Image source={pic2} style={styles.img} />
   <Text  style={styles.texto3}>Ghadeer Soliman</Text>
   <Text  style={styles.texto4}>Backend Developer</Text>
    <View style={styles.container3}> 
    <FontAwesome name="facebook" size={23} color="#3b5998" />
      <FontAwesome name="instagram" size={23} color="#C13584" />
    <FontAwesome name="twitter" size={23} color="#1DA1F2" />
    <FontAwesome name="linkedin" size={23} color="#0077B5" />
    <FontAwesome name="youtube" size={23} color="#FF0000" />
    </View>
      </View></View>
         <View><View style={styles.div2}>
           <Image source={pic1} style={styles.img}/>
   <Text  style={styles.texto3}>Inaara Ajweh</Text>
   <Text  style={styles.texto4}>Graphic Designer</Text>
    <View style={styles.container3}> 
    <FontAwesome name="facebook" size={23} color="#3b5998" />
      <FontAwesome name="instagram" size={23} color="#C13584" />
    <FontAwesome name="twitter" size={23} color="#1DA1F2" />
    <FontAwesome name="linkedin" size={23} color="#0077B5" />
    <FontAwesome name="youtube" size={23} color="#FF0000" />
    </View>
      </View>
       <View style={styles.div2}>
           <Image source={pic1} style={styles.img} />
   <Text  style={styles.texto3}>Sozan Hassan</Text>
   <Text  style={styles.texto4}>UI/UX Designer</Text>
    <View style={styles.container3}> 
    <FontAwesome name="facebook" size={23} color="#3b5998" />
      <FontAwesome name="instagram" size={23} color="#C13584" />
    <FontAwesome name="twitter" size={23} color="#1DA1F2" />
    <FontAwesome name="linkedin" size={23} color="#0077B5" />
    <FontAwesome name="youtube" size={23} color="#FF0000" />
    </View>
      </View></View>
       
      </View>

      </View>
      
   </>
  )
}

export default Meet

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width:60,
    height:60,
    borderRadius:50,
   marginLeft:50,
  bottom:22
  },
  img1: {
    width:70,
    height:70,
    borderRadius:50,
   marginLeft:150,
   bottom:25
  },
  texto : {
    fontSize:32,
    color:"#6749A4",
  marginBottom:30
  },
  div1:{
    width:360,
    height:160,
    backgroundColor:"#F8F6F9",
     borderWidth: 1,
    borderColor: '#b4b2b2ff',
    borderRadius: 10,
    borderStyle: 'solid'

  },
  container1:{
    gap:23, 
    flexDirection:"row",
    justifyContent:"space-between"
   
  },
  div2:{
    width:170,
    height:187,
    backgroundColor:"#F8F6F9",
     borderWidth: 1,
    borderColor: '#b4b2b2ff',
    borderRadius: 10,
    borderStyle: 'solid',
    marginTop:37
  },
  texto1:{
    textAlign:"center",
    fontSize:18,
  bottom:20
  },
  texto2:{
      textAlign:"center",
    fontSize:20,
    fontWeight:"bold",
  bottom:10
  },
  texto3:{
    textAlign:"center",
    fontSize:16
  },
  texto4:{
    marginTop:8,
      textAlign:"center",
    fontSize:16,
    fontWeight:"bold"
  },
  container2:{
    flexDirection:"row",
    gap:10,
    marginLeft:107,
    marginTop:10
  },
   container3:{
    flexDirection:"row",
    gap:10,
    marginLeft:19,
    marginTop:20
  }
})