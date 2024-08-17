import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { router } from 'expo-router'
import { Colors } from '../constants/Colors'

export default function notFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta página não existe</Text>
      <Button text='Voltar' onPress={() => router.push('/(app)')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: Colors.blue3,
    marginBottom: 16,
  }
})