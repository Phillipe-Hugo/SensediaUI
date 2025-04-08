import { estilos } from './styles'

export default function Hero() {
  return (
    <div className={estilos.container}>
      <div className={estilos.conteudo}>
        <div className={estilos.wrapper}>
          <h1 className={estilos.titulo}>
            Bem-vindo ao Portal de APIs
          </h1>
          <p className={estilos.descricao}>
            Descubra, conecte e gerencie suas APIs em um único lugar. Nossa
            plataforma oferece todas as ferramentas necessárias para o seu sucesso.
          </p>
          <a 
            href="https://www.sensedia.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={estilos.botao}
          >
            Começar Agora
          </a>
        </div>
      </div>
    </div>
  )
}