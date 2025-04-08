export const configBanco = {
  usuario: process.env.MONGODB_USER,
  senha: process.env.MONGODB_PASSWORD,
  uri: process.env.MONGODB_URI
}

if (!configBanco.uri) {
  throw new Error('Por favor, configure as variáveis de ambiente do MongoDB')
}