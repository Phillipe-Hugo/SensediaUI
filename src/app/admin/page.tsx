import Layout from '@/components/Layout'
import { obterEstatisticasApis } from '@/services/adminService'
import { FiActivity, FiClock, FiCheckCircle, FiTrendingUp } from 'react-icons/fi'
import { estilos } from './styles'

export default async function AdminPage() {
  const estatisticas = await obterEstatisticasApis()

  return (
    <Layout>
      <div className={estilos.container}>
        <div className={estilos.headerContainer}>
          <h1 className={estilos.titulo}>Área Administrativa</h1>
          <div className="text-right">
            <p className={estilos.bemVindo}>Bem-vindo, Admin</p>
            <p className={estilos.data}>{new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>

        {/* Filtros */}
        <section className={estilos.secaoFiltros}>
          <div className={estilos.gridFiltros}>
            <div>
              <label className={estilos.label}>Período</label>
              <select className={estilos.select}>
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Este mês</option>
              </select>
            </div>
            <div>
              <label className={estilos.label}>API Específica</label>
              <select className={estilos.select}>
                <option>Todas as APIs</option>
                {estatisticas.data?.apisRecentes.map(api => (
                  <option key={api.id} value={api.id}>{api.nome}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className={estilos.botaoFiltro}>Aplicar Filtros</button>
            </div>
          </div>
        </section>

        {/* Cards de Métricas */}
        <div className={estilos.gridMetricas}>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total de APIs</h3>
              <FiActivity className="text-[#6a1b9a] text-xl" />
            </div>
            <p className="text-3xl font-bold text-[#6a1b9a]">{estatisticas.data?.totalApis || 0}</p>
            <p className="text-sm text-green-600 mt-2">↑ 12% em relação ao mês anterior</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Taxa de Sucesso</h3>
              <FiCheckCircle className="text-[#6a1b9a] text-xl" />
            </div>
            <p className="text-3xl font-bold text-[#6a1b9a]">98.7%</p>
            <p className="text-sm text-green-600 mt-2">↑ 0.5% em relação ao mês anterior</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Tempo Médio</h3>
              <FiClock className="text-[#6a1b9a] text-xl" />
            </div>
            <p className="text-3xl font-bold text-[#6a1b9a]">142ms</p>
            <p className="text-sm text-green-600 mt-2">↓ 8ms em relação ao mês anterior</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Requisições</h3>
              <FiTrendingUp className="text-[#6a1b9a] text-xl" />
            </div>
            <p className="text-3xl font-bold text-[#6a1b9a]">12.4M</p>
            <p className="text-sm text-green-600 mt-2">↑ 12% em relação ao mês anterior</p>
          </div>
        </div>

        {/* Tabela de APIs Recentes */}
        <section className={estilos.secaoTabela}>
          <h2 className={estilos.tituloTabela}>APIs Recentes</h2>
          <div className="overflow-x-auto">
            <table className={estilos.tabela}>
              <thead>
                <tr className={estilos.cabecalhoTabela}>
                  <th className={estilos.celulaTabela}>Nome</th>
                  <th className={estilos.celulaTabela}>Descrição</th>
                  <th className={estilos.celulaTabela}>Data de Criação</th>
                  <th className={estilos.celulaTabela}>Status</th>
                </tr>
              </thead>
              <tbody>
                {estatisticas.data?.apisRecentes.map((api) => (
                  <tr key={api.id} className={estilos.linhaTabela}>
                    <td className={estilos.celulaTabela}>{api.nome}</td>
                    <td className={estilos.celulaTabela}>{api.descricao}</td>
                    <td className={estilos.celulaTabela}>
                      {new Date(api.dataCriacao).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-3">
                      <span className={estilos.status}>Ativo</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  )
}