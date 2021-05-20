import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, View, ActivityIndicator } from "react-native";
import ValidationButton from "../components/Form/ValidationButton";
import Input from "../components/Form/Input";
import Logo from "../components/Logo";
import axios from "axios";
import FormError from "../components/Form/FormError";
import Link from "../components/Link";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      return setError("All fields are required");
    }

    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email,
          password,
        }
      );

      setToken(response.data.token);
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        return setError("Your email or your password does not match");
      }
      alert("Error detected");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Logo />
      <View>
        <Input name="Email" onChange={(v) => setEmail(v)}></Input>
        <Input
          name="Password"
          customField="secureTextEntry"
          onChange={(v) => setPassword(v)}
        ></Input>

        <FormError error={error} />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <ValidationButton name="Sign in" fn={handleLogin}></ValidationButton>
        )}

        <Link
          name="Create an account"
          action={() => {
            navigation.navigate("SignUp");
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
