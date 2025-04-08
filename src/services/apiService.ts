'use server'

import conectarDB from '@/lib/mongodb'
import CustomApi from '@/models/CustomApi'

// Corrigir a URL base para o endpoint correto
const API_BASE_URL = 'https://ch-api-production.up.railway.app'

// Função para buscar APIs em destaque
export async function buscarApisDestaque() {
  try {
    let apisExternas = []
    try {
      const response = await fetch(`${API_BASE_URL}/api/apis`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-store',
        next: { revalidate: 0 }
      })

      if (!response.ok) {
        throw new Error(`Erro ao carregar o endpoint ${API_BASE_URL}`)
      }

      apisExternas = await response.json()
    } catch (error) {
      console.error('Erro ao buscar APIs externas:', error)
    }

    // Tenta conectar ao MongoDB apenas se precisar das APIs customizadas
    let apisCustomizadas = []
    try {
      await conectarDB()
      apisCustomizadas = await CustomApi.find({}).lean()
    } catch (error) {
      console.error('Erro ao buscar APIs customizadas:', error)
    }

    // Retornar as APIs externas primeiro, seguidas pelas APIs customizadas
    return {
      success: true,
      data: [
        ...apisExternas.map(api => ({
          api_name: api.api_name,
          api_description: api.api_description,
          is_custom: false
        })),
        ...apisCustomizadas.map(api => ({
          id: api._id.toString(),
          api_name: api.api_name,
          api_description: api.api_description,
          is_custom: true
        }))
      ]
    }
  } catch (error) {
    console.error('Erro ao buscar APIs:', error)
    return { success: false, data: [] }
  }
}

export async function adicionarApiCustomizada(dados: { api_name: string; api_description: string }) {
  try {
    await conectarDB()

    const novaApi = await CustomApi.create({
      ...dados,
      is_custom: true
    })

    return {
      success: true,
      data: {
        id: novaApi._id.toString(),
        api_name: novaApi.api_name,
        api_description: novaApi.api_description,
        is_custom: true
      }
    }
  } catch (error) {
    console.error('Erro ao adicionar API:', error)
    return { success: false }
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