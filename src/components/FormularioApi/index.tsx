'use client'

import { useState } from 'react'
import { adicionarApiCustomizada } from '@/services/apiService'
import { useRouter } from 'next/navigation'

export default function FormularioApi() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function enviarFormulario(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const resultado = await adicionarApiCustomizada({
        api_name: nome,
        api_description: descricao
      })

      if (resultado.success) {
        setNome('')
        setDescricao('')
        window.alert('API criada com sucesso!')
        // Usar apenas um método de atualização
        router.refresh()
      } else {
        throw new Error(resultado.errorMessage || 'Falha ao criar API')
      }
    } catch (erro) {
      console.error('Erro no formulário:', erro)
      window.alert('Erro ao criar API: ' + erro.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[#6a1b9a]">Adicionar Nova API</h2>
      <form onSubmit={enviarFormulario} className="space-y-4">
        <div>
          <label className="block text-[#666] mb-2">Nome da API</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border rounded bg-gray-200 text-gray-800 focus:border-[#6a1b9a] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[#666] mb-2">Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 border rounded bg-gray-200 text-gray-800 focus:border-[#6a1b9a] focus:outline-none"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ff6d00] text-white py-2 px-4 rounded hover:bg-[#ff9e40] transition-colors disabled:opacity-50"
        >
          {loading ? 'Adicionando...' : 'Adicionar API'}
        </button>
      </form>
    </div>
  )
}