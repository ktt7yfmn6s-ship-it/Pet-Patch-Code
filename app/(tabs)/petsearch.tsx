import axios from 'axios';
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState, Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {decode} from 'html-entities';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
// import MapView from 'react-native-maps';
//import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated;



export default function HomeScreen() {
  const scrollViewRef = useRef(null);
  const [energy, setEnergylevel] = useState(null)  
  const [agegroup, setAge] = useState(null)
  const [gender, setSex] = useState(null)
  const [size, setSizegroup] = useState(null)
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true);
  const[error,setError]= useState(null);
  const[page,setPage] = useState(1);
  const[temp_zipCode, setTempZip] =useState('');
  const[zipCode, setZip] = useState(94566);
  const[miles,setMilesaway] = useState(100);


  useEffect (() => {
    console.log(energy,agegroup,gender,size);

  }, [energy,agegroup,gender,size])

  useEffect (() => {
    let data = zipCode ? {
      "data": {
        "filters": [
          {
            "fieldName": "animals.sizeGroup",
            "operation": "equal",
            "criteria": size ? size : ["Small", "Medium", "Large"]
          },
          {
            "fieldName": "animals.energyLevel",
            "operation": "equal",
            "criteria": energy ? energy : ["Low", "Moderate", "High"]
          },
          {
            "fieldName": "animals.ageGroup",
            "operation": "equal",
            "criteria": agegroup ? agegroup : ["Baby", "Adult", "Senior"]
          },
          {
            "fieldName": "animals.sex",
            "operation": "equal",
            "criteria": gender ? gender : ["Male", "Female"]
          },
          {
            "fieldName" : "animals.descriptionText",
            "operation" : "notblank"
          },
          {
            "fieldName" : "animals.pictureThumbnailUrl",
            "operation" : "notblank"
          },
          // {
          //   "fieldName" : "animals.url",
          //   "operation" : "notblank"
          // },
        ],
        "filterRadius":{
          "miles": miles,
          "postalcode": zipCode
        }
      }
      }: {
      "data": {
        "filters": [
          {
            "fieldName": "animals.sizeGroup",
            "operation": "equal",
            "criteria": size ? size : ["Small", "Medium", "Large"]
          },
          {
            "fieldName": "animals.energyLevel",
            "operation": "equal",
            "criteria": energy ? energy : ["Low", "Moderate", "High"]
          },
          {
            "fieldName": "animals.ageGroup",
            "operation": "equal",
            "criteria": agegroup ? agegroup : ["Baby", "Adult", "Senior"]
          },
          {
            "fieldName": "animals.sex",
            "operation": "equal",
            "criteria": gender ? gender : ["Male", "Female"]
          }
          ]
        }
      }

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.rescuegroups.org/v5/public/animals/search/available',
        headers: {
          'Authorization': 'rDCEZckr',
        },
        params: {
              'limit': 5,
              'page' : page,
              'fields[animals]':'distance,name,descriptionText,ageString,pictureThumbnailUrl, url',
              // 'sort' : '+animals.distance'
        },
        data : data
      };

    axios(config)
      .then(function (response) {
        setData(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    // axios.get('https://api.rescuegroups.org/v5/public/animals/search/available?limit=5', {
    //   headers: {
    //       "Authorization": "rDCEZckr"
    //   }, 
    //   params: {
    //      "page": page
    //    }
    // })
    // .then(response => {
    //   setData(response.data.data);
    //   setLoading(false);
    // })
    // .catch(error => {
    //   setError(error);
    //   setLoading(false);
    // });
  }, [page,energy, agegroup, gender, size, zipCode, miles]);

  useEffect (() => {
    setPage(1)
  }, [energy, agegroup, gender, size, zipCode, miles])
    
  // useEffect (() => {
  //   console.log(data);

  // }, [data])

  function decreasePage(){
    if (page>1){
      setPage(page-1)
    }
  }
  function increasePage(){
    if (page<290){
      setPage(page+1)
    }
  }
  function scrollToTop(){
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }
  function pageRight(){
    increasePage()
    scrollToTop()

  }
  function pageLeft(){
    decreasePage()
    scrollToTop()
  }
  function filterRadius(){
    setZip(parseInt(temp_zipCode));
    setTempZip('');
  }

  function filterClear(){
    setEnergylevel(null);
    setAge(null);
    setSex(null);
    setSizegroup(null);
    setMilesaway(100);
    energyDropRef.current.reset();
    ageDropRef.current.reset();
    sexDropRef.current.reset();
    sizeDropRef.current.reset();
    milesAwayDropRef.current.reset();
  }
  

  const emojisWithIcons = [
    {title: 'happy', icon: 'emoticon-happy-outline'},
    {title: 'cool', icon: 'emoticon-cool-outline'},
    {title: 'lol', icon: 'emoticon-lol-outline'},
    {title: 'sad', icon: 'emoticon-sad-outline'},
    {title: 'cry', icon: 'emoticon-cry-outline'},
    {title: 'angry', icon: 'emoticon-angry-outline'},
    {title: 'confused', icon: 'emoticon-confused-outline'},
    {title: 'excited', icon: 'emoticon-excited-outline'},
    {title: 'kiss', icon: 'emoticon-kiss-outline'},
    {title: 'devil', icon: 'emoticon-devil-outline'},
    {title: 'dead', icon: 'emoticon-dead-outline'},
    {title: 'wink', icon: 'emoticon-wink-outline'},
    {title: 'sick', icon: 'emoticon-sick-outline'},
    {title: 'frown', icon: 'emoticon-frown-outline'},
  ];


  const energyDropRef= useRef({})
  const energylevel= [
    {title: 'Low', icon: 'battery-outline'},
    {title: 'Moderate', icon: 'battery-medium'},
    {title: 'High', icon: 'battery-high'},
  ]
  const ageDropRef= useRef({})
  const age= [
    {title: 'Baby', icon: 'baby-face-outline'},
    {title: 'Adult', icon: 'face-man'},
    {title: 'Senior', icon: 'walk'},
  ]
  const sexDropRef= useRef({})
  const sex= [
    {title: 'Male', icon: 'gender-male'},
    {title: 'Female', icon: 'gender-female'},
  ]
  const sizeDropRef= useRef({})
  const sizegroup= [
    {title: 'Small', icon: 'dog-side', sizes: 16},
    {title: 'Medium', icon: 'dog-side', sizes: 24},
    {title: 'Large', icon: 'dog-side', sizes: 32},
  ]
  const milesAwayDropRef = useRef({})
  const milesaway= [
    {title: '25 miles'},
    {title: '50 miles'},
    {title: '100 miles'},
    {title: '200 miles'},
  ]



  return (
    <GestureHandlerRootView>
    <ScrollView ref = {scrollViewRef}>
    <ParallaxScrollView 
      headerBackgroundColor={{ light: '#CCD5AE', dark: '#CCD5AE' }}
      headerImage={
        <Image
          source={require('@//assets/images/namelogo.png')}
          style={styles.reactLogo}
          
        />
      }>
  
      <ThemedView style={styles.titleContainer}>
        <Text style={styles.title}>Pet Finder</Text>
      <View style={styles.dropDowns}>

        <SelectDropdown
          ref={energyDropRef}
          data={energylevel}
          onSelect={(selectedItem, index) => {
            setEnergylevel(selectedItem.title) 
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || 'Select your pet energy level!'}
                </Text>
                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
          />
        <SelectDropdown
            ref={sizeDropRef}
            data={sizegroup}
            onSelect={(selectedItem, index) => {
              setSizegroup(selectedItem.title) 
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Icon name={selectedItem.icon} style={styles.dropdownSizeItemIconStyle} size={selectedItem.sizes} />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Select your pet size!'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Icon name={item.icon}  style={styles.dropdownSizeItemIconStyle} size={item.sizes}/>
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            />
        <SelectDropdown
            ref={milesAwayDropRef}
            data={milesaway}
            onSelect={(selectedItem, index) => {
              setMilesaway(selectedItem.title) 
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Icon name={selectedItem.icon} style={styles.dropdownSizeItemIconStyle} size={selectedItem.sizes} />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Select how far away!'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Icon name={item.icon}  style={styles.dropdownSizeItemIconStyle} size={item.sizes}/>
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            />
        

          <SelectDropdown
            ref = {ageDropRef}
            data={age}
            onSelect={(selectedItem, index) => {
              setAge(selectedItem.title) 
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Select your pet age range!'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            
            />
            </View>
            <View style={{justifyContent: "center",...styles.row}}>
          <SelectDropdown
            ref = {sexDropRef}
            data={sex}
            onSelect={(selectedItem, index) => {
              setSex(selectedItem.title) 
              
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  {selectedItem && (
                    <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                  )}
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) || 'Select your pet gender!'}
                  </Text>
                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            />
            </View>
        <SafeAreaProvider>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={setTempZip}
              value={temp_zipCode}
              placeholder='Enter Zip Code.                  '
              placeholderTextColor="black"
              keyboardType = "numeric"
            />
            <TouchableOpacity  style={styles.filter} onPress={filterRadius}>
              <Text> Filter </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filter} onPress={filterClear}>
              <Text> Clear Filters </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaProvider>
          <View style={styles.petGrid}>
            {data == undefined || data.length == 0 ? (
              <View style={styles.alignment}>
              <Text style={styles.color}> No pets found,</Text> 
              <Text style={styles.color}>try adjusting your filters! </Text>
              </View>
            ) : (
              data.map((pet) => (
                <View key={pet.id}>
                  <View style={styles.petCard}>
                      <Image
                        style={styles.petImage}
                        source = {pet.attributes.pictureThumbnailUrl}
                      />
                      <Text style={styles.petName}>{pet.attributes.name}</Text>
                      <Text style={styles.petAge}>{pet.attributes.ageString}</Text> 
                      <Text style={styles.petText}>{decode(pet.attributes.descriptionText)}</Text>
                      <Text style={styles.petText}>{pet.attributes.url}</Text>
                  </View> 

                  <View>
                    <Text style={styles.lineColor}>--------------------------------------</Text>
                  </View>
                </View>

            ))
          )}
            <View style ={styles.pagenumber}>
                    <TouchableOpacity style={styles.forwardButton} onPress={pageLeft} >
                        <Text style={styles.buttonText}>
                          ⬅️
                        </Text>
                    </TouchableOpacity> 
                        <Text style={styles.displayednumber}>{
                           page}

                        </Text>
                    <TouchableOpacity style={styles.backwardsButton} onPress={pageRight}  >
                        <Text style={styles.buttonText}>
                          ➡️ 
                        </Text>
                    </TouchableOpacity> 
            </View>
          </View>
            </ThemedView>

      </ParallaxScrollView>
    </ScrollView>
    </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
alignment:{
  marginHorizontal: "auto",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight: 20,
  paddingLeft: 20,
  backgroundColor: "#FEFAE0",
  borderRadius: 40,

},
color:{
  textAlign: "center",
  color:"grey",
  fontSize: 18,

},
dropDowns:{
  flex: 2,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  gap: 10,
},
row:{
  flexDirection: "column",
  },
title:{
  color: "grey",
  fontWeight: 700,
  fontSize: 40,
  fontFamily: "comic sans",
},
filter:{
  backgroundColor: '#FEFAE0',
  padding: 10,
  fontFamily: "inherit",
  fontWeight: 900,
  margin: 10,
},
input:{
  color: 'grey',
  height: 40,
  margin:12,
  borderWidth: 1,
  borderColor: 'white',
  padding: 10,
  fontFamily: "comic sans",
},
petCard:{
marginHorizontal: "auto",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
flexWrap: "wrap",
paddingTop: 35,
paddingBottom: 10,
paddingRight: 20,
paddingLeft: 20,
backgroundColor: "#FEFAE0",
borderRadius: 40,
},
lineColor:{
color: "grey",
textAlign: "center",
fontSize: 20,
},
pagenumber: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 20,
  marginBottom: 90,
  paddingVertical: 10,
  paddingHorizontal: 5
,
  zIndex: 20,
  elevation: 5,
},
displayednumber: {
  fontSize: 25,
  margin: "auto",
  color: "grey",
  paddingRight: 10,
  fontFamily: "Georgia",
  fontWeight: 600,
},
backwardsButton: {
        backgroundColor: '#E9EDC9',
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
forwardButton: {
        backgroundColor: '#E9EDC9',
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
  dropdownButtonStyle: {
  width: 200,
  height: 50,
  backgroundColor: '#FEFAE0',
  borderRadius: 12,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 12,
  },
  petGrid: {
    flex: 5,
    marginHorizontal: "auto",
    width: 200,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingBottom: 50,
  },
  petImage: {
    width: 150, 
    height: 150,
    borderRadius: 20,
  },
  petName: {
    color: 'grey',
    fontSize: 26,
    fontFamily: "Georgia",
  },
  petAge: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 600,
  },
    petText: {
    color: 'grey',
    fontSize: 16,
    marginBottom: 10,
    flexWrap: "wrap",
    width: 300,
    fontFamily: "Garamond",
    fontWeight: '600'
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: "grey",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#FAEDCD',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownSizeItemIconStyle: {
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
