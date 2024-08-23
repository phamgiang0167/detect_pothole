import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Text, Image, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import { Api } from '@/constants/Apis';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

interface MarkerItem {
  _id: string;
  latitude: number;
  longitude: number;
  analysisImage: string;
  status: string;
}

const MarkerListScreen: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [approving, setApproving] = useState<boolean>(false);
  const [approveSuccess, setApproveSuccess] = useState<boolean>(false);

  const fetchMarkers = async (page: number) => {
    if (page > totalPages) return;

    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await axios.get(`${Api.getMarkers}`, {
        params: {
          page,
          limit: 10,
          status: ["pending", "activated"]
        }
      });

      if (!response.data) {
        throw new Error('error when fetch data');
      }
      const { data, totalPages } = response.data;
      setMarkers(prevMarkers => [...prevMarkers, ...data]);
      setTotalPages(totalPages);

      if (page === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMarkers(page);
  }, [page]);

  const loadMoreMarkers = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleImagePress = (image: string) => {
    setSelectedImage(image);
    setSelectedLocation(null);
    setModalVisible(true);
  };

  const handleLocationPress = (latitude: number, longitude: number) => {
    setSelectedLocation({ latitude, longitude });
    setSelectedImage(null);
    setModalVisible(true);
  };

  const handleApprove = async (id: string) => {
    try {
      setApproving(true);
      setApprovingId(id);

      const response = await axios.post(`${Api.approveMarker}/${id}`);
      if (response.status === 200) {
        setMarkers(prevMarkers =>
          prevMarkers.map(marker =>
            marker._id === id ? { ...marker, status: 'activated' } : marker
          )
        );
        setApproveSuccess(true);
      }
    } catch (error) {
      console.error('Failed to approve marker:', error);
    } finally {
      setApproving(false);
    }
  };

  const renderItem = ({ item }: { item: MarkerItem }) => (
    <View style={styles.markerItem}>
      <Text style={styles.coordinatesText}>
        Latitude: {item.latitude.toFixed(6)}, Longitude: {item.longitude.toFixed(6)}
      </Text>
      <TouchableOpacity onPress={() => handleImagePress(item.analysisImage)}>
        <Image
          source={{ uri: `data:image/png;base64,${item.analysisImage}` }}
          style={styles.markerImage}
        />
      </TouchableOpacity>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => handleLocationPress(item.latitude, item.longitude)}
        >
          <MaterialIcons name="location-on" size={24} color="#fff" />
        </TouchableOpacity>
        {item.status === 'pending' && (
          <TouchableOpacity
            style={styles.approveButton}
            onPress={() => handleApprove(item._id)}
            disabled={approving && approvingId === item._id}
          >
            {approving && approvingId === item._id ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <FontAwesome name="check" size={20} color="#fff" />
                <Text style={styles.approveButtonText}>Duyệt</Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && page === 1 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={markers}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onEndReached={loadMoreMarkers}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        />
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedImage ? (
            <>
              <Image
                source={{ uri: `data:image/png;base64,${selectedImage}` }}
                style={styles.fullImage}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          ) : selectedLocation ? (
            <>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }} />
              </MapView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={approveSuccess} transparent={true} animationType="slide">
        <View style={styles.successModalContainer}>
          <View style={styles.successModalContent}>
            <Text style={styles.successText}>Duyệt thành công!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setApproveSuccess(false);
                setApprovingId(null);
              }}
            >
              <MaterialIcons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  coordinatesText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  markerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  approveButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  approveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  map: {
    width: '90%',
    height: '70%',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 10,
  },
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
});

export default MarkerListScreen;
