import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Coordinates } from "../types/indesx";

interface LocationMapProps {
  onLocationFound: (coords: Coordinates) => void;
}

export const LocationMap: React.FC<LocationMapProps> = ({ onLocationFound }) => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      // Demande de permission
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg(
          "La permission d'accéder à la localisation a été refusée."
        );
        return;
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync({});

        const coords: Coordinates = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        };

        setLocation(coords);

        // remonter la position au parent
        onLocationFound(coords);
      } catch (error) {
        setErrorMsg("Impossible de récupérer la position.");
      }
    };

    getLocation();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Recherche de votre position...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="Votre position"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginTop: 10,
  },
  center: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
});