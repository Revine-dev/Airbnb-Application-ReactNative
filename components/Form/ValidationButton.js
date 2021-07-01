import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const ValidationButton = ({ name, fn, customColor }) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },
    btn: {
      borderWidth: 1,
      borderColor: customColor ? customColor : "lightgray",
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
