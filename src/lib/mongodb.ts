import mongoose from 'mongoose'

declare global {
  var mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor, defina as variáveis de ambiente do MongoDB no arquivo .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function conectarDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('Conectado ao MongoDB')
        return mongoose
      })
      .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error)
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default conectarDB