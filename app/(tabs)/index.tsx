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
    {/* <View>
      <TypeWriter style={{color: "#ddd"}}  typing={1} typing={-1} loop={true} speed={200} >Hello, welcome to the Pet Patch.</TypeWriter>
    </View> */} 
      <TypeAnimation
        sequence={[
          { text: "Welcome to the Pet Patch!" },
          { text: "Ready to find your forever friend?" },
        ]}
        cursorStyle={{
          fontWeight: "semibold"
        }}
        loop
        delayBetweenSequence={2000}
        style={{
          color: "grey",
          fontSize: 40,
          fontWeight: 600,
          fontFamily: "Georgia",
          textAlign: "center",
        }}
      />

        {/* <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}
        <View style={styles.contactForm}>
          <Text style={styles.contactForm1} >Name:</Text>
          <TextInput style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          />
          <Text style={styles.contactForm1}>Email:</Text>
          <TextInput style={styles.input}
          placeholder = "Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          />
          <Text style={styles.contactForm1}>Phone:</Text>
          <TextInput style={styles.input}
          placeholder = "Phone"
          value={message}
          onChangeText={setMessage}
          multiline ={true}
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.submitButton}>Submit</Text>
              
          </TouchableOpacity>
          
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
});
