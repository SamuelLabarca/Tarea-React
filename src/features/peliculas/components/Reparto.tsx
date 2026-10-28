import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { imagen } from '@/core/config/tmdb'
import type { Credito } from '../models/pelicula'

function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
}

export function Reparto({ actores }: { actores: Credito[] }) {
  if (actores.length === 0) return null

  return (
    <section>
      <h3 className="mb-3 font-semibold">Reparto</h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actores.map((a) => (
          <li key={a.id}>
            <Link
              to={`/personas/${a.id}`}
              viewTransition
              className="flex items-center gap-3 rounded-lg p-1 -m-1 hover:bg-accent transition-colors"
            >
              <Avatar className="size-10 shrink-0">
                <AvatarImage src={imagen(a.profile_path, 'w185') ?? undefined} alt={a.name} className="object-cover" />
                <AvatarFallback>{iniciales(a.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-sm leading-tight">
                <p className="truncate font-medium">{a.name}</p>
                <p className="truncate text-xs text-muted-foreground">{a.character}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
