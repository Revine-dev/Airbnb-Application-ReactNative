import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { View, ActivityIndicator, TextInput } from "react-native";
import FormError from "../components/Form/FormError";
import Input from "../components/Form/Input";
import ValidationButton from "../components/Form/ValidationButton";
import Link from "../components/Link";
import Logo from "../components/Logo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(false);
  const [username, setUsername] = useState(false);
  const [description, setDescription] = useState(false);
  const [password, setPassword] = useState(false);
  const [passwordConf, setPasswordConf] = useState(false);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    if (!email || !password || !description || !username) {
      setLoading(false);
      return setError("All fields are required");
    }
    if (password !== passwordConf) {
      setLoading(false);
      return setError("Password have to be equals");
    }

    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email,
          username,
          description,
          password,
        }
      );
      setToken(response.data.token, response.data.id);
    } catch (error) {
      setLoading(false);
      if (error.response.data && error.response.data.error) {
        return setError(error.response.data.error);
      }
      alert("Error detected");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Logo />
      <Input name="Email" onChange={(v) => setEmail(v)}></Input>
      <Input name="Username" onChange={(v) => setUsername(v)}></Input>
      <Input
        name="Describe yourself in a few words"
        type="textarea"
        onChange={(v) => setDescription(v)}
      ></Input>
      <Input
        name="Password"
        customField="secureTextEntry"
        onChange={(v) => setPassword(v)}
      ></Input>
      <Input
        name="Confirm password"
        customField="secureTextEntry"
        onChange={(v) => setPasswordConf(v)}
      ></Input>

      <FormError error={error} />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <ValidationButton name="Sign up" fn={handleSignup}></ValidationButton>
      )}

      <Link
        name="Login to your account"
        action={() => {
          navigation.navigate("SignIn");
        }}
      />
    </KeyboardAwareScrollView>
  );
}
