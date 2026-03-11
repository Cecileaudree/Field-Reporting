import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";

import { CameraCapture } from "../components/cameraCapture";
import { LocationMap } from "../components/locationMap";
import { submitJournalEntry } from "../services/api";
import { Coordinates, JournalEntry } from "../types";

import * as Calendar from "expo-calendar";

export const JournalFormScreen: React.FC = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setPhotoUri(null);
    setDescription("");
    setLocation(null);
  };

  const addEventToCalendar = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission refusée", "Accès au calendrier refusé.");
      return;
    }

    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT,
    );

    const writableCalendar = calendars.find((cal) => cal.allowsModifications);

    if (!writableCalendar) {
      Alert.alert("Erreur", "Aucun calendrier disponible.");
      return;
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    await Calendar.createEventAsync(writableCalendar.id, {
      title: "Nouvelle Entrée Journal",
      notes: description,
      location: `${location?.latitude}, ${location?.longitude}`,
      startDate,
      endDate,
    });
  };

  const handleSubmit = async () => {
    if (!photoUri || !location) {
      Alert.alert(
        "Formulaire incomplet",
        "Veuillez prendre une photo et récupérer votre position.",
      );
      return;
    }

    const entry: JournalEntry = {
      description,
      photoUri,
      location,
      timestamp: Date.now(),
    };

    try {
      setLoading(true);

      const response = await submitJournalEntry(entry);

      if (response.success) {
        await addEventToCalendar();

        Alert.alert("Succès", "Entrée sauvegardée !");
        resetForm();
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sauvegarder l'entrée.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mon Journal de Bord</Text>

      <Text style={styles.label}>1. Preuve Photographique</Text>

      {photoUri ? (
        <View>
          <Image source={{ uri: photoUri }} style={styles.image} />

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setPhotoUri(null)}
          >
            <Text style={styles.buttonText}>Reprendre la photo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraCapture onPictureTaken={setPhotoUri} />
      )}

      <Text style={styles.label}>2. Localisation</Text>

      <LocationMap onLocationFound={setLocation} />

      <Text style={styles.label}>3. Description</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Décrivez votre événement..."
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sauvegarder</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
  },

  saveButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  secondaryButton: {
    backgroundColor: "#555",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
