import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'

interface SearchInputProps extends TextInputProps{}

export default function SearchInput({ ...props }: SearchInputProps) {
  return (
    <View>
      <TextInput style={styles.inputSearch} {...props} placeholderTextColor='black'/>
    </View>
  )
}

const styles = StyleSheet.create({
  inputSearch: {
    borderWidth: 1,
    height: 56,
    borderRadius: 5,
    padding: 16,
    color: 'black',
    fontSize: 16,
  }
})