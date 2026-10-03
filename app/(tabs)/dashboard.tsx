import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
// import Typewriter from 'typewriter-effect';
//import TypeWriter from '@sucho/react-native-typewriter';
import { ViewComponent } from 'react-native';
import {TypeAnimation} from 'react-native-type-animation';

import { View, TextInput, Text } from 'react-native';

import MapView from 'react-native-maps';
import { useState } from 'react';

export default function TabTwoScreen() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
    const formData = {name, email, message};
    setName('');
    setEmail('');
    setMessage('');
    console.log('Form Submitted', formData);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#CCD5AE', dark: '#CCD5AE' }}
      headerImage={
        <Image
          source={require('@//assets/images/namelogo.png')}
          style={styles.reactLogo}
        />
      }>  
    <View>
      <Text style={styles.headertext}> 
        Our Message
      </Text>
      <Text style={styles.messagetext}>
        Hello, welcome to the Pet Patch, the fastest way to get connected with a pet meant for you. Every animal deserves a home, we’re here to pair you up with a forever friend. It’s a real, daily problem that overpopulation in adoption centers leads to animal neglect and death. Now you wonder, what do we do? Pet Patch connects people to the pet meant for them, select what characteristics you're looking for, then let our search features do the rest. We work with and utilize one of the biggest animal adoption indexes throughout the US, working with hundreds of adoption centers to get accurate statistics allowing us to pinpoint the perfect pet. With accessibility being increased, Pet Patch works to fight back against the mistreated pet epidemic of America pairing owners with their forever friends, one pet at a time. 
      </Text>
    </View>
    <View>
      <Text style={styles.headertext}> 
        About Me

      </Text>
      <Text style={styles.messagetext}>
        Hi, my name is Darian Kell. I created Pet Patch as a way for people to find their perfect pet. I created this app not only for the Congressional App Challenge, but to help combat the stark reality of pet neglect. According to the Human Animal Bond Research Institute, 95% of Americans who own a pet consider their pet a companion for life, imagine if everyone had this opportunity. That’s where I started digging deeper, over 60% of Americans stated that they wanted to own a pet they just didn’t know where to start or where to look. That’s where Pet Patch steps in. I’m not only a coder but a high school student who also owns a pet, my dog; Obi. I understand that owning a pet is no easy task but having a pet that matches your environment, personality and more is a step in the right direction. 
      </Text>
    </View>
  </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  submitButton:{
    fontSize: 23,
    color: '#808080',
    fontFamily: "Georgia",
    fontWeight: 600,
    textAlign: 'center',
    marginTop: 20,

  },
  input:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#808080',
  },
  contactForm1:{
    fontSize: 23,
    color: '#808080',
    fontFamily: "Georgia",
    fontWeight: 600
  },
  contactForm:{
    padding: 50,
    textAlign: 'center',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: 150,
    width: 150,
    position: 'absolute',
    top: '20%',
    left: '32%',
    borderRadius: 0
  },
  headertext: {
    color: "grey",
    fontSize: 40,
    fontWeight: 600,
    fontFamily: "Georgia",
    textAlign: "center",
  },
  messagetext: {
        color: "grey",
    fontSize: 20,
    fontWeight: 200,
    fontFamily: "Georgia",
    textAlign: "center",
    lineHeight: 24
  },
});
