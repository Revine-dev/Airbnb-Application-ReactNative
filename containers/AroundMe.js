import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import styles from "../components/CommonStyles";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function AroundMe() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  useEffect(() => {
    const askPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "denied") {
          setIsLoading(false);
          return setError("You need to allow permissions to continue");
        } else if (status === "granted") {
          let { coords } = await Location.getCurrentPositionAsync({});
          setCoords(coords);
          setIsLoading(false);
        }
      } catch (error) {
        alert("Sorry, an error has occured.");
        console.log(error.message);
      }
    };
    askPermission();
  }, []);

  const markers = [
    {
      id: 1,
      latitude: 48.8564449,
      longitude: 2.4002913,
      title: "Le Reacteur",
      description: "La formation des champions !",
    },
  ];

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
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
          {markers.map((marker) => {
            return (
              <MapView.Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
}
