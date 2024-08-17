import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { Text } from 'react-native';
import { useSession } from '@/src/contexts/session';

export default function RootLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false}}/>
      <Stack.Screen name="(doctor)" />
    </Stack>
  )
}