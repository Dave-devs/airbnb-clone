import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { Listing } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { defaultStyles } from "@/constants/Styles";
import { BottomSheetFlatList, BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";

interface Props {
  listings: any[];
  category: string;
  refresh: number;
}

export default function Listings({
  listings: items,
  category,
  refresh,
}: Props) {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            {/* Image */}
            <Image source={{ uri: item.medium_url }} style={styles.image} />
            {/* Geust Favourite */}
            <TouchableOpacity style={styles.guestFav}>
              <Text style={{ fontFamily: "outfit", fontSize: 12 }}>
                Guest Favorite
              </Text>
            </TouchableOpacity>
            {/* Heart Icon */}
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={20} color={Colors.black} />
            </TouchableOpacity>

            {/* Name and Rating */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontFamily: "outfitM", fontSize: 14 }}>
                {item.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: "outfitM" }}>
                  {item.review_scores_rating / 20}
                </Text>
              </View>
            </View>

            {/* Room Type */}
            <Text style={{ fontFamily: "outfit", fontSize: 14 }}>
              {item.room_type}
            </Text>

            {/* Prce */}
            <Text style={{ fontFamily: "outfitM" }}>
              ${item.price} total before taxes
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <StatusBar style="dark" />
      <BottomSheetFlatList
        data={loading ? [] : items}
        renderItem={renderRow}
        ref={listRef}
        ListHeaderComponent={<Text style={styles.info}>{items.length} homes</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 2,
  },
  guestFav: {
    position: "absolute",
    left: 30,
    top: 30,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    paddingVertical: 2,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: 'center',
    fontFamily: 'outfitM',
    fontSize: 16,
    marginTop: 4
  }
});
