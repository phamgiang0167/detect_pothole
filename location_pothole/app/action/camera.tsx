import axios from 'axios';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, ActivityIndicator, View, Image, Modal, TouchableOpacity } from 'react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as Location from 'expo-location';
import { Api } from '@/constants/Apis';
import { DefaultLocation } from '@/constants/Numbers';

interface AnalysisResult {
  latitude: number;
  longitude: number;
  totalHoles: number;
  holes: {
    width: number;
    length: number;
  };
  avgWidth: number;
  avgLength: number;
  badnessLevel: number;
  shouldAcross: boolean;
  analysisImage: string;
}

const Tab: React.FC = () => {
  const [facing, _] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [detecting, setDetecting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [location, setLocation] = useState<AppLocation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 0,
        },
        (newLocation) => {
          const roundedNewLat = Number.parseFloat(newLocation.coords.latitude.toFixed(4));
          const roundedOldLat = Number.parseFloat((location?.latitude || 0).toFixed(4));
          const roundedNewLng = Number.parseFloat(newLocation.coords.longitude.toFixed(4));
          const roundedOldLng = Number.parseFloat((location?.longitude || 0).toFixed(4));

          if (roundedNewLat !== roundedOldLat || roundedNewLng !== roundedOldLng) {
            setLocation({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
              latitudeDelta: DefaultLocation.latitudeDelta,
              longitudeDelta: DefaultLocation.longitudeDelta,
              description: DefaultLocation.description,
            });
          }
        }
      );
    })();
  }, []);

  useEffect(() => {
    if (detecting) {
      intervalIdRef.current = setInterval(() => {
        captureFrame();
      }, 10000); // Chụp mỗi 10 giây
    } else {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }

    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    };
  }, [detecting]);

  const captureFrame = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.1 });
      const resizedPhoto = await manipulateAsync(photo?.uri || '', [{ resize: { width: 300, height: 300 } }], { base64: true, format: SaveFormat.JPEG });
      uploadImage(resizedPhoto.base64 || '');
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      if (!detecting) {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        if (photo?.base64) {
          uploadImage(photo.base64);
        }
      }
      setDetecting(!detecting);
    }
  };

  const uploadImage = (base64Image: string | undefined) => {
    if (base64Image) {
      axios.post<AnalysisResult>(Api.analysis,
        { 
          image: base64Image,
          lat: location?.latitude,
          long: location?.longitude,
        }
      ).then(response => {
          if (response.data.totalHoles > 0) {
            setAnalysisResult(response.data);
            setModalVisible(true);
            setDetecting(false);
            if (intervalIdRef.current) {
              clearInterval(intervalIdRef.current);
              intervalIdRef.current = null;
            }
          }
        })
        .catch(error => {
          console.error(error);
          setDetecting(false);
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
        });
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} mute={true} />
      <TouchableOpacity style={styles.detectButton} onPress={takePicture}>
        <Text style={styles.detectButtonText}>{detecting ? "Stop Detecting" : "Start Detecting"}</Text>
      </TouchableOpacity>
      {detecting && <ActivityIndicator size="large" color="#007BFF" style={styles.loadingIndicator} />}
      {detecting && <Text style={styles.loadingText}>Detecting...</Text>}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View style={styles.analysisContainer}>
            {analysisResult && (
              <>
                <Text style={styles.analysisText}>Total Holes: {analysisResult.totalHoles}</Text>
                <Text style={styles.analysisText}>Average Width: {analysisResult.avgWidth} cm</Text>
                <Text style={styles.analysisText}>Average Length: {analysisResult.avgLength} cm</Text>
                <Text style={styles.analysisText}>Badness Level: {analysisResult.badnessLevel}</Text>
                <Text style={styles.analysisText}>Should Across: {analysisResult.shouldAcross ? 'Yes' : 'No'}</Text>
                <Image
                  style={styles.analysisImage}
                  source={{ uri: `data:image/jpeg;base64,${analysisResult.analysisImage}` }}
                />
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  camera: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  detectButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    margin: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  detectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#007BFF',
    textAlign: 'center',
    margin: 10,
    fontSize: 16,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  permissionText: {
    textAlign: 'center',
    fontSize: 16,
    margin: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  analysisContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  analysisText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  analysisImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Tab;
