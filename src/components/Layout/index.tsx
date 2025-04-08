import Cabecalho from '../Cabecalho'
import Rodape from '../Rodape'
import { estilos } from './styles'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={estilos.container}>
      <Cabecalho />
      <main className={estilos.principal}>{children}</main>
      <Rodape />
    </div>
  )
}