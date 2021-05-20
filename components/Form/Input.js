import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Input = ({ name, customField, onChange, type, numberOfLines }) => {
  const [displayPassword, setDisplayPassword] = useState(true);

  const styles = StyleSheet.create({
    input: {
      margin: 10,
      color: "black",
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: "red",
      position: "relative",
    },
    multiline: {
      height: 60,
      borderWidth: 1,
      borderColor: "red",
      textAlignVertical: "top",
    },
    show: {
      position: "absolute",
      top: 10,
      right: 10,
    },
  });

  if (!onChange) {
    onChange = () => {
      return;
    };
  }

  const password = customField === "secureTextEntry" ? true : false;

  return (
    <View>
      {type == "textarea" ? (
        <TextInput
          placeholder={name}
          onChangeText={onChange}
          style={[styles.input, styles.multiline]}
          multiline={true}
          numberOfLines={numberOfLines}
        ></TextInput>
      ) : (
        <TextInput
          placeholder={name}
          secureTextEntry={password && displayPassword ? true : false}
          onChangeText={onChange}
          style={styles.input}
        ></TextInput>
      )}

      {password && (
        <MaterialCommunityIcons
          size={20}
          name={displayPassword ? "eye-outline" : "eye-off-outline"}
          color="black"
          style={styles.show}
          onPress={() => {
            displayPassword
              ? setDisplayPassword(false)
              : setDisplayPassword(true);
          }}
        />
      )}
    </View>
  );
};

export default Input;
