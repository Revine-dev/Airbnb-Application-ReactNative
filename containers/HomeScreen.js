import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import styles from "../components/CommonStyles";
import axios from "axios";
import helpers from "../components/helpers";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        alert("Error while loading rooms");
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={index === data.length - 1 ? styles.roomsLast : styles.rooms}
      onPress={() => {
        navigation.navigate("Room", { roomId: item._id });
      }}
    >
      <View style={styles.roomsPreview}>
        <Image
          source={{ uri: item.photos[0].url }}
          style={{ width: "100%", height: 200 }}
          resizeMode="cover"
        />
        <Text style={styles.roomsPrice}>{item.price} €</Text>
      </View>
      <View>
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text>{item.title}</Text>
            {helpers.generateStars(item.ratingValue, item.reviews)}
          </View>
          <Image
            source={{ uri: item.user.account.photo.url }}
            resizeMode="cover"
            style={styles.roomsOwner}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return loading ? (
    <LottieView
      source={require("../assets/loading_items.json")}
      autoPlay
      loop
    />
  ) : (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
