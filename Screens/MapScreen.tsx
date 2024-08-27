import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Input: undefined;
  Map: {
    firstName: string;
    lastName: string;
    latitude: number;
    longitude: number;
  };
};

type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;
type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

type Props = {
  route: MapScreenRouteProp;
  navigation: MapScreenNavigationProp;
};



const MapScreen: React.FC<Props> = ({ route }) => {
  const { firstName, lastName, latitude, longitude } = route.params;
  const [address, setAddress] = useState('');

  useEffect(() => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch(error => console.warn(error));
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={`${firstName} ${lastName}`}
          description={address}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
