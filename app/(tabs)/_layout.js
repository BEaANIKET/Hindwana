import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <Fontisto name="ticket" size={24} color={color} />,
        }}
      />
<Tabs.Screen
  name="pandit"
  options={{
    title: 'Pandit',
    tabBarIcon: ({ color, focused }) => (
      <Image
        source={{ uri: 'https://www.hindwana.com/puja.png' }}
        style={{
          width: 28,
          height: 28,
          // tintColor: focused ? color : '#888', 
        }}
        resizeMode="contain"
      />
    ),
  }}
/>
      <Tabs.Screen
        name="travel"
        options={{
          title: 'Travel',
          tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="bus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="acount" // Check spelling: should it be "account"?
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
