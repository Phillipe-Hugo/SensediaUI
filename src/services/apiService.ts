'use server'

import conectarDB from '@/lib/mongodb'
import CustomApi from '@/models/CustomApi'
import { revalidatePath } from 'next/cache'

export async function buscarApisDestaque() {
  try {
    // Primeiro busca as APIs customizadas do MongoDB
    await conectarDB()
    const apisCustomizadas = await CustomApi.find().lean()

    let apisExternas = []
    try {
      // Tenta buscar APIs externas
      const resposta = await fetch('https://ch-api-production.up.railway.app/api/apis', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 60 } // Cache por 1 minuto
      })

      if (resposta.ok) {
        apisExternas = await resposta.json()
      }
    } catch (erroExterno) {
      console.warn('Falha ao carregar APIs externas:', erroExterno)
      // Continua com as APIs locais mesmo se as externas falharem
    }

    // Combina as duas fontes de dados
    const todasApis = [
      ...apisCustomizadas.map(api => ({
        id: api._id.toString(),
        api_name: api.api_name,
        api_description: api.api_description,
        is_custom: true
      })),
      ...apisExternas
    ]

    return {
      success: true,
      data: todasApis
    }

  } catch (erro) {
    console.error('Erro ao buscar APIs:', erro)
    return {
      success: false,
      data: [],
      errorMessage: 'Falha ao carregar as APIs'
    }
  }
}

export async function adicionarApiCustomizada(dados: {
  api_name: string;
  api_description: string;
}) {
  try {
    await conectarDB()

    const novaApi = new CustomApi({
      api_name: dados.api_name,
      api_description: dados.api_description,
      is_custom: true
    })

    const apiSalva = await novaApi.save()

    revalidatePath('/')

    return {
      success: true,
      data: {
        id: apiSalva._id.toString(),
        api_name: apiSalva.api_name,
        api_description: apiSalva.api_description,
        is_custom: true
      }
    }
  } catch (error) {
    console.error('Erro ao adicionar API:', error)
    return {
      success: false,
      errorMessage: error.message || 'Erro ao criar API'
    }
  }
}

export async function atualizarApi(id: string, dados: { api_name: string; api_description: string }) {
  try {
    await conectarDB()
    const apiAtualizada = await CustomApi.findByIdAndUpdate(
      id,
      { ...dados },
      { new: true }
    ).lean()

    if (!apiAtualizada) {
      throw new Error('API não encontrada')
    }

    return {
      success: true,
      data: {
        id: apiAtualizada._id.toString(),
        api_name: apiAtualizada.api_name,
        api_description: apiAtualizada.api_description,
        is_custom: true
      }
    }
  } catch (error) {
    console.error('Erro ao atualizar API:', error)
    return { success: false }
  }
}

export async function deletarApi(id: string) {
  try {
    await conectarDB()
    await CustomApi.findByIdAndDelete(id)
    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar API:', error)
    return { success: false }
  }
}