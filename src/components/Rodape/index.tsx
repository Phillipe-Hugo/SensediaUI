import { estilos } from './styles'

export default function Rodape() {
  return (
    <footer className={estilos.rodape}>
      <div className={estilos.container}>
        <div className={estilos.grid}>
          <div>
            <h3 className={estilos.titulo}>Sobre o Portal</h3>
            <p className={estilos.texto}>
              Seu portal centralizado para descobrir e gerenciar APIs de forma
              eficiente.
            </p>
          </div>
          <div>
            <h3 className={estilos.titulo}>Links Úteis</h3>
            <ul className={estilos.listaLinks}>
              <li>
                <a href="/documentacao" className={estilos.link}>
                  Documentação
                </a>
              </li>
              <li>
                <a href="/tutoriais" className={estilos.link}>
                  Tutoriais
                </a>
              </li>
              <li>
                <a href="/faq" className={estilos.link}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={estilos.titulo}>Contato</h3>
            <ul className={estilos.listaLinks}>
              <li className={estilos.texto}>Email: contato@portalapis.com.br</li>
              <li className={estilos.texto}>Telefone: (11) 1234-5678</li>
            </ul>
          </div>
        </div>
        <div className={estilos.divisor}>
          <p className={estilos.texto}>
            © {new Date().getFullYear()} Portal de APIs. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}