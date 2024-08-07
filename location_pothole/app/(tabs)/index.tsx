import axios from 'axios';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, ActivityIndicator, View, Image, Modal } from 'react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { DOMAIN } from '@/constant'
import SystemSetting from 'react-native-system-setting';

// Tắt âm lượng
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
export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [detecting, setDetecting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (cameraRef.current && detecting) {
      intervalId = setInterval(() => {
        console.log('start')
        captureFrame();
      }, 10000); // Chụp 1 khung hình mỗi giây
    }
    return () => clearInterval(intervalId);
  }, [detecting]);
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  const captureFrame = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.1 });
      const resizedPhoto = await manipulateAsync(photo?.uri || '', [{ resize: { width: 300, height: 300 } }], { base64: true, format: SaveFormat.JPEG });
      uploadImage(resizedPhoto.base64 || '');
    }
  };

  const takePicture = async () => {
    // if (cameraRef.current) {
    //   const photo = await cameraRef.current.takePictureAsync({ base64: true });
    //   if (photo?.base64)
    //     uploadImage(photo.base64);
    // }
    setDetecting(!detecting)
  };

  const uploadImage = (base64Image: string | undefined) => {
    if (base64Image) {
      axios.post<AnalysisResult>('https://74e5-118-70-123-35.ngrok-free.app/api/pothole/analyst', { image: base64Image })
        .then(response => {

          if (response.data.totalHoles > 0) {
            console.log('yes')
            setAnalysisResult(response.data);
            setDetecting(false);
            setModalVisible(true);
          }
        })
        .catch(error => {
          console.error(error);
          setModalVisible(false);
          setDetecting(false);
        });
    }
  };

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} mute={true} />
      <Button onPress={takePicture} title="Detect Bad Road" />
      {detecting && <ActivityIndicator size="large" color="#ffffff" style={styles.loadingIndicator} />}
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
                <Text>Total Holes: {analysisResult.totalHoles}</Text>
                <Text>Average Width: {analysisResult.avgWidth} cm</Text>
                <Text>Average Length: {analysisResult.avgLength} cm</Text>
                <Text>Badness Level: {analysisResult.badnessLevel}</Text>
                <Text>Should Across: {analysisResult.shouldAcross ? 'Yes' : 'No'}</Text>
                <Image
                  style={styles.analysisImage}
                  source={{ uri: `data:image/jpeg;base64,${analysisResult.analysisImage}` }}
                />
              </>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
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
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  analysisContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  analysisImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
});