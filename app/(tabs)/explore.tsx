import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import listingData from "@/assets/data/airbnb-listings.json";
import Colors from "@/constants/Colors";
import MapListing from "@/components/MapListing";
import ListingGeo from "@/assets/data/airbnb-listings.geo.json";
import { StatusBar } from "expo-status-bar";
import ListingBottomSheet from "@/components/ListingBottomSheet";

export default function Explore() {
  const [category, setCategory] = useState("Amazing pools");
  const items = useMemo(() => listingData as any, []);
  const geoItems = useMemo(() => ListingGeo, []);
  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}> 
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoyChanged={onDataChanged} />,
        }}
      />

      <MapListing listings={geoItems} />
      <ListingBottomSheet listings={items} category={category} />
    </View>
  );
};
