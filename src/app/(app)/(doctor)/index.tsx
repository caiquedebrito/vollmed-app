import { View, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Doctor from '@/src/components/Doctor'
import Button from '@/src/components/Button'
import Footer from '@/src/components/Footer'
import SearchInput from '@/src/components/SearchInput'
import Header from '@/src/components/Header'
import { router } from 'expo-router'
import { useSession } from '@/src/contexts/session'
import { api } from '@/src/api'
import { Doctor as DoctorType } from '@/src/models/doctor'

export default function Medic() {
  const { session, signOut } = useSession()
  const [data, setData] = React.useState<DoctorType[]>([])

  useEffect(() => {
    const controller = new AbortController()

    api.get('/medicos', {
      headers: {
        Authorization: `Bearer ${session}`,
      }, signal: controller.signal
    }).then(response => {
      setData(response.data.content)
      console.log(response.data.content)
    }).catch(error => {
      signOut()
    })

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Header title='Médicos' />
      
      <View style={{ padding: 16, marginBottom: 88, paddingBottom: 98 }}>
        <View style={{ position: 'relative'}}>
          <SearchInput placeholder="Buscar médico" />
          <Image source={require("@/src/assets/images/search.png")} style={styles.inputContainer}/>
        </View>

        <FlatList 
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => <Doctor data={item} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      <Footer>
        <Button text="Cadastrar novo perfil" onPress={() => router.push('/create')} />
      </Footer>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    inputContainer: { 
      position: "absolute",
      top: "50%", 
      right: 16,
      transform: [{ translateY: -12 }],
    },
})