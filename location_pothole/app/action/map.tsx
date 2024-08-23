import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Animated } from 'react-native';
import axios from 'axios';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { Api } from '@/constants/Apis';
import { haversine } from '@/utils/location';
import Toast from 'react-native-toast-message';

interface Location {
  lat: number;
  long: number;
}

const Tab: React.FC = () => {
  const [center, setCenter] = useState<LatLng | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [markers, setMarkers] = useState<LatLng[]>([]);
  const [location, setLocation] = useState<Region & { description?: string } | null>(null);

  const detectionRadius = 10000; // Bán kính phát hiện ổ gà (ví dụ: 10 km)
  const [alertedMarkers, setAlertedMarkers] = useState<Map<string, number>>(new Map());
  const [flashVisible, setFlashVisible] = useState(false); // Trạng thái hiển thị hiệu ứng chớp
  const [toastVisible, setToastVisible] = useState(false); // Trạng thái hiển thị Toast
  const flashAnimation = useRef(new Animated.Value(0)).current; // Giá trị động cho hiệu ứng chớp

  useEffect(() => {
    setLoading(true);
    axios.get<PagedAnalysisResults>(`${Api.getMarkers}?status=activated`)
      .then(response => {
        setLoading(false);
        setCenter({
          latitude: response.data.data[0].latitude,
          longitude: response.data.data[0].longitude,
        });
        setMarkers(response.data.data.map((res) => ({
          latitude: res.latitude,
          longitude: res.longitude,
        })));
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });

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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            description: "Current Location"
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const userLocation: LatLng = {
        latitude: location.latitude,
        longitude: location.longitude
      };

      let alertTriggered = false;

      markers.forEach((marker) => {
        const distance = haversine(userLocation, marker);
        const markerKey = `${marker.latitude},${marker.longitude}`;
        if (distance <= detectionRadius) {
          if (!alertTriggered) {
            // Bật hiệu ứng chớp nếu chưa bật
            if (!flashVisible) {
              setFlashVisible(true);

              // Chạy hiệu ứng chớp liên tục
              Animated.loop(
                Animated.sequence([
                  Animated.timing(flashAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false
                  }),
                  Animated.timing(flashAnimation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false
                  }),
                ])
              ).start();
            }

            // Hiển thị Toast nếu chưa thông báo
            if (!toastVisible || Date.now() - alertedMarkers.get(markerKey)! > 30000) { // 30 giây giữa các thông báo
              Toast.show({
                type: 'error',
                text1: 'Chú ý!',
                text2: 'Đang ở gần cung đường xấu',
                visibilityTime: 10000
              });

              setToastVisible(true);
              setAlertedMarkers(prevState => new Map(prevState).set(markerKey, Date.now()));
            }
            alertTriggered = true;
          }
        }
      });

      if (!alertTriggered && flashVisible) {
        // Dừng hiệu ứng chớp và Toast nếu không còn gần marker nào
        setFlashVisible(false);
        flashAnimation.stopAnimation();
        setToastVisible(false);
      }
    }
  }, [location, markers]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      </View>
    );
  }

  const flashColor = flashAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'rgba(255, 0, 0, 0.2)'] // Giảm độ mờ của màu chớp
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: center?.latitude || 0,
          longitude: center?.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map(marker => (
          <Marker
            key={`${marker.latitude}${marker.longitude}`}
            coordinate={marker}
            title="Potholes"
            description="Warning"
          >
            <Image
              source={require('@/assets/images/pothole.png')}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
          }}
          title="My location"
          description={location?.description}
        />
      </MapView>
      {flashVisible && (
        <Animated.View
          style={[styles.flash, { backgroundColor: flashColor }]}
          onTouchEnd={() => {
            setFlashVisible(false);
            flashAnimation.stopAnimation();
          }}
        />
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  }
});

export default Tab;
