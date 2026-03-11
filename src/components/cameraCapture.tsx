import React, { useRef } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

interface CameraCaptureProps {
  onPictureTaken: (uri: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onPictureTaken }) => {

  // TODO 1 : récupérer les permissions
  const [permission, requestPermission] = useCameraPermissions();

  // TODO 2 : ref vers la caméra
  const cameraRef = useRef<CameraView>(null);

  // TODO 3 : gestion de l'état des permissions

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Nous avons besoin de votre permission pour accéder à la caméra.</Text>
        <Button title="Autoriser la caméra" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    // TODO 4 : logique de capture
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });

      if (photo?.uri) {
        onPictureTaken(photo.uri);
      }
    }
  };

  // TODO 5 : interface utilisateur
  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} />

      <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
        <View style={styles.innerButton} />
      </TouchableOpacity>
    </View>
  );
};

// TODO 6 : styles
const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: 'black',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },

  camera: {
    ...StyleSheet.absoluteFillObject
  },

  captureButton: {
    position: 'absolute',
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  innerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white'
  },

  permissionContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});