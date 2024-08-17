import * as yup from 'yup'

export const editDoctorSchema = yup.object({
  nome: yup.string().required('Campo obrigatório'),
  especialidade: yup.string().required('Campo obrigatório'),
  telefone: yup.string().required('Campo obrigatório'),
  endereco: yup.object().shape({
    bairro: yup.string().required('Campo obrigatório'),
    logradouro: yup.string().required('Campo obrigatório'),
    numero: yup.number(),
    complemento: yup.string(),
    cidade: yup.string().required('Campo obrigatório'),
    uf: yup.string().required('Campo obrigatório'),
    cep: yup.number().required('Campo obrigatório').min(8, 'CEP inválido').max(8, 'CEP inválido')
  })
})
