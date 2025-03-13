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

1. **Clonar el repositorio**

```bash
git clone https://github.com/MrRedu/placeholder-quiz
cd placeholder-quiz
```
