# JSONPlaceholder Explorer

Una aplicación completa para explorar datos de la API JSONPlaceholder construida con Next.js, TypeScript, shadcn/ui y TanStack Query.

## 📋 Características

- **Página de usuarios**:

  - Listado de usuarios con filtrado por nombre/username
  - Vista detallada de cada usuario con información completa
  - Navegación a las publicaciones de cada usuario

- **Página de publicaciones**:

  - Listado de posts con ordenación por título (A-Z, Z-A)
  - Filtrado por título mediante búsqueda en tiempo real
  - Paginación completa para navegar entre conjuntos de publicaciones
  - Filtrado por usuario específico

- **Detalle de publicación**:

  - Vista detallada de publicaciones con contenido completo
  - Listado de comentarios asociados
  - Formulario para añadir nuevos comentarios (simulado)
  - Navegación al perfil del autor

- **Características técnicas**:
  - Server Components para carga inicial de datos
  - Client Components para interactividad
  - Gestión de estado con TanStack Query
  - Validación de formularios con React Hook Form + Zod
  - Tema claro/oscuro con persistencia
  - Diseño responsive para todos los dispositivos

## 🚀 Tecnologías utilizadas

- **Next.js 15**: Framework de React con soporte para Server Components y App Router
- **TypeScript**: Para tipado estático y mejor desarrollo
- **shadcn/ui**: Sistema de componentes para una interfaz elegante y accesible
- **TanStack Query**: Para gestión eficiente de estado del servidor y caché
- **React Hook Form + Zod**: Para validación de formularios
- **Tailwind CSS**: Para estilos y diseño responsive
- **next-themes**: Para gestión de temas claro/oscuro

## 💻 Instalación y ejecución

### Requisitos previos

- Node.js 18.17 o superior
- npm, yarn o pnpm

### Pasos para ejecutar el proyecto

1. Clonar el repositorio

```bash
git clone https://github.com/MrRedu/placeholder-quiz
```

2. Navega al directorio del proyecto:

```bash
cd placeholder-quiz
```

3. Instala las dependencias:

```bash
npm install
```

4. Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

5. Abre tu navegador y visita [http://localhost:3000](http://localhost:3000) para ver la aplicación en acción.

### Explicación de la estructura de carpetas

```
└── 📁src
    └── 📁app
        └── favicon.ico
        └── globals.css
        └── layout.tsx
        └── not-found.tsx
        └── page.tsx
        └── 📁posts
            └── 📁[id]
                └── comments-list.tsx
                └── page.tsx
            └── page.tsx
            └── posts-list.tsx
        └── 📁users
            └── 📁[id]
                └── page.tsx
            └── page.tsx
            └── users-list.tsx
    └── 📁components
        └── navbar.tsx
        └── providers.tsx
        └── theme-provider.tsx
        └── theme-toggle.tsx
        └── 📁ui
            └── button.tsx
            └── card.tsx
            └── dropdown-menu.tsx
            └── form.tsx
            └── input.tsx
            └── label.tsx
            └── pagination.tsx
            └── select.tsx
            └── separator.tsx
            └── skeleton.tsx
            └── textarea.tsx
    └── 📁lib
        └── api.model.ts
        └── api.ts
        └── utils.ts
```

En esta oportunidad estamos utilizando el **AppRouter**; enrutamiento basado en carpetas disponible desde la versión 13 de Next.js. Todo comienza en la carpeta **src**, de ella parte la carpeta **app** donde preferimos poner todo lo relacionado al enrutamiento, páginas, layouts y loadings _(de páginas)_. En algunos casos suelen meter los componentes en la misma carpeta pero preferimos ponerlo fuera. También tenemos la carpeta de **components**, como estamos utilizando colección de componentes de **shadcn/ui** entonces tenemos dentro de la misma a **ui** y todos los componentes generados automáticamente con su instalación. En la carpeta **components** también tenemos 4 archivos sueltos que sería ideal tener una distribución de **Atomic Design** pero en este caso como son 4 componentes únicamente lo notamos innecesario considerando el tiempo disponible para realizar la prueba y demás factores. Dentro de **src** también tenemos la carpeta de **lib** donde tenemos todas las request a la API, sus tipos _(TypeScript)_ y un archivo de utils. Estas requests preferiríamos ponerla dentro de una carpeta llamada **services** pero nuevamente, como el alcance del proyecto es bastante corto no hay problema en ello, para no hacer sobre-ingeniería ni indexar muchas carpetas que solo tendrán un solo archivo.

Por otro lado configuramos el linter (ESLint) con varios plugins y el formatter (Prettier).

### Documentación Avanzada

- [x] Explicar tus decisiones arquitectónicas:
  - Por qué usaste Server Components / SSR. <br>
    Sencillo; experiencia de usuario, SEO, generar el HTML desde el servidor mejorando la velocidad.
  - Cómo organizaste tu carpeta /app o /pages. <br>
    Con `/app`.
  - Cómo estructuraste la lógica con React Query. <br>
    Considerando la complejidad y cantidad de las operaciones de la aplicación, utilizar ReactQuery no es 100% necesario. Lo utilicé sobre todo en la paginación de los posts pero considerando que el API no tiene paginación, tuve que imitar una. La verdad considero innecesario utilizar esta gran API para gestionar promesas cuando las respuestas de estas promesas son tan pequeñas. La configuración mínima para utilizarla existe pero no se considera necesario en esta oportunidad.
