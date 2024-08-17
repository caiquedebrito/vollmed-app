import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Controller, set, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import Input from '../Input'
import Dropdown from '../Dropdown'
import { Colors } from '@/src/constants/Colors'

import especialidades from '../../data/especialidades'
import ufs from '../../data/ufs'
import Button from '../Button'
import { router } from 'expo-router'
import { api } from '../../api'
import { useSession } from '@/src/contexts/session'
import { AxiosError } from 'axios'
import { createDoctorSchema } from '@/src/validations/create-doctor'

export type DoctorFormState = {
  nome: string
  especialidade: string
  crm: string
  email: string
  telefone: string
  endereco: {
    bairro: string
    logradouro: string
    numero?: number
    complemento?: string
    cidade: string
    uf: string
    cep: string
  }
}

export default function CreateForm() {
  const [loading, setLoading] = React.useState(false)
  const { session: token } = useSession()
  const { control,  register, handleSubmit, formState: { errors } } = useForm<DoctorFormState>({
    resolver: yupResolver(createDoctorSchema),
  })

  useEffect(() => {
    register('nome')
    register('especialidade')
    register('crm')
    register('email')
    register('telefone')
    register('endereco.bairro')
    register('endereco.logradouro')
    register('endereco.numero')
    register('endereco.complemento')
    register('endereco.cidade')
    register('endereco.uf')
    register('endereco.cep')
  }, [register])

  const onSubmit = () => {
    handleSubmit(create)()
  }

  const create = (data: DoctorFormState) => {
    setLoading(true)
    api.post('/medicos', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        // console.log(response)
        router.push('(doctor)')
      })
      .catch((error: AxiosError) => alert(error.response?.data))
      .finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.text}>Profissional</Text>
        <Controller 
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input 
              placeholder='Nome completo' 
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.nome}
            />
          )}
          name='nome'
        />

        <View style={[styles.field, { flexDirection: 'row'}]}>
          <Controller 
            control={control}
            name='especialidade'
            rules={{
              required: true
            }}
            render={({ field: { onChange } }) => (
              <Dropdown 
                placeholder='Especialidade'
                data={especialidades}
                onChange={onChange}
                error={errors.especialidade}
              />
            )}
          />
          <Controller 
            control={control}
            name='crm'
            rules={{
              required: true
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input 
                placeholder='CRM' 
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                error={errors.crm}
              />
            )}
          />
        </View>
      </View> 

      <View style={styles.field}>
        <Text style={styles.text}>Contatos</Text>
        <Controller 
          control={control}
          rules={{
            required: true
          }}
          name='email'
          render={({ field: { onChange, value, onBlur } }) => (
            <Input 
              placeholder='E-mail' 
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.email}
            />
          )}
        />
        <Controller 
          control={control}
          rules={{
            required: true
          }}
          name='telefone'
          render={({ field: { onChange, value, onBlur } }) => (
            <Input 
              placeholder='Telefone ou celular' 
              inputMode='tel' 
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.telefone}
            />
          )}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.text}>Endereço profissional</Text>
        <Controller 
          control={control}
          rules={{
            required: true
          }}
          name='endereco.bairro'
          render={({ field: { onChange, value, onBlur } }) => (
            <Input 
              placeholder='Bairro' 
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.endereco?.bairro}
            />
          )}
        />
        <Controller 
          control={control}
          rules={{
            required: true
          }}
          name='endereco.logradouro'
          render={({ field: { onChange, value, onBlur } }) => (
            <Input 
              placeholder='Logradouro' 
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.endereco?.logradouro}
            />
          )}
        />
        <View style={[styles.field, { flexDirection: 'row'}]}>
          <Controller 
            control={control}
            name='endereco.numero'
            render={({ field: { onChange, value, onBlur } }) => (
              <Input 
                placeholder='Número' 
                inputMode='numeric' 
                onChangeText={onChange}
                value={value ? value.toString() : ''}
                onBlur={onBlur}
                error={errors.endereco?.numero}
              />
            )}         
          />
          <Controller 
            control={control}
            name='endereco.complemento'
            render={({ field: { onChange, value, onBlur } }) => (
              <Input 
                placeholder='Complemento' 
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                error={errors.endereco?.complemento}
              />
            )}
          />
        </View>
        <Controller 
          control={control}
          rules={{
            required: true
          }}
          name='endereco.cidade'
          render={({ field: { onChange, value, onBlur } }) => (
            <Input 
              placeholder='Cidade' 
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              error={errors.endereco?.cidade}
            />
          )}
        />
        <View style={[styles.field, { flexDirection: 'row'}]}>
          <Controller 
            control={control}
            name='endereco.uf'
            rules={{
              required: true
            }}
            render={({ field: { onChange } }) => (
              <Dropdown 
                placeholder='UF'
                data={ufs}
                onChange={onChange}
                error={errors.endereco?.uf}
                orientation='top'
              />
            )}
          />

          <Controller 
            control={control}
            name='endereco.cep'
            rules={{
              required: true
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <Input 
                placeholder='CEP' 
                inputMode='numeric' 
                keyboardType='numeric'
                onChangeText={onChange}
                value={value ? value.toString() : ''}
                onBlur={onBlur}
                error={errors.endereco?.cep}
              />
            )}
          />
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button onPress={onSubmit} text='Concluir cadastro' loading={loading}/>
        <Button text='Cancelar' variant='secondary' onPress={() => router.back()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: 16,
  },
  field: {
    gap: 8,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.blue3
  },
  linkDisable: {
    marginVertical: 32, 
    textAlign: 'center',
    color: Colors.blue3,
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  buttonsContainer: {
    marginTop: 32,
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 30
  },
})