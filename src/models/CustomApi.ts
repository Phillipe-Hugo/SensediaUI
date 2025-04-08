import mongoose from 'mongoose'

interface ICustomApi {
  api_name: string
  api_description: string
  is_custom: boolean
}

const CustomApiSchema = new mongoose.Schema<ICustomApi>({
  api_name: {
    type: String,
    required: true
  },
  api_description: {
    type: String,
    required: true
  },
  is_custom: {
    type: Boolean,
    default: true
  }
})

const CustomApi = mongoose.models.CustomApi || mongoose.model<ICustomApi>('CustomApi', CustomApiSchema)

export default CustomApi