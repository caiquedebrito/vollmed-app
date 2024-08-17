import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Debug } from '@/src/constants/utils'

export default function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.footer}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute', 
    bottom: 2, 
    alignSelf: 'center',
    minHeight: 88,
    width: Dimensions.get('window').width, 
    paddingVertical: 20,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'white',
  }
})