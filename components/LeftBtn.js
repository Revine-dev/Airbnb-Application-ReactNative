import React from "react";
import { useNavigation } from "@react-navigation/core";
import { FontAwesome5 } from "@expo/vector-icons";

export default function LeftBtn() {
  const navigation = useNavigation();
  return (
    <FontAwesome5
      name="arrow-left"
      size={20}
      color="black"
      style={{ marginLeft: 10 }}
      onPress={() => navigation.goBack()}
    />
  );
}
