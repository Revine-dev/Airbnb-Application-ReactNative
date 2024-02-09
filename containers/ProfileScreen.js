import React, { useEffect, useState, useCallback } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "axios";
import LottieView from "lottie-react-native";
import Input from "../components/Form/Input";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import ValidationButton from "../components/Form/ValidationButton";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default function ProfileScreen({ setToken, token, id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPictureModified, setIsPictureModified] = useState(false);
  const [isInfosModified, setIsInfosModified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !token) {
        return setToken(null);
      }

      try {
        const response = await axios.get(
          "https://airbnb-api-eulq.onrender.com/user/" + id,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setData(response.data);
        setIsLoading(false);

        setUserName(response.data.username);
        setEmail(response.data.email);
        setDescription(response.data.description);
        setPicture(response.data.photo);
      } catch (error) {
        console.log(error.message, "error loading rooms");
        alert("Error while loading rooms");
      }
    };
    fetchData();
  }, []);

  const accessLibrary = async () => {
    const cameraRollPerm =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      handleImagePicked(pickerResult);
    }
  };

  const takePicture = async () => {
    const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
    const cameraRollPerm =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      cameraPerm.status === "granted" &&
      cameraRollPerm.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      handleImagePicked(pickerResult);
    }
  };

  const handleImagePicked = useCallback(async (image) => {
    let uploadResponse;
    setIsUploading(true);
    setError(false);
    try {
      if (image.cancelled) {
        return false;
      }

      const uriParts = image.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      const formData = new FormData();

      formData.append("photo", {
        uri: image.uri,
        name: `photo.${fileType}`,
        type: `image/.${fileType}`,
      });

      uploadResponse = await axios.put(
        "https://airbnb-api-eulq.onrender.com/user/upload_picture/",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (
        Array.isArray(uploadResponse.data.photo) === true &&
        uploadResponse.data.photo.length > 0
      ) {
        setPicture(uploadResponse.data.photo);
        setIsPictureModified("La photo de profil a été modifiée");
      } else {
        setError("Une erreur s'est produite lors de l'upload");
      }
    } catch (error) {
      setError("Une erreur s'est produite");
    } finally {
      setIsUploading(false);
    }
  });

  const handleUpdate = async () => {
    if (!email || !userName || !description) {
      return setError("Tous les champs sont requis");
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return setError("Adresse mail invalide");
    }
    setIsUploading(true);
    setError(false);

    try {
      const response = await axios.put(
        "https://airbnb-api-eulq.onrender.com/user/update",
        {
          email,
          username: userName,
          description,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsInfosModified("Vos informations ont été mise à jour");
    } catch (error) {
      setError(
        "Une erreur s'est produite lors de la mise à jour des informations"
      );
      console.log(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return isLoading ? (
    <LottieView source={require("../assets/loading_room.json")} autoPlay loop />
  ) : error ? (
    <Text>An error has occured, please try again later</Text>
  ) : (
    <KeyboardAwareScrollView>
      {isUploading && (
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            opacity: 0.3,
            backgroundColor: "black",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
          marginBottom: 50,
        }}
      >
        {picture ? (
          <Image
            source={{ uri: picture[0].url }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
        ) : (
          <FontAwesome5 name="user-alt" size={100} color="gray" />
        )}
        <View
          style={{
            flexDirection: "column",
            marginLeft: 30,
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <FontAwesome
              name="picture-o"
              size={30}
              color="gray"
              onPress={accessLibrary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }}>
            <FontAwesome5
              name="camera"
              size={30}
              color="gray"
              onPress={takePicture}
            />
          </TouchableOpacity>
        </View>
      </View>

      {error || isPictureModified || isInfosModified ? (
        <View
          style={{
            backgroundColor: error ? "red" : "green",
            margin: 10,
            borderRadius: 5,
            padding: 10,
          }}
        >
          {
            <Text style={{ width: "100%", color: "white" }}>
              {error
                ? error
                : isInfosModified
                ? isInfosModified
                : isPictureModified}
            </Text>
          }
        </View>
      ) : (
        false
      )}

      <Input name="Email" value={email} onChange={(value) => setEmail(value)} />
      <Input
        name="Username"
        value={userName}
        onChange={(value) => setUserName(value)}
      />
      <Input
        name="Description"
        type="textarea"
        value={description}
        onChange={(value) => setDescription(value)}
      />

      <View></View>
      <ValidationButton name="Modifier" fn={handleUpdate} />
      {setToken && (
        <ValidationButton
          name="Se déconnecter"
          fn={() => setToken(null)}
          customColor="red"
        />
      )}
    </KeyboardAwareScrollView>
  );
}
