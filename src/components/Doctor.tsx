import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/src/constants/Colors'
import Button from './Button'
import { Doctor as DoctorType } from '@/src/models/doctor'
import { router } from 'expo-router'

interface DoctorProps {
  data: DoctorType
}

export default function Doctor({ data } : DoctorProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <View style={{ margin: 24, borderBottomWidth: 1, paddingBottom: 5 }}>
      <Pressable onPress={() => setShowDetails((show) => !show)} style={styles.viewHeader}>
        <View style={{ gap: 6}}>
          <Text style={styles.name}>{data.nome}</Text>
          <Text style={styles.text}>{data.especialidade} | CRM {data.crm}</Text>
        </View>
        <Image source={require('@/src/assets/images/Dropdown.png')} style={[styles.buttonDropdown, showDetails && { transform: [{ rotate: '180deg' }] }]}/>
      </Pressable>

      {
        showDetails && (
          <View style={styles.details}>
            <Text style={styles.text}>{data.email}</Text>
            {/* <Text style={styles.text}>{data.telefone}</Text> */}
            {/* <Text style={styles.text}>{data.endereco.rua}, {data.endereco.numero} - {data.endereco.cidade}/{data.endereco.uf}</Text>
            <Text style={styles.text}>CEP: {data.endereco?.cep}</Text> */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16}}>
              <Button text='Editar' variant='mini' onPress={() => router.push(`edit/${data.id}`)}/>
              <Button text='Desativar perfil' variant='mini'/>
            </View>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  viewHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6
  },
  name: {
    fontSize: 16,
    color: Colors.blue3,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14,
    color: Colors.grey,
  },
  details: {
    color: Colors.grey,
    gap: 6
  },
  buttonDropdown: {
    padding: 10,
  }
})