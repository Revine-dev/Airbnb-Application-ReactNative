import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import helpers from "../components/helpers";
import styles from "../components/CommonStyles";
import { AntDesign } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import LottieView from "lottie-react-native";
import MapView from "react-native-maps";

const { width } = Dimensions.get("window");

export default function RoomScreen({ userToken }) {
  const { params } = useRoute();
  const [loading, setLoading] = useState(true);
  const [displayMore, setDisplayMore] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api-eulq.onrender.com/rooms/" + params.roomId
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        alert("Error while loading rooms");
      }
    };
    fetchData();
  }, []);

  const { width } = Dimensions.get("window");
  const stylesCarousel = StyleSheet.create({
    container: { width: "100%", backgroundColor: "white" },
    child: { width, justifyContent: "center" },
    image: { height: 300, width: "100%" },
  });

  return loading && data ? (
    <LottieView source={require("../assets/loading_room.json")} autoPlay loop />
  ) : (
    <ScrollView>
      <View style={[styles.roomsPreview, { height: 300 }]}>
        <View style={stylesCarousel.container}>
          <SwiperFlatList
            autoplay
            autoplayDelay={5}
            autoplayLoop
            index={0}
            showPagination
            data={data.photos}
            renderItem={({ item }) => (
              <View style={stylesCarousel.child}>
                <Image
                  source={{ uri: item.url }}
                  resizeMode="cover"
                  style={stylesCarousel.image}
                ></Image>
              </View>
            )}
          />
        </View>

        <Text style={styles.roomsPrice}>{data.price} €</Text>
      </View>
      <View>
        <View
          style={{
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            aligndatas: "center",
          }}
        >
          <View>
            <Text>{data.title}</Text>
            {helpers.generateStars(data.ratingValue, data.reviews)}
          </View>

          {data.user?.account?.photo && (
            <Image
              source={{ uri: data.user.account.photo.url }}
              resizeMode="cover"
              style={styles.roomsOwner}
            />
          )}
        </View>
      </View>
      <View style={{ padding: 5 }}>
        <Text
          numberOfLines={displayMore ? null : 3}
          onPress={() => {
            if (!displayMore) {
              setDisplayMore(true);
            }
          }}
        >
          {data.description}
        </Text>
        <TouchableOpacity
          style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            displayMore ? setDisplayMore(false) : setDisplayMore(true);
          }}
        >
          <Text style={{ color: "rgba(0,0,0,.7)", marginRight: 5 }}>
            {displayMore ? "See less" : "See more"}
          </Text>
          {displayMore ? (
            <AntDesign name="caretup" size={14} color="rgba(0,0,0,.7)" />
          ) : (
            <AntDesign name="caretdown" size={14} color="rgba(0,0,0,.7)" />
          )}
        </TouchableOpacity>
      </View>

      <MapView
        style={{ width: "100%", height: 250, marginTop: 20 }}
        initialRegion={{
          latitude: data.loc[1],
          longitude: data.loc[0],
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.loc[1],
            longitude: data.loc[0],
          }}
          title={data.title}
          description={data.description}
        />
      </MapView>
    </ScrollView>
  );
}
