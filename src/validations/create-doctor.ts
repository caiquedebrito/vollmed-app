import * as yup from 'yup'

export const createDoctorSchema = yup.object({
  nome: yup.string().required('Campo obrigatório'),
  especialidade: yup.string().required('Campo obrigatório'),
  crm: yup.string().required('Campo obrigatório').min(4, 'Deve ter no mínimo 4 números').max(6, 'Deve ter no máximo 6 números'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório').min(11).max(11),
  endereco: yup.object({
    bairro: yup.string().required('Campo obrigatório'),
    logradouro: yup.string().required('Campo obrigatório'),
    numero: yup.number(),
    complemento: yup.string(),
    cidade: yup.string().required('Campo obrigatório'),
    uf: yup.string().required('Campo obrigatório'),
    cep: yup.string().required('Campo obrigatório').min(8, 'CEP inválido').max(8, 'CEP inválido')
  }).required('Campo obrigatório')
}).required('Campo obrigatório')