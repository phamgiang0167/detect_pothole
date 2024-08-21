import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="video-camera" color={color} />,
          unmountOnBlur: true,
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="map-marker" color={color} />,
          unmountOnBlur: true,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
