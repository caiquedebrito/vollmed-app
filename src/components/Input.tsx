import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native'
import React from 'react'
import InputError from './InputError'
import { Colors } from '@/src/constants/Colors'
import { Debug } from '@/src/constants/utils'
import { FieldError } from 'react-hook-form'

interface InputProps extends TextInputProps {
  value?: string
  error?: FieldError
}

export default function Input({ value, error, ...props }: InputProps) {

  const showMiniPlaceholder = !!value
  const isThereError = !!error
  
  return (
    <View style={[styles.box]}>
      {
        showMiniPlaceholder && <Text style={styles.placeholder}>{props.placeholder}</Text>
      }
      <TextInput style={[styles.input, showMiniPlaceholder && { paddingBottom: 4 }, isThereError && styles.error, props.editable === false && styles.disabled]} value={value} {...props} placeholderTextColor={ isThereError ? Colors.red : Colors.grey }/>
      {isThereError && <InputError message={error.message} />}
    </View>
  )
}

const styles = StyleSheet.create({
  box: { 
    flex: 1,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    height: 56,
    borderRadius: 5,
    padding: 16,
    color: 'black',
    fontSize: 16,
    textAlign: 'left'
  },
  placeholder: {
    position: 'absolute',
    top: 4,
    left: 16,
    color: Colors.grey,
    zIndex: 1,
  },
  error: {
    borderColor: Colors.red,
  },
  disabled: {
    backgroundColor: Colors.grey2,
    color: Colors.grey,
  }
})