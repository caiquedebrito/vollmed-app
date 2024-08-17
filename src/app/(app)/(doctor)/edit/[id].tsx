import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '@/src/components/Header'
import EditForm from '@/src/components/DoctorForm/EditForm'

function Edit() {
  return (
    <View style={styles.container}>
      <Header title='Editar'/>
      <ScrollView style={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        <EditForm />
      </ScrollView>
    </View>
  )
}

export default Edit

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
})