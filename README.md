# ControlBox — Aplicación de Reseñas de Libros

Aplicación full-stack para navegar, buscar y reseñar libros. Backend en ASP.NET Core (.NET 10) + PostgreSQL (Supabase), frontend en Next.js 16 (App Router) actuando como BFF.

## Demo en vivo

- **Frontend**: https://control-box-book-reviews.vercel.app
- **Backend (API)**: https://bookreviews-api.onrender.com
- **Health check**: https://bookreviews-api.onrender.com/health

> El backend está en el plan free de Render, que se "duerme" tras un rato de inactividad. La primera petición después de estar dormido puede tardar hasta 50 segundos en responder — es normal, no es un error.

**Credenciales de prueba** (para no tener que registrarse):

- Correo: `demo@gmail.com`
- Contraseña: `demo123`

## Stack

- **Backend**: ASP.NET Core Web API, Entity Framework Core (Code First), PostgreSQL, JWT, BCrypt.
- **Frontend**: Next.js (App Router), React 19, TypeScript, Tailwind CSS 4.
- **Base de datos**: PostgreSQL alojado en Supabase.
- **Deploy**: Render (backend, vía Docker) + Vercel (frontend).
- **CI**: GitHub Actions (build, lint y typecheck en cada push).

## Cómo ejecutar localmente

### Backend

Se necesita el SDK de .NET 10 y acceso a una base PostgreSQL (Supabase, local, o cualquier otra).

1. Crear `backend/appsettings.Development.json` (está en `.gitignore`, no se versiona) con esta estructura:

   ```json
   {
     "Logging": {
       "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning" }
     },
     "ConnectionStrings": {
       "DefaultConnection": "Host=...;Port=5432;Database=postgres;Username=...;Password=...;Pooling=false;"
     },
     "Jwt": {
       "Key": "una-clave-de-al-menos-32-caracteres",
       "Issuer": "BookReviewsApi",
       "Audience": "BookReviewsApp"
     }
   }
   ```

2. Ejecutar:

   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```

   Al arrancar, la aplicación aplica las migraciones de EF Core automáticamente (incluye la carga de los 10 libros semilla) — no hace falta correr `dotnet ef database update` a mano. Queda escuchando en `http://localhost:5241`.

### Frontend

Se necesita Node.js 20+.

1. Copiar el archivo de ejemplo y ajustarlo si el backend corre en otro puerto:

   ```bash
   cd frontend
   cp .env.example .env.local
   ```

2. Ejecutar:

   ```bash
   npm install
   npm run dev
   ```

   Queda escuchando en `http://localhost:3000`, apuntando al backend definido en `API_URL` dentro de `.env.local`.

Ambos comandos (`dotnet run` y `npm run dev`) fueron verificados en limpio antes de documentarlos acá.

## Cómo desplegar

### Backend → Render

El repo incluye `render.yaml` en la raíz (Blueprint de Render) y `backend/Dockerfile` (Render no tiene runtime nativo para .NET, así que corre vía Docker).

1. Render → **New +** → **Blueprint** → conectar este repositorio. Render detecta `render.yaml` solo.
2. Completar las variables de entorno marcadas como secretas (no están en el archivo por seguridad):
   - `ConnectionStrings__DefaultConnection`
   - `Jwt__Key`
   - `Cors__AllowedOrigins__0` (la URL del frontend en Vercel)
3. Deploy. Render vuelve a desplegar automáticamente en cada push a `main`.

### Frontend → Vercel

1. Vercel → **Add New** → **Project** → importar el repositorio.
2. **Root Directory**: `frontend` (es un monorepo, Vercel no lo detecta solo).
3. Variable de entorno: `API_URL` apuntando a la URL del backend en Render.
4. Deploy. Igual que Render, se redespliega solo en cada push a `main`.

### CI

`.github/workflows/ci.yml` corre en cada push/PR a `main`: compila el backend (`dotnet build`) y valida el frontend (`lint`, `tsc --noEmit`, `build`). Es la verificación de que el código no está roto antes de que Render/Vercel lo desplieguen — el deploy en sí lo maneja cada plataforma por su cuenta al detectar el push.

## Decisiones

- **Next.js como BFF, no SPA clásica**: los Server Components hacen fetch al backend del lado del servidor, y el JWT se guarda en una cookie `httpOnly` seteada por Route Handlers propios — nunca llega al JS del cliente. Evita exponer el token a robo vía XSS, a costa de una capa de proxy extra.
- **Arquitectura en capas en el backend** (Controllers → Services → DTOs → Modelos): separa la lógica de negocio de la capa HTTP, facilita testear servicios de forma aislada más adelante.
- **EF Core Code First con migraciones versionadas**: cada cambio de esquema (incluida la traducción de la data semilla) quedó como una migración propia, aplicada automáticamente al arrancar la app — no requiere pasos manuales de setup de base de datos.
- **Foto de perfil como URL, no upload de archivo**: evita montar infraestructura de almacenamiento (bucket, validación de archivos) para una prueba técnica; el usuario pega un link y se muestra como avatar, con iniciales como fallback.
- **Restablecer contraseña en modo desarrollo**: el mecanismo es completo y seguro (token hasheado con expiración de 1 hora), pero como no hay un servicio de email configurado, el enlace de reset se muestra directamente en la pantalla en vez de enviarse por correo. Ver Trade-offs.
- **Backend en Render vía Docker**: Render no tiene un runtime nativo para .NET (a diferencia de Node/Python/Ruby), así que el despliegue usa un `Dockerfile` multi-stage propio.
- **Traducción completa a español**: tanto el frontend como los mensajes de error del backend (incluida la respuesta de validación automática de ASP.NET Core, que por defecto viene en inglés) están en español neutro.
