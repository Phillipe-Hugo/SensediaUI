import { estilos } from './styles'

export default function Recursos() {
  const listaRecursos = [
    {
      titulo: 'Documentação Completa',
      descricao: 'Acesse documentação detalhada de todas as APIs disponíveis.',
      icone: '📚'
    },
    {
      titulo: 'Integração Simplificada',
      descricao: 'Processo simples e rápido para integrar novas APIs.',
      icone: '🔄'
    },
    {
      titulo: 'Monitoramento em Tempo Real',
      descricao: 'Acompanhe o desempenho das suas APIs em tempo real.',
      icone: '📊'
    }
  ]

  return (
    <section className={estilos.secao}>
      <div className={estilos.container}>
        <h2 className={estilos.titulo}>Recursos do Portal</h2>
        <div className={estilos.grid}>
          {listaRecursos.map((recurso, index) => (
            <div key={index} className={estilos.cartao}>
              <div className={estilos.iconeWrapper}>{recurso.icone}</div>
              <h3 className={estilos.tituloCartao}>{recurso.titulo}</h3>
              <p className={estilos.descricao}>{recurso.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}