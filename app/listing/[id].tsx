import { View, Text, StyleSheet, useWindowDimensions, Image, TouchableOpacity, Share, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import listings from '@/assets/data/airbnb-listings.json'
import Colors from '@/constants/Colors';
import Animated, { interpolate, SlideInDown, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { Listing } from '@/interfaces/listing';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';

const IMAGE_HEIGHT = 260;
const IMAGE_WIDTH = useWindowDimensions().width;

export default function Page() {
  const { id } = useLocalSearchParams<{id: string}>();
  const listing: Listing = ( listings as any[] ).find((item) => item.id === id)
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const router = useRouter()

  const navBack = () => {
    router.back()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => {
        return <Animated.View style={[styles.header, haederAnimatedStyle]} />
      },
      headerLeft: () => {
        return (
          <View style={styles.bar}>
            {/* Back Icon Button */}
            <TouchableOpacity style={styles.roundButton}>
              <MaterialIcons onPress={() => navBack()} name='chevron-left' size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )
      } ,
      headerRight: () => {
        return (
          <View style={styles.bar}>
            {/* Share Icon Button */}
            <TouchableOpacity 
            onPress={ async () => {
              try {
                await Share.share({title: listing.name, url: listing.listing_url})
              } catch (error) {
                console.error('Share Error ', error)
              }
            }}
            style={styles.roundButton}
            >
              <Ionicons name='share-outline' size={20} color={Colors.black} />
            </TouchableOpacity>

            {/* Favourite Icon Button */}
            <TouchableOpacity style={styles.roundButton}>
              <Ionicons name='heart-outline' size={20} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )
      }
    })
  }, [])

  // For Image Scaling Animation
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.75]
          )
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [2, 1, 1]
          )
        }
      ]
    };
  });

  // For Header  Opacity Animation
  const haederAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, IMAGE_HEIGHT / 1.5],
        [0, 1]
      )
    }
  })

  return (
    <View style={styles.conatiner}>
      <Animated.ScrollView 
      ref={scrollRef}
      contentContainerStyle={{ paddingBottom: 80 }}
      scrollEventThrottle={16}
      >
         {/* Top Image */}
        <Animated.Image source={{uri: listing.xl_picture_url}} style={[ imageAnimatedStyle, styles.image ]} />

        {/* Info Component */}
       <View style={styles.infoContainer}>
          {/* Name */}
          <Text style={styles.name}>{listing.name}</Text>
          {/* Location */}
          <Text style={styles.location}>{listing.room_type} in {listing.smart_location}</Text>
          {/* Number of Rooms */}
          <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
            {listing.bathrooms} bathrooms
          </Text>
          {/* Ratings */}
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
            </Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.hostView}>
            {/* Host Image */}
            <Image source={{ uri: listing.host_picture_url }} style={styles.host} />
            {/* Host Details */}
            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing.host_name}</Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          {/* Listing Discription */}
          <Text style={styles.description}>{listing.description}</Text>
        </View>

      </Animated.ScrollView>
      {/* Book Listing Price & Book Button */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          {/* Price */}
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>${listing.price}</Text>
          </TouchableOpacity>

          {/* Button */}
          <TouchableOpacity style={[{paddingHorizontal: 15}, defaultStyles.btn]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'outfitM',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'outfitM',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'outfit',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'outfitM',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'outfitM',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: Colors.white,
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  description: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'outfit',
  },
})