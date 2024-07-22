import React, { useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { RNCamera, RNCameraProps } from 'react-native-camera';
import axios from 'axios';

interface AnalysisResult {
  total_holes: number;
  avg_width: number;
  avg_length: number;
  badness_level: number;
  should_across: boolean;
  analysis_image: string;
}

const Tab: React.FC = () => {
  const cameraRef = useRef<RNCamera>(null);
  const [detecting, setDetecting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const takePicture = async () => {
    // if (cameraRef.current) {
    //   const options: RNCameraProps['takePictureOptions'] = { quality: 0.5, base64: true };
    //   const data = await cameraRef.current.takePictureAsync(options);
    //   uploadImage(data.base64);
    // }
  };

  const uploadImage = (base64Image: string) => {
    setDetecting(true);
    axios.post('http://127.0.0.1:5001/predict', { image: base64Image })
      .then(response => {
        setAnalysisResult(response.data);
        setDetecting(false);
      })
      .catch(error => {
        console.error(error);
        setDetecting(false);
      });
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
      />
      <Button onPress={takePicture} title="Detect Bad Road" disabled={detecting} />
      {/* {detecting && <Text style={styles.loadingText}>Detecting...</Text>}
      {analysisResult && (
        <View style={styles.analysisContainer}>
          <Text>Total Holes: {analysisResult.total_holes}</Text>
          <Text>Average Width: {analysisResult.avg_width} cm</Text>
          <Text>Average Length: {analysisResult.avg_length} cm</Text>
          <Text>Badness Level: {analysisResult.badness_level}</Text>
          <Text>Should Across: {analysisResult.should_across ? 'Yes' : 'No'}</Text>
          <Image
            style={styles.analysisImage}
            source={{ uri: `data:image/jpeg;base64,${analysisResult.analysis_image}` }}
          />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
});

export default Tab;
