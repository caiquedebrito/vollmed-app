import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import Input from '../Input'
import Dropdown from '../Dropdown'
import { Colors } from '@/src/constants/Colors'

import especialidades from '@/src/data/especialidades'
import ufs from '@/src/data/ufs'
import Button from '../Button'
import { router, useLocalSearchParams } from 'expo-router'
import { api } from '../../api'
import { editDoctorSchema } from '@/src/validations/edit-doctor'
import { useSession } from '@/src/contexts/session'

type EditFormState = {
  nome: string
  especialidade: string
  telefone: string
  endereco: {
    bairro: string
    logradouro: string
    numero?: number
    complemento?: string
    cidade: string
    uf: string
    cep: number
  }
}

export default function EditForm() {
  const { id } = useLocalSearchParams()
  const { session } = useSession()

  const { control,  register, handleSubmit, formState: { errors }, setValue } = useForm<EditFormState>({
    resolver: yupResolver(editDoctorSchema),
  })

  useEffect(() => {
    register('nome')
    register('especialidade')
    register('telefone')
    register('endereco.bairro')
    register('endereco.logradouro')
    register('endereco.numero')
    register('endereco.complemento')
    register('endereco.cidade')
    register('endereco.uf')
    register('endereco.cep')
  }, [register])

  useEffect(() => {
    const controller = new AbortController()

    api.get(`/medicos/${id}`, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${session}`
      }
    }).then(response => {
      console.log(response.data)
      setValue('nome', response.data.nome)
      setValue('especialidade', response.data.especialidade)
      setValue('telefone', response.data.telefone)
      setValue('endereco.bairro', response.data.endereco.bairro)
      setValue('endereco.logradouro', response.data.endereco.logradouro)
      setValue('endereco.numero', response.data.endereco.numero)
      setValue('endereco.complemento', response.data.endereco.complemento)
      setValue('endereco.cidade', response.data.endereco.cidade)
      setValue('endereco.uf', response.data.endereco.uf)
      setValue('endereco.cep', response.data.endereco.cep)
    }).catch(error => {
      alert(error.message)
    })
  }, [])
  

  const onSubmit = () => {
    handleSubmit(edit)()
  }

  const edit = (data: EditFormState) => {
    api.put('/medicos', data)
      .then(response => console.log(response))
      .catch(error => alert(error.message))
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
            render={({ field: { onChange, value } }) => (
              <Dropdown 
                value={value}
                placeholder='Especialidade'
                data={especialidades}
                onChange={onChange}
                error={errors.especialidade}
              />
            )}
          />
          
          <Input 
            placeholder='CRM' 
            // value={initialData?.crm}
            editable={false}
          />
        </View>
      </View> 

      <View style={styles.field}>
        <Text style={styles.text}>Contatos</Text>
        <Input 
          placeholder='E-mail' 
          // value={initialData.email}
          editable={false}
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
            render={({ field: { onChange, value } }) => (
              <Dropdown 
                value={value}
                placeholder='UF'
                data={ufs}
                onChange={onChange}
                error={errors.endereco?.uf}
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
                onChangeText={onChange}
                value={value ? value.toString() : ''}
                onBlur={onBlur}
                error={errors.endereco?.cep}
              />
            )}
          />
        </View>
      </View>
      <View>
        <Text style={styles.linkDisable}>Desativar perfil</Text>
        <View style={{gap: 8, marginBottom: 30}}>
          <Button text='Concluir edição' onPress={() => router.back()} />
          <Button text='Cancelar' variant='secondary' onPress={() => router.back() } />
        </View>
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
  },
})