
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import ThemedView from '../components/ThemedView';

const slides = [
  {
    key: '1',
    title: 'Your \nHealth \n Comes\n First',
    text: '',
    image: require('../assets/introimg1.png'),
    backgroundColor: '#6749A4',
  },
  {
    key: '2',
    title: '',
    text: 'Heartfelt\n Medical\n Care',
    image1: require('../assets/introimg2.png'),
    backgroundColor: '#6749A4',
  },
  {
    key: '3',
    text1: 'Chat  with Your \n Doctor  Anytime',
    image2: require('../assets/introimg3.png'),
    backgroundColor: '#6749A4',
  },
];

const renderItem = ({ item }) => (
  <ThemedView style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.text}>{item.text}</Text>
    <Text style={styles.text1}>{item.text1}</Text>
    {item.image && <Image source={item.image} style={styles.image} />}
    {item.image1 && <Image source={item.image1} style={styles.image1} />}
    {item.image2 && <Image source={item.image2} style={styles.image2} />}
  </ThemedView>
);

export default function WelcomeScreen({ onDone }) {
  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
      showSkipButton
      onSkip={onDone}
      bottomButton
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  image: {
    width: 350,
    height: 450,
    marginBottom: 30,
    marginHorizontal: -230,
  },
  image1: {
    width: 350,
    height: 450,
    marginHorizontal: -100,
  },
  image2: {
    width: 350,
    height: 450,
    marginHorizontal: -370,
    marginTop: -230,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: -15,
    marginTop: -310,
  },
  text1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 60,
    marginTop: 400,
  },
});