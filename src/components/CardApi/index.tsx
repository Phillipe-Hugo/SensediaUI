'use client'

import { useState } from 'react'
import { atualizarApi, deletarApi } from '@/services/apiService'
import { useRouter } from 'next/navigation'
import { estilos } from './styles' // Adicionar esta importação

interface CardApiProps {
  id?: string
  api_name: string
  api_description: string
  is_custom?: boolean
}

export default function CardApi({ id, api_name, api_description, is_custom }: CardApiProps) {
  const [editando, setEditando] = useState(false)
  const [nome, setNome] = useState(api_name)
  const [descricao, setDescricao] = useState(api_description)
  const router = useRouter()

  async function handleSalvar() {
    if (!id) return

    const resultado = await atualizarApi(id, {
      api_name: nome,
      api_description: descricao
    })

    if (resultado.success) {
      setEditando(false)
      window.alert('API atualizada com sucesso!')
      // Atualização mais eficiente
      router.refresh()
    } else {
      window.alert('Erro ao atualizar API. Tente novamente.')
    }
  }

  async function handleDeletar() {
    if (!id) return

    if (window.confirm('Tem certeza que deseja excluir esta API?')) {
      const resultado = await deletarApi(id)
      if (resultado.success) {
        window.alert('API excluída com sucesso!')
        // Atualização mais eficiente
        router.refresh()
      } else {
        window.alert('Erro ao excluir API. Tente novamente.')
      }
    }
  }

  return (
    <div className={estilos.cartao}>
      {editando ? (
        <>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className={estilos.input}
            required
          />
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={estilos.textarea}
            rows={4}
            required
          />
          <div className="flex justify-end space-x-2">
            <button onClick={() => setEditando(false)} className={estilos.botaoCancelar}>
              Cancelar
            </button>
            <button onClick={handleSalvar} className={estilos.botaoSalvar}>
              Salvar
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className={estilos.titulo}>{api_name}</h3>
          <p className={estilos.descricao}>{api_description}</p>
          {is_custom && (
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditando(true)} className={estilos.botaoEditar}>
                Editar
              </button>
              <button onClick={handleDeletar} className={estilos.botaoExcluir}>
                Excluir
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}