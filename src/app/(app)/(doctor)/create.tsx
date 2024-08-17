import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/src/components/Header'
import CreateForm, { DoctorFormState } from '@/src/components/DoctorForm/CreateForm'

function Create() {
  return (
    <View style={styles.container}>
      <Header title='Novo perfil'/>
      <ScrollView style={{padding: 16}} showsVerticalScrollIndicator={false}>
        <CreateForm />
      </ScrollView>
    </View>
  )
}

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
})
