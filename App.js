import * as React from 'react';
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [pin, setPin] = React.useState({
    latitude: 22.75436303227007,
    longitude: -102.52313698144097
  })
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
        initialRegion={{
          latitude: 22.75436303227007,
          longitude: -102.52313698144097,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showUserLocation={true}
        onUserLocationChange={(e) => {
          console.log("onUserLocationChange", e.nativeEvent)
        }}
        showsScale={true}
showsCompass={true}
showsPointsOfInterest={true}
showsBuildings={true}
      >
        <Marker
          coordinate={pin}
          title="Test Title"
          description="test Description"
          pinColor="pink"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag Start", e.nativeEvent.coordinate)
          }}
          onDragEnd={(e) => {
            console.log("Drag End", e.nativeEvent.coordinate)
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        >
          <Callout>
            <Text>This is a Callout</Text>
          </Callout>
         </Marker>
         <Circle
           center={pin}
           radius={100}
         />
      </MapView>
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
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
