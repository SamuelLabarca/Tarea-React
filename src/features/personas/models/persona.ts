import type { PeliculaResumen } from '@/features/peliculas/models/pelicula'

export interface Persona {
  id: number
  name: string
  profile_path: string | null
  birthday: string | null
  place_of_birth: string | null
  biography: string
  combined_credits: {
    cast: PersonaCredito[]
  }
}

export interface PersonaCredito extends PeliculaResumen {
  media_type: 'movie' | 'tv'
  popularity: number
}
