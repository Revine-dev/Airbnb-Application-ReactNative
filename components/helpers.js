import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Helpers = {
  generateStars: (stars, reviews) => {
    let result = [];
    for (let i = 1; i <= 5; i++) {
      result.push(
        <FontAwesome
          name="star"
          size={20}
          key={i}
          color={stars >= i ? "#f3b43e" : "gray"}
        />
      );
    }

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {result}
        <Text style={{ marginLeft: 5 }}>{reviews} reviews</Text>
      </View>
    );
  },
};

export default Helpers;
