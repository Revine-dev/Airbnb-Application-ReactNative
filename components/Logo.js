import React from "react";
import { StyleSheet, Image, View } from "react-native";

const Logo = () => {
  const styles = StyleSheet.create({
    container: {
      margin: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 150,
      height: 150,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Airbnb.png")}
        resizeMode="contain"
        style={styles.logo}
      ></Image>
    </View>
  );
};

export default Logo;
