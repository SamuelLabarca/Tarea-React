import { createBrowserRouter, Navigate } from 'react-router'
import { Layout } from '@/core/layout/Layout'
import { NoEncontrada } from '@/core/layout/NoEncontrada'
import { MisFavoritas } from '@/features/favoritas/pages/MisFavoritas'
import { CatalogoPeliculas } from '@/features/peliculas/pages/CatalogoPeliculas'
import { DetallePelicula } from '@/features/peliculas/pages/DetallePelicula'
import { DetallePersona } from '@/features/personas/pages/DetallePersona'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, element: <Navigate to="/peliculas" replace /> },
      { path: 'peliculas', Component: CatalogoPeliculas },
      { path: 'peliculas/:id', Component: DetallePelicula },
      { path: 'personas/:id', Component: DetallePersona },
      { path: 'favoritas', Component: MisFavoritas },
      { path: '*', Component: NoEncontrada },
    ],
  },
])
