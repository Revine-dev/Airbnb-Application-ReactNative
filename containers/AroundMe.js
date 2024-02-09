import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import styles from "../components/CommonStyles";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function AroundMe() {
  const navigation = useNavigation();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPoints = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let { coords } = await Location.getCurrentPositionAsync({});
        setCoords(coords);
        const response = await axios.get(
          `https://airbnb-api-eulq.onrender.com/rooms/around?latitude=${coords.latitude}&longitude=${coords.longitude}`
        );
        if (response.data.length === 0 || !response.data) {
          const response = await axios.get(
            `https://airbnb-api-eulq.onrender.com/rooms`
          );
          setCoords({ latitude: 48.8564449, longitude: 2.4002913 });
          setData(response.data);
          setIsLoading(false);
          return true;
        } else {
          setData(response.data);
          setIsLoading(false);
        }
      } else {
        const response = await axios.get(
          "https://airbnb-api-eulq.onrender.com/rooms"
        );
        setCoords({ latitude: 48.8564449, longitude: 2.4002913 });
        setData(response.data);
        setIsLoading(false);
      }
    };
    getPoints();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} size="large" />
      ) : error || !coords ? (
        <Text
          style={{
            textAlign: "center",
            color: "red",
            fontSize: 18,
          }}
        >
          {error}
        </Text>
      ) : (
        <MapView
          style={{ flex: 1, width: "100%", height: 300 }}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {data.map((marker) => {
            return (
              <MapView.Marker
                key={marker._id}
                coordinate={{
                  latitude: marker.loc[1],
                  longitude: marker.loc[0],
                }}
                title={marker.title}
                description={marker.description}
              >
                <MapView.Callout tooltip style={styles.customView}>
                  <TouchableHighlight
                    onPress={() =>
                      navigation.navigate("Room", { roomId: marker._id })
                    }
                  >
                    <View style={styles.calloutText}>
                      <Text
                        style={{ fontWeight: "bold", textAlign: "center" }}
                        numberOfLines={1}
                      >
                        {marker.title}
                      </Text>
                      <Text numberOfLines={1}>{marker.description}</Text>
                      <Image
                        source={{ uri: marker.photos[0].url }}
                        resizeMode="cover"
                        style={styles.calloutImg}
                      ></Image>
                    </View>
                  </TouchableHighlight>
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
        </MapView>
      )}
    </View>
  );
}
