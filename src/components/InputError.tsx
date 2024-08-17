import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'

export default function InputError({ message = "Campo obrigatório" }: { message?: string }) {
  return (
    <View>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    color: Colors.red,
  }
})