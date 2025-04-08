'use server'

import conectarDB from '@/lib/mongodb'
import CustomApi from '@/models/CustomApi'

export async function obterEstatisticasApis() {
  try {
    await conectarDB()
    
    const totalApis = await CustomApi.countDocuments()
    const apisRecentes = await CustomApi.find()
      .sort({ _id: -1 })
      .limit(5)
      .lean()

    return {
      success: true,
      data: {
        totalApis,
        apisRecentes: apisRecentes.map(api => ({
          id: api._id.toString(),
          nome: api.api_name,
          descricao: api.api_description,
          dataCriacao: api._id.getTimestamp()
        }))
      }
    }
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error)
    return { success: false, data: null }
  }
}