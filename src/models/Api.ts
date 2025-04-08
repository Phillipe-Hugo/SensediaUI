import mongoose from 'mongoose';

const ApiSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  destaque: {
    type: Boolean,
    default: false
  },
  documentacao: {
    type: String,
    required: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

export const Api = mongoose.models.Api || mongoose.model('Api', ApiSchema);