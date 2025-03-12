# Instrucciones Generales

- Duración máxima: 48 horas tras recibir la prueba.
- Stack Principal:
  - React 18
  - Next.js 14
  - TypeScript
- Opcional (pero valorado):
  - TanStack Query (React Query) para manejo de datos.
  - ShadCN para UI y componentes accesibles.-
- API Pública Requerida:
  - Usar la API de JSONPlaceholder _(no requiere autenticación)._
    - Endpoints recomendados:
      - `GET /users` (lista de usuarios)
      - `GET /posts` (lista de publicaciones)
      - `GET /posts/:id/comments` (comentarios de una publicación)
    - Puedes combinarlos libremente para mostrar relaciones (por ejemplo, usuario → publicaciones → comentarios).
- Entrega:
  - Enviar un enlace a un repositorio público (GitHub, GitLab, etc.).
  - Incluir un README con instrucciones para correr el proyecto y notas sobre
    decisiones técnicas.

## 1. Cuestionario Teórico

### A. Verdadero / Falso

<details>
    <summary>1. Next.js 14 introduce nuevos Server Actions que permiten ejecutar lógica del
lado del servidor sin necesidad de un endpoint API adicional.</summary>
      ✅ Verdadero
</details>
<details>
    <summary>2. En React 18, la función useEffect se ejecuta antes de renderizar el componente
   en la pantalla.</summary>
      ❌ Falso
</details>
<details>
    <summary>3. El tipado en TypeScript elimina por completo los errores en tiempo de ejecución
   al compilar el proyecto.</summary>
      ❌ Falso
</details>
<details>
    <summary>4. TanStack Query permite manejar la caché de datos y revalidación de manera
   automática, optimizando solicitudes HTTP.</summary>
      ✅ Verdadero
</details>
<details>
    <summary>5. ShadCN está enfocado únicamente en la creación de dashboards empresariales
   sin posibilidad de uso general.</summary>
      ❌ Falso
</details>

### B. Opción Múltiple _(una sola respuesta correcta)_

<details>
    <summary>6. Respecto a las Server Components de Next.js 14, ¿cuál es su principal ventaja?</summary>
      b. Renderizar componentes en el servidor, reduciendo el JavaScript que se envía al cliente.
</details>

> a. Generar el HTML en el cliente para mejorar el SEO. <br>
> b. Renderizar componentes en el servidor, reduciendo el JavaScript que se envía al cliente. <br>
> c. Reemplazar por completo la necesidad de TypeScript en el proyecto. <br>
> d. Aumentar el tamaño de los bundles finales del cliente. <br>

<details>
    <summary>7. Para implementar Incremental Static Regeneration (ISR) con Next.js, ¿qué se
requiere?</summary>
      ❌✅ Respuesta
</details>

> a. Llamar a un hook especial `useISR()` dentro de nuestro componente. <br>
> b. Configurar la opción revalidate al usar `getStaticProps()`. <br>
> c. Implementar únicamente `getServerSideProps()` con un parámetro adicional. <br>
> d. Deshabilitar la funcionalidad de SSR en su totalidad. <br>

<details>
    <summary>8. ¿Cuál de estas ventajas describe mejor el uso de TypeScript en un proyecto
React/Next?</summary>
      b. Permite crear interfaces y tipos para ayudar a detectar errores de forma anticipada.
</details>

> a. Evita que el código JavaScript sea accesible para navegadores antiguos. <br>
> b. Permite crear interfaces y tipos para ayudar a detectar errores de forma anticipada. <br>
> c. Anula la necesidad de usar librerías para validación en tiempo de ejecución. <br>
> d. Genera automáticamente la documentación del proyecto. <br>

<details>
    <summary>9. Si utilizamos TanStack Query en lugar de un estado global manual para
manejar datos (por ej. fetch de usuarios), ¿qué mejora principal obtenemos?</summary>
      b. Cacheo y revalidación automática de datos, reduciendo llamadas innecesarias a la API.
</details>

