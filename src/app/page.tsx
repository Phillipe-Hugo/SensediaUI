import Image from "next/image";
import { Suspense } from 'react'
import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import Recursos from '@/components/Recursos'
import CardApi from '@/components/CardApi'
import FormularioApi from '@/components/FormularioApi'
import { buscarApisDestaque } from '@/services/apiService'

function Loading() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
        <div 
          className="h-full w-full bg-[#6a1b9a] absolute animate-[loading_5s_ease-in-out_infinite]"
          style={{
            animation: 'loading 5s ease-in-out infinite'
          }}
        />
      </div>
      <p className="text-center mt-4 text-[#666] animate-[pulse_2s_ease-in-out_infinite]">
        Carregando APIs...
      </p>
    </div>
  )
}

async function ListaApis() {
  const resultado = await buscarApisDestaque()
  
  return (
    <div>
      {resultado.errorMessage && (
        <div className="mb-8 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          Erro ao carregar o endpoint https://ch-api-production.up.railway.app/
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resultado.data.map((api) => (
          <CardApi
            key={api.id}
            id={api.id}
            api_name={api.api_name}
            api_description={api.api_description}
            is_custom={api.is_custom}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Recursos />
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#6a1b9a]">
          APIs Disponíveis
        </h2>
        <Suspense fallback={<Loading />}>
          <ListaApis />
        </Suspense>
        
        <div className="mt-16 max-w-2xl mx-auto">
          <FormularioApi />
        </div>
      </section>
    </Layout>
  )
}
