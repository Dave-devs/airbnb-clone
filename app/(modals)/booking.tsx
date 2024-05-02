import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { places } from '@/interfaces/places';
//  @ts-ignore
import DatePicker from 'react-native-modern-datepicker';
import { guestGroup } from "@/interfaces/guestGroup";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Booking() {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);

  const today = new Date().toISOString().substring(0, 10);

  const [groups, setGroups] = useState(guestGroup)

  const clearAll = () => {
    setOpenCard(0);
    setSelectedPlace(0);
    setGroups(guestGroup);
  };

  return (
    <BlurView style={styles.container} intensity={70} tint="light">
      {/* First expandable card */}
      <View style={styles.card}>
        {/* Initial View 1 */}
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}
        {/* Expanded View 1 */}
        {openCard === 0 && (
          <>
            <Animated.Text style={styles.cardHeader} entering={FadeIn.duration(100)}>
              Where to?
            </Animated.Text>

            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons name="search" size={20} style={styles.serchIcon}/>
                <TextInput style={styles.inputField} placeholder="Search destination" placeholderTextColor={Colors.grey} />
              </View>
            </Animated.View>

            <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{gap: 25, paddingLeft: 20, marginBottom: 30}}>
              {places.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => setSelectedPlace(index)} style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={item.img} style={selectedPlace === index ? styles.selectedPlace : styles.place} />
                  <Text style={selectedPlace === index ? styles.selectedPlaceText : styles.placeText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      {/* Second expandable card */}
      <View style={styles.card}>
        {/* Initial View 2 */}
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
        {/* Expanded View 2 */}
        {openCard === 1 && (
          <>
            <Animated.Text
              style={styles.cardHeader}
              entering={FadeIn.duration(100)}
            >
              When is your trip?
            </Animated.Text>

            <Animated.View style={styles.cardBody}>
              <DatePicker 
              current={today} 
              selected={today} 
              mode={'calendar'} 
              options={{ 
                dafaultFont: 'outfit',
                headerFont: 'outfitM',
                borderColor: 'transparet',
                mainColor: Colors.primary
              }} 
              />
            </Animated.View>
          </>
        )}
      </View>

      {/* Third expandable card */}
      <View style={styles.card}>
        {/* Initial View 3 */}
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}
        {/* Expanded View 3 */}
        {openCard === 2 && (
          <>
            <Animated.Text style={styles.cardHeader} entering={FadeIn.duration(100)} >
              Who is coming?
            </Animated.Text>

            <Animated.View style={styles.cardBody}>
              {groups.map((item, index) => (
                <View key={index} style={[styles.guestItem, index + 1 < guestGroup.length ? styles.itemBorder : null]}>

                  <View>
                    <Text style={{fontFamily: 'outfitM', fontSize: 14}}>{item.name}</Text>
                    <Text style={{fontFamily: 'outfit', fontSize: 14, color: Colors.grey}}>{item.text}</Text>
                  </View>

                  <View style={{flexDirection: 'row', gap: 10, alignItems:'center', justifyContent: 'center'} }>
                    <Pressable onPress={() => {
                      const newGrops = [...groups];
                      newGrops[index].count > 0 ? newGrops[index].count - 1 : 0
                      setGroups(newGrops);
                    }}>
                      <Ionicons name='remove-circle-outline' size={26} color={groups[index].count > 0 ? Colors.grey : 'lightgrey'} />
                    </Pressable>

                    <Text 
                    style={{fontFamily: 'outfit', fontSize: 16, minWidth: 18}}
                    >
                      {item.count}
                    </Text>

                    <Pressable onPress={() => {
                      const newGrops = [...groups];
                      newGrops[index].count++;
                      setGroups(newGrops);
                    }}>
                      <Ionicons name='add-circle-outline' size={26} color={Colors.grey} />
                    </Pressable>
                  </View>

                </View>
              ))}
            </Animated.View>
          </>
        )}
      </View>

      {/* Footer with Clear & Serch Button */}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => clearAll()}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "outfit",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.btn]}
          >
            <Ionicons name="search-outline" size={20}  color={Colors.white}/>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "outfit",
                textDecorationLine: "underline",
                color: Colors.white,
              }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    marginTop: 20
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 15,
    gap: 10
  },
  card: {
    backgroundColor: Colors.white,
    paddingBottom: 10,
    borderRadius: 14,
    gap: 10,
    margin: 10,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  previewText: {
    fontFamily: "outfitM",
    fontSize: 12,
    color: Colors.grey,
  },
  previewDate: {
    fontFamily: "outfitM",
    fontSize: 12,
    color: Colors.black,
  },
  cardPreview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "outfitSB",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: 50,
    borderColor: '#ABABAB',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: Colors.white,
    marginBottom: 4,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  serchIcon: {
    padding: 10,
  },
  place: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  selectedPlace: {
    width: 120,
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey
  },
  placeText: {
    fontFamily: 'outfit', 
    paddingTop: 6,
  },
  selectedPlaceText: {
    fontFamily: 'outfitM',
    paddingTop: 6,
  },
  guestItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey
  }
});