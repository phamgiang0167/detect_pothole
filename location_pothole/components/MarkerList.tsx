import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

interface MarkerListProps {
  markers: AppLocation[];
}

const MarkerList: React.FC<MarkerListProps> = ({ markers }) => {

  const renderItem = ({ item }: { item: AppLocation }) => (
    <View style={styles.markerItem}>
      <Text style={styles.coordinatesText}>
        Latitude: {item.latitude.toFixed(6)}, Longitude: {item.longitude.toFixed(6)}
      </Text>
      <Image
        source={{ uri: `data:image/png;base64,${item.image}` }}
        style={styles.markerImage}
      />
    </View>
  );

  return (
    <FlatList
      data={markers}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  markerItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  coordinatesText: {
    fontSize: 16,
    marginBottom: 5,
  },
  markerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default MarkerList;
