import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FormError = ({ error }) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      margin: 20,
    },
    text: {
      color: "red",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

export default FormError;
