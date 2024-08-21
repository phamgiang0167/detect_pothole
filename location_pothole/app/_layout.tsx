import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="action"
          options={{
            drawerLabel: 'Action',
            title: 'Action',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="map" size={size} color={color}/>
            )
          }}
        />
        <Drawer.Screen
          name="management"
          options={{
            drawerLabel: 'Management',
            title: 'Management',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="pencil" size={size} color={color}/>
            ),
            unmountOnBlur: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}