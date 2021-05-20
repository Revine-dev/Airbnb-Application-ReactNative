import React from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import Link from "../components/Link";

export default function ProfileScreen({ setToken }) {
  return (
    <View>
      <Text>user id - check token</Text>
      {setToken && <Link name="Sign out" action={() => setToken(null)}></Link>}
    </View>
  );
}
