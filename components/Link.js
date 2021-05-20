import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function Link({ name, action }) {
  const styles = StyleSheet.create({
    container: {
      margin: 20,
    },
  });

  return (
    <TouchableOpacity onPress={action && action} style={{ margin: 20 }}>
      <View>
        <Text style={{ textAlign: "center" }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}
