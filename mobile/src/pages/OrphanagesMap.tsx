import React from "react";

import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Feather } from "@expo/vector-icons";

import mapMarker from "../images/map-marker.png";
import { useNavigation } from "@react-navigation/native";

export default function OrphanagesMap() {
  const navigation = useNavigation();

  function handleNavigationToOrphanageDetails() {
    navigation.navigate("OrphanageDetails");
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -19.9262126,
          longitude: -43.9584252,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -19.9262126,
            longitude: -43.9584252,
          }}
          calloutAnchor={{
            x: 2.7,
            y: 0.8,
          }}
        >
          <Callout tooltip onPress={handleNavigationToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>
                Djuris Bagos Bangs
                  </Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 Orfanatos Encontrados</Text>

        <TouchableOpacity style={styles.createOrphanageButton}>
          <Feather name="plus" size={20} color="#FFF"></Feather>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    justifyContent: "center",

    elevation: 3,
  },

  calloutText: {
    color: "#0089A5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },

  footer: {
    position: "absolute",

    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 28,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,

  },

  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "#8FA7B3",
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15C3D6",
    borderRadius: 26,

    justifyContent: "center",
    alignItems: "center",
  },
});
