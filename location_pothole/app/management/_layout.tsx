import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="approval"
        options={{
          title: 'Approval',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="edit" color={color} />,
          unmountOnBlur: true,
          headerShown: false
        }}
      />
    </Tabs>
  );
}