> a. Carga forzada de datos en cada renderizado sin caché. <br>
> b. Cacheo y revalidación automática de datos, reduciendo llamadas innecesarias a la API. <br>
> c. Reemplazo automático de Next.js enrutamiento. <br>
> d. Un framework de pruebas integrado para testear endpoints. <br>

<details>
    <summary>10. ¿Cuál de estas afirmaciones sobre ShadCN es cierta?</summary>
      a. Es una colección de componentes (como botones, modales, etc.) creada para React, con énfasis en accesibilidad y personalización.
</details>

> a. Es una colección de componentes (como botones, modales, etc.) creada para React, con énfasis en accesibilidad y personalización. <br>
> b. No permite modificar ni un solo estilo en sus componentes, son totalmente cerrados. <br>
> c. Se usa únicamente en proyectos Angular. <br>
> d. Hace render del lado del servidor sin necesidad de Next.js. <br>

## 2. Desafío práctico

### Contexto

Crear una aplicación con Next.js 14 + React 18 + TypeScript que consuma datos de [JSONPlaceholder](https://jsonplaceholder.typicode.com/). Se recomienda usar los endpoints `/users`, `/posts`, `/comments` para mostrar relaciones y funcionalidades como listados, detalle y comentarios. Se valora el uso de TanStack Query para la gestión de peticiones y la utilización de Server Components en Next.js 14, siempre y cuando las use de forma adecuada.

### Requerimientos

1. Página principal /users

   - Listar todos los usuarios obtenidos de `/users`.
   - Mostrar al menos nombre, username y email.
   - Permitir filtrar la lista por el nombre o username (ej. input de texto que
     filtra dinámicamente).

2. Detalle de un usuario

   - Al hacer clic en un usuario, navegar a `/users/[id]` y mostrar información
     adicional (teléfono, website, dirección, etc.).
   - Mostrar un botón o link para volver a la lista.

3. Estilos e Interfaz

   - Usa la estrategia de estilos de tu preferencia (CSS Modules, Styled
     Components, Tailwind, etc.).
   - Mantener un diseño funcional y legible (no se requiere espectacularidad).

4. Documentación
   - Un README con pasos para instalar y correr la app.
   - Pequeña explicación de cómo estructuraste tus archivos.

<hr>

Además de cubrir todo lo anterior, se pide añadir lo siguiente:

1. Página de Publicaciones

   - Crear una sección `/posts` que liste los posts de JSONPlaceholder (`/posts`).
   - Permitir **ordenar** las publicaciones por título y/o filtrar por un texto parcial
     en el título.
   - Optional: Paginar la lista o implementar “carga infinita” (infinite scroll).

2. Detalle de una Publicación

   - Al hacer clic en una publicación, mostrar su detalle en `/posts/[id]`.
   - Incluir los comentarios (`/posts/[id]/comments`).
   - Implementar un form sencillo para **añadir un comentario** (aunque sea sol
     localmente o con un mock) y actualizar la lista de comentarios en pantalla.

3. Server Components o SSR

   - Emplear correctamente las features de Next.js 14:
     - Puedes optar por Server Components en `/users`, `/posts` o ambos.
     - Si prefieres SSR clásico, usa `getServerSideProps()` o `getStaticProps()` con revalidación (`revalidate`).
   - Explica en tu README `por qué` elegiste esa aproximación.

4. Integración de TanStack Query (React Query)

   - Aplicar React Query para manejar caché, fetch y revalidación de datos.
   - Indica en tu README los beneficios que encontraste (menos re-renders, cache de datos, etc.).

5. Opcional: Estilos con ShadCN

   - Si deseas, integra ShadCN para mostrar conocimiento en **diseño de
     componente**s.
   - Personaliza al menos un componente (ej. un botón o un modal).

6. Performance y Buenas Prácticas

- Demuestra enfoque en performance:
  - dynamic imports o lazy loading en componentes que no se requieran de inmediato.
  - Manejo eficiente del estado para evitar renders innecesarios.

7. Documentación Avanzada
   - Explicar tus decisiones arquitectónicas:
     - Por qué usaste Server Components / SSR.
     - Cómo organizaste tu carpeta /app o /pages.
     - Cómo estructuraste la lógica con React Query.
