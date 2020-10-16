import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [loading, setLoading] = useState(true);
  const[errorMsg, setErrorMsg] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: -22.2102703,
    longitude: -45.2630555
  })

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let geoDados = await Location.getCurrentPositionAsync({})
      let latitude = geoDados.coords.latitude;
      let longitude = geoDados.coords.longitude;
      let latLong = {latitude: latitude, longitude: longitude};
      setCoordinates(latLong);
      console.log(latitude);
      setLoading(false)
    }) ();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
        <MapView
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0068,
            longitudeDelta: 0.0068,
          }}
          style={styles.mapStyle}
        >
          <Marker coordinate={coordinates} title={'Meu local'} />
        </MapView>
        
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
