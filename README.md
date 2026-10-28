# Cartelera · clase-react-2026

Catálogo de películas con la API de [TMDB](https://www.themoviedb.org), hecho en la última clase de React del módulo **Programación del lado del cliente** (URBE 2026).

React 19 + TypeScript + Vite, Tailwind 4, componentes de [shadcn/ui](https://ui.shadcn.com), íconos de [Lucide](https://lucide.dev), peticiones con [Axios](https://axios-http.com) y rutas con React Router.

## Cómo arrancar

```bash
git clone https://github.com/SamuelLabarca/Tarea-React.git
cd Tarea-React
npm install
npm run dev        # http://localhost:5173
```

Requisitos: Node **22.22+** o **24+** (revisa con `node -v`).

A partir de M4 hace falta el token de TMDB:

1. Crea una cuenta en TMDB y entra a **Configuración → API** (https://www.themoviedb.org/settings/api).
2. Copia `.env.example` como `.env.local` y pega el **API Read Access Token** (el largo, empieza con `eyJ`).
3. Reinicia `npm run dev` (Vite solo lee `.env.local` al arrancar).

> `.env.local` no se sube a git. Cada quien usa su propio token.

## Cómo está armado

La interfaz ya viene hecha: Header, tarjetas, filtros, paginador, estados vacíos, la ficha de detalle. En clase escribimos **solo la parte de React**.

`main` tiene integrada la solución completa de **M1 a M8** más la feature de detalle de personas.

```
src/
├── app/router.tsx              rutas de la app (catálogo, detalle película, detalle persona, favoritas)
├── core/
│   ├── api/tmdb.ts             instancia de Axios (lista)
│   ├── config/tmdb.ts          URLs, idioma, imágenes (lista)
│   ├── favoritas/              M7 · Context
│   └── layout/                 Header, Layout (M8), NoEncontrada
├── features/
│   ├── peliculas/
│   │   ├── components/         tarjetas, grilla, filtros, ficha, reparto con enlaces
│   │   ├── data/               películas de ejemplo (M1 a M3)
│   │   ├── hooks/              M6 · usePeliculas
│   │   ├── models/             interfaces de TMDB
│   │   ├── pages/              CatalogoPeliculas, DetallePelicula (M8)
│   │   └── services/           peticiones a TMDB (listo)
│   ├── personas/               feature personas: detalle de actor, bio y conocido por
│   │   ├── hooks/              usePersona
│   │   ├── models/             interface Persona
│   │   ├── pages/              DetallePersona
│   │   └── services/           obtenerPersona (TMDB)
│   └── favoritas/pages/        MisFavoritas
└── shared/
    ├── components/             EstadoVacio, MensajeError, Paginador, EsqueletoGrilla
    ├── hooks/                  useLocalStorage (listo) · useConsulta (M6)
    └── models/
```

## Rutas

| Ruta | Qué muestra |
|---|---|
| `/peliculas` | Catálogo con búsqueda, género, orden y paginación |
| `/peliculas/:id` | Ficha de la película |
| `/personas/:id` | Ficha de la persona (bio, foto, datos y conocido por) |
| `/favoritas` | Las que marcaste con el corazón |
| `*` | 404 · NoEncontrada |

## Hitos

| Tag | Qué se hace |
|---|---|
| `m1-favoritas` | useState, eventos y levantar el estado |
| `m2-vistas` | Renderizado condicional y children |
| `m3-busqueda` | Input controlado y dato derivado |
| `m4-api` | Axios, servicio y useEffect con carga y error |
| `m5-filtros` | Género, orden y paginación |
| `m6-hook-propio` | useConsulta y usePeliculas |
| `m7-context` | Favoritas con Context, sin prop drilling |
| `m8-router` | React Router: rutas, Link, useParams y detalle |

### Si te quedaste atrás

Trae la solución de un hito sobre tu `src` y sigue con el grupo:

```bash
git fetch --tags
git checkout m4-api -- src      # reemplaza tu src por el del hito M4
```

Para ver qué cambió entre dos hitos:

```bash
git diff m3-busqueda m4-api -- src
```

Los tags son la solución completa de cada hito. Para mirar una sin tocar tu trabajo:

```bash
git switch --detach m8-router   # y vuelve con git switch main
```

## Scripts

```bash
npm run dev        # servidor de desarrollo
npm run build      # revisa tipos y compila a dist/
npm run lint       # revisa el código con oxlint
```
