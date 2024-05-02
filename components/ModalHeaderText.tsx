import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

export default function ModalHeaderText() {
  const [activeState, setActiveState] = useState(0);

  return (
    <View style={styles.container}>
        {/* Stays Button */}
      <TouchableOpacity onPress={() => setActiveState(0)}>
        <Text
          style={[
            styles.text,
            {
              color: activeState === 0 ? Colors.black : Colors.grey,
              textDecorationLine: activeState === 0 ? "underline" : "none",
            },
          ]}
        >
          Stays
        </Text>
      </TouchableOpacity>

        {/* Stays Button */}
      <TouchableOpacity onPress={() => setActiveState(1)}>
        <Text
          style={[
            styles.text,
            {
              color: activeState === 1 ? Colors.black : Colors.grey,
              textDecorationLine: activeState === 1 ? "underline" : "none",
            },
          ]}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: "center",
    gap: 10,
  },
  text: {
    fontFamily: "outfitM",
    fontSize: 16,
  },
});
