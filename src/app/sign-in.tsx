import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as yup from 'yup'
import Input from '@/src/components/Input'
import Button from '@/src/components/Button'
import { Colors } from '@/src/constants/Colors'
import { useSession } from '@/src/contexts/session'
import { Controller, set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  login: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
})

export default function signIn() {
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  const [loading, setLoading] = React.useState(false)

  const { signIn } = useSession()

  const handleSignIn = () => {
    setLoading(true)
    handleSubmit(signIn)()
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Image source={require('@/src/assets/images/logo2.png')} style={{ alignSelf: 'center'}}/>
      <Text style={{ fontSize: 16, textAlign: 'center', color: Colors.blue3, fontWeight: 'bold', marginTop: 60, marginBottom: 20 }}>Faça login para entrar no sistema</Text>
      <View style={{ height: 200, flexDirection: 'column', justifyContent: 'space-between', gap: 24,}}>
        <Controller 
          name='login'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input placeholder="E-mail" value={value} onChangeText={onChange} error={errors.login}/>
          )}
        />

        <Controller 
          name='password'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input placeholder="Senha" secureTextEntry value={value} onChangeText={onChange} error={errors.password}/>
          )}
        />

        <Button onPress={handleSignIn} text="Entrar" loading={loading}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  }
})