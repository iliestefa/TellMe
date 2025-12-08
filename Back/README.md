# TellMe API

API desarrollada con Express y TypeScript para gestión de chatbots de WhatsApp.

## Requisitos

- Node.js >= 18
- npm o yarn
- MySQL/MariaDB

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` con las siguientes variables:

```env
PORT=3000
NODE_ENV=development

# Database
MYSQL_HOST=your_host
MYSQL_PORT=3306
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=tellme
```

## Scripts disponibles

```bash
# Desarrollo con hot reload
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint

# Formatear código
npm run format
```

## Documentación API (Swagger)

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva de Swagger en:

**http://localhost:3000/api-docs**

### Estructura de la documentación

La documentación de Swagger está organizada en archivos separados:

```
src/config/swagger/
├── schemas.ts  # Definición de todos los esquemas de datos
└── paths.ts    # Definición de todos los endpoints
```

Desde Swagger puedes:
- Ver todos los endpoints disponibles
- Probar las peticiones directamente desde el navegador
- Ver los esquemas de datos
- Ver ejemplos de request/response

## Estructura del proyecto

```
src/
├── config/         # Configuraciones (database)
├── controllers/    # Controladores
├── middlewares/    # Middlewares y validaciones
├── models/         # Modelos de datos
├── routes/         # Rutas
├── types/          # Tipos de TypeScript
└── index.ts        # Punto de entrada
```

## Endpoints

### Health Check
- `GET /health` - Health check del servidor

### Companies (Empresas)

#### `GET /api/companies`
Lista todas las empresas registradas.

**Respuesta (200):**
```json
[
  {
    "id": 1,
    "name": "Empresa X",
    "whatsapp_phone_id": "123456",
    "access_token": "token",
    "created_at": "2025-01-01T00:00:00.000Z",
    "updated_at": "2025-01-02T00:00:00.000Z"
  }
]
```

#### `GET /api/companies/:id`
Obtiene una empresa por su ID.

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Empresa X",
  "whatsapp_phone_id": "123456",
  "access_token": "token",
  "created_at": "2025-01-01T00:00:00.000Z",
  "updated_at": "2025-01-02T00:00:00.000Z"
}
```

**Respuesta (404):**
```json
{
  "status": "error",
  "message": "Empresa no encontrada"
}
```

#### `POST /api/companies`
Crea una nueva empresa.

**Body:**
```json
{
  "name": "Empresa X",
  "whatsapp_phone_id": "123456",
  "access_token": "EAAJ..."
}
```

**Respuesta (201):**
```json
{
  "id": 1,
  "name": "Empresa X",
  "whatsapp_phone_id": "123456",
  "access_token": "EAAJ...",
  "created_at": "2025-01-01T00:00:00.000Z",
  "updated_at": "2025-01-01T00:00:00.000Z"
}
```

**Respuesta (409):**
```json
{
  "status": "error",
  "message": "Ya existe una empresa con ese WhatsApp Phone ID"
}
```

#### `PUT /api/companies/:id`
Actualiza datos de una empresa.

**Body (todos los campos opcionales):**
```json
{
  "name": "Nuevo nombre",
  "whatsapp_phone_id": "9877",
  "access_token": "nuevo_token"
}
```

**Respuesta (200):**
```json
{
  "id": 1,
  "name": "Nuevo nombre",
  "whatsapp_phone_id": "9877",
  "access_token": "nuevo_token",
  "created_at": "2025-01-01T00:00:00.000Z",
  "updated_at": "2025-01-02T00:00:00.000Z"
}
```

#### `DELETE /api/companies/:id`
Elimina una empresa del sistema.

**Respuesta (200):**
```json
{
  "deleted": true
}
```

**Respuesta (404):**
```json
{
  "status": "error",
  "message": "Empresa no encontrada"
}
```

