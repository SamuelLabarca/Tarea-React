import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { imagen } from '@/core/config/tmdb'
import { GrillaPeliculas } from '@/features/peliculas/components/GrillaPeliculas'
import { EsqueletoGrilla } from '@/shared/components/EsqueletoGrilla'
import { MensajeError } from '@/shared/components/MensajeError'
import { usePersona } from '../hooks/usePersona'

function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
}

export function DetallePersona() {
  const { id } = useParams()
  const { datos: persona, error, reintentar } = usePersona(Number(id))

  if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />
  if (!persona) return <EsqueletoGrilla />

  const peliculasConocido = (() => {
    const vistos = new Set<number>()
    return (persona.combined_credits?.cast ?? [])
      .filter((c) => c.media_type === 'movie')
      .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
      .filter((c) => {
        if (vistos.has(c.id)) return false
        vistos.add(c.id)
        return true
      })
      .slice(0, 15)
  })()

  return (
    <article>
      <title>{`${persona.name} · Cartelera`}</title>

      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground">
        <Link to="/peliculas">
          <ArrowLeft /> Catálogo
        </Link>
      </Button>

      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <Avatar className="size-40 shrink-0 rounded-2xl text-4xl">
          <AvatarImage
            src={imagen(persona.profile_path, 'w342') ?? undefined}
            alt={persona.name}
            className="object-cover"
          />
          <AvatarFallback className="rounded-2xl">{iniciales(persona.name)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold tracking-tight">{persona.name}</h1>

          {persona.birthday && (
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4 shrink-0" />
              {persona.birthday}
            </p>
          )}

          {persona.place_of_birth && (
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              {persona.place_of_birth}
            </p>
          )}

          <p className="mt-4 leading-relaxed text-sm">
            {persona.biography?.trim() ? persona.biography : 'Sin biografía en español'}
          </p>
        </div>
      </div>

      {peliculasConocido.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold">Conocido por</h2>
          <GrillaPeliculas peliculas={peliculasConocido} />
        </section>
      )}
    </article>
  )
}
