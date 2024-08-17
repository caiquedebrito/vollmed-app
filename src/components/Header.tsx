import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors'
import { Link, router } from 'expo-router'

export default function Header( { title }: { title: string }) {
  const [showNav, setShowNav] = React.useState(false)

  return (
    <View style={styles.header}>
      <View style={styles.box}>
        <Pressable style={styles.goBackLink} onPress={() => router.back() }>
          <Image source={require('../assets/images/Voltar.png')} /></Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ position: 'relative'}}>
        <Pressable onPress={() => setShowNav(!showNav)}>
          <Image source={require('../assets/images/menu.png')}/>
        </Pressable>
        {
          showNav && (
            <View style={styles.nav}>
              <Link href='(doctor)' style={styles.navlink}>Médicos</Link>
              <Link href='(patients)' style={styles.navlink}>Pacientes</Link>
              <Link href='(appointments)' style={styles.navlink}>Consultas</Link>
            </View>
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    minHeight: 74,
    backgroundColor: Colors.blue3,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 1,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginLeft: 16,
    marginTop: 8
  },
  nav: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 154,
    position: 'absolute',
    right: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.blue3,
    borderWidth: 1
  },
  navlink: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    color: Colors.blue3,
    fontSize: 16,
    paddingVertical: 12,
    borderColor: Colors.blue3,
    borderBottomWidth: 1
  },
  goBackLink: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
})