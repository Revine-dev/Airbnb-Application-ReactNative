import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const ValidationButton = ({ name, fn }) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    btn: {
      borderWidth: 1,
      borderColor: "red",
      borderRadius: 20,
      width: "50%",
      padding: 10,
    },
    text: {
      color: "black",
      textAlign: "center",
    },
  });

  if (!fn) {
    fn = () => {
      console.log("fr/en");
      return;
    };
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity title={name} style={styles.btn} onPress={fn}>
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ValidationButton;
