import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import OptionButton from '@/src/components/OptionButton'
import { Colors } from '@/src/constants/Colors'
import { useSession } from '@/src/contexts/session'
import Button from '@/src/components/Button'

export default function Home() {
  const { signOut } = useSession()
  return (
    <View style={styles.container}>
      <Image source={require("@/src/assets/images/logo.png")}/>
      <Text style={styles.header}>Gerenciando sua clínica</Text>

      {/* <Button text='signout' onPress={signOut}/> */}
      
      <View style={[{ flex: 1}]}>
        <Text style={{ fontSize: 16, marginBottom: 8}}>Escolha qual seção deseja iniciar:</Text>

        <View style={[styles.menu]}>
          <OptionButton text="Médicos" icon={require("@/src/assets/images/doctor.png")} href="(doctor)" />
          <OptionButton text="Pacientes" icon={require("@/src/assets/images/person.png")} href="medic" />
          <OptionButton text="Consultas" icon={require("@/src/assets/images/calendar.png")} href="medic" />
        </View>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 68
  },
  header: {
    fontSize: 18,
    marginBottom: 42,
    fontWeight: 'bold',
    color: Colors.blue3
  },
  menu: {
    gap: 20,
    
  }
})