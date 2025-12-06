# TellMe API

API desarrollada con Express y TypeScript.

## Requisitos

- Node.js >= 18
- npm o yarn

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
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

## Estructura del proyecto

```
src/
├── config/         # Configuraciones
├── controllers/    # Controladores
├── middlewares/    # Middlewares
├── routes/         # Rutas
├── types/          # Tipos de TypeScript
└── index.ts        # Punto de entrada
```

## Endpoints

- `GET /health` - Health check
- `GET /api` - API status

