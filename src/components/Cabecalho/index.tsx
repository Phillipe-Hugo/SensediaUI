'use client'

import Link from 'next/link'
import { useState } from 'react'
import { estilos } from './styles'

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)

  const alternarMenu = () => {
    setMenuAberto(!menuAberto)
  }

  return (
    <header className={estilos.cabecalho}>
      <div className={estilos.container}>
        <div className={estilos.navegacao}>
          <Link href="/" className={estilos.logo}>
            Portal de APIs
          </Link>

          <nav className={estilos.menuDesktop}>
            <Link href="/" className={estilos.linkMenu}>
              Início
            </Link>
            <Link href="/apis" className={estilos.linkMenu}>
              APIs
            </Link>
            <Link href="/suporte" className={estilos.linkMenu}>
              Suporte
            </Link>
            <Link href="/admin" className={estilos.linkMenu}>
              Área Administrativa
            </Link>
          </nav>

          <button
            className={estilos.botaoMenu}
            onClick={alternarMenu}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {menuAberto && (
          <div className={estilos.menuMobile}>
            <Link href="/" className={estilos.linkMenuMobile}>
              Início
            </Link>
            <Link href="/apis" className={estilos.linkMenuMobile}>
              APIs
            </Link>
            <Link href="/suporte" className={estilos.linkMenuMobile}>
              Suporte
            </Link>
            <Link href="/admin" className={estilos.linkMenuMobile}>
              Área Administrativa
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}