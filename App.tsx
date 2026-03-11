// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Button, ScrollView, Alert } from 'react-native';
// import { StatusBar } from 'expo-status-bar';

// // Imports des modules natifs à tester
// import { useCameraPermissions } from 'expo-camera';
// import * as Location from 'expo-location';
// import * as Calendar from 'expo-calendar';
// import MapView from 'react-native-maps';

// export default function App() {
//  // 1. Caméra
//  const [camPermission, requestCamPermission] = useCameraPermissions();
 
//  // 2. Localisation
//  const [location, setLocation] = useState<Location.LocationObject | null>(null);
 
//  // 3. Calendrier
//  const [calStatus, setCalStatus] = useState<string>('Non vérifié');

//  const testLocation = async () => {
//    try {
//      let { status } = await Location.requestForegroundPermissionsAsync();
//      if (status !== 'granted') {
//        Alert.alert('Erreur', 'Permission refusée pour la localisation');
//        return;
//      }
//      let loc = await Location.getCurrentPositionAsync({});
//      setLocation(loc);
//      Alert.alert('Succès GPS', `Lat: ${loc.coords.latitude}\nLng: ${loc.coords.longitude}`);
//    } catch (e: any) {
//      Alert.alert('Erreur GPS', e.message);
//    }
//  };

//  const testCalendar = async () => {
//    try {
//      const { status } = await Calendar.requestCalendarPermissionsAsync();
//      setCalStatus(status);
//      if (status === 'granted') {
//        Alert.alert('Succès', 'Accès au calendrier autorisé !');
//      } else {
//        Alert.alert('Refusé', 'Accès au calendrier non autorisé.');
//      }
//    } catch (e: any) {
//      Alert.alert('Erreur Calendrier', e.message);
//    }
//  };

//  return (
//    <ScrollView contentContainerStyle={styles.container}>
//      <Text style={styles.title}>Crash Test Natif 🚀</Text>

//      {/* Test Caméra */}
//      <View style={styles.card}>
//        <Text style={styles.cardTitle}>1. Caméra</Text>
//        <Text>Statut : {camPermission?.status || 'Inconnu'}</Text>
//        <Button 
//          title="Demander permission Caméra" 
//          onPress={requestCamPermission} 
//        />
//      </View>

//      {/* Test Calendrier */}
//      <View style={styles.card}>
//        <Text style={styles.cardTitle}>2. Calendrier</Text>
//        <Text>Statut : {calStatus}</Text>
//        <Button 
//          title="Demander permission Calendrier" 
//          onPress={testCalendar} 
//        />
//      </View>

//      {/* Test Localisation & Map */}
//      <View style={styles.card}>
//        <Text style={styles.cardTitle}>3. GPS & Carte</Text>
//        <Button 
//          title="Me localiser" 
//          onPress={testLocation} 
//        />
//        {location && (
//          <MapView 
//            style={styles.map} 
//            initialRegion={{
//              latitude: location.coords.latitude,
//              longitude: location.coords.longitude,
//              latitudeDelta: 0.01,
//              longitudeDelta: 0.01,
//            }}
//            showsUserLocation={true}
//          />
//        )}
//      </View>

//      <StatusBar style="auto" />
//    </ScrollView>
//  );
// }

// const styles = StyleSheet.create({
//  container: {
//    flexGrow: 1,
//    backgroundColor: '#f5f5f5',
//    alignItems: 'center',
//    paddingVertical: 50,
//    paddingHorizontal: 20,
//  },
//  title: {
//    fontSize: 24,
//    fontWeight: 'bold',
//    marginBottom: 20,
//  },
//  card: {
//    width: '100%',
//    backgroundColor: 'white',
//    padding: 20,
//    borderRadius: 10,
//    marginBottom: 15,
//    elevation: 3, // Ombre sur Android
//    shadowColor: '#000', // Ombre sur iOS
//    shadowOpacity: 0.1,
//    shadowRadius: 5,
//  },
//  cardTitle: {
//    fontSize: 18,
//    fontWeight: 'bold',
//    marginBottom: 10,
//    color: '#004aad',
//  },
//  map: {
//    width: '100%',
//    height: 200,
//    marginTop: 15,
//    borderRadius: 8,
//  }
// });

import { StatusBar } from 'expo-status-bar'; 
import { StyleSheet, SafeAreaView } from 'react-native'; 
import { JournalFormScreen } from './src/screens/journalFromScreen';
export default function App() { 
return ( 
<SafeAreaView style={styles.container}> 
<StatusBar style="auto" /> 
<JournalFormScreen /> 
</SafeAreaView> 
); 
} 
const styles = StyleSheet.create({ 
container: { 
flex: 1, 
backgroundColor: '#fff', 
}, 
});