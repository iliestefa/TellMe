# Guía de Swagger UI

## Acceso a la Documentación

Con el servidor corriendo, abre tu navegador y ve a:

**http://localhost:3000/api-docs**

## Estructura de Archivos

La documentación de Swagger está organizada en archivos separados para mejor mantenibilidad:

```
src/config/
├── swagger.ts           # Configuración principal
└── swagger/
    ├── schemas.ts       # Definición de esquemas (Company, DTOs, Errors)
    └── paths.ts         # Definición de endpoints y respuestas
```

**Ventajas de esta estructura:**
- ✅ Código más limpio y organizado
- ✅ Fácil de mantener y actualizar
- ✅ Sin comentarios largos en los archivos de rutas
- ✅ Separación clara entre lógica y documentación

## Cómo usar Swagger UI

### 1. Explorar Endpoints

- Verás todos los endpoints organizados por categorías (tags)
- Haz clic en cualquier endpoint para ver sus detalles
- Cada endpoint muestra:
  - Método HTTP (GET, POST, PUT, DELETE)
  - Ruta del endpoint
  - Parámetros requeridos
  - Esquema del body (para POST/PUT)
  - Posibles respuestas

### 2. Probar un Endpoint

#### GET /api/companies (Listar todas las empresas)

1. Haz clic en el endpoint `GET /api/companies`
2. Haz clic en el botón **"Try it out"**
3. Haz clic en **"Execute"**
4. Verás la respuesta del servidor abajo

#### POST /api/companies (Crear una empresa)

1. Haz clic en el endpoint `POST /api/companies`
2. Haz clic en **"Try it out"**
3. Edita el JSON del Request Body:
   ```json
   {
     "name": "Mi Empresa Test",
     "whatsapp_phone_id": "123456789",
     "access_token": "EAAJ1234567890abcdefghijklmnopqrstuvwxyz"
   }
   ```
4. Haz clic en **"Execute"**
5. Verás la respuesta con el código de estado (201 si fue exitoso)

#### GET /api/companies/{id} (Obtener una empresa)

1. Haz clic en el endpoint `GET /api/companies/{id}`
2. Haz clic en **"Try it out"**
3. Ingresa un ID en el campo `id` (ejemplo: 1)
4. Haz clic en **"Execute"**

#### PUT /api/companies/{id} (Actualizar una empresa)

1. Haz clic en el endpoint `PUT /api/companies/{id}`
2. Haz clic en **"Try it out"**
3. Ingresa el ID de la empresa a actualizar
4. Edita el JSON con los campos a actualizar:
   ```json
   {
     "name": "Empresa Actualizada"
   }
   ```
5. Haz clic en **"Execute"**

#### DELETE /api/companies/{id} (Eliminar una empresa)

1. Haz clic en el endpoint `DELETE /api/companies/{id}`
2. Haz clic en **"Try it out"**
3. Ingresa el ID de la empresa a eliminar
4. Haz clic en **"Execute"**

### 3. Ver Esquemas de Datos

- Desplázate hasta el final de la página
- Verás la sección **"Schemas"**
- Aquí puedes ver la estructura de todos los modelos:
  - `Company`: Estructura completa de una empresa
  - `CreateCompanyDTO`: Datos requeridos para crear una empresa
  - `UpdateCompanyDTO`: Datos opcionales para actualizar
  - `Error`: Estructura de errores
  - `ValidationError`: Estructura de errores de validación

### 4. Interpretar Respuestas

#### Respuesta Exitosa (200/201)
```json
{
  "id": 1,
  "name": "Mi Empresa",
  "whatsapp_phone_id": "123456789",
  "access_token": "EAAJ...",
  "created_at": "2025-12-06T08:00:00.000Z",
  "updated_at": "2025-12-06T08:00:00.000Z"
}
```

#### Error de Validación (400)
```json
{
  "message": "Validation errors",
  "statusCode": 400,
  "details": [
    {
      "field": "name",
      "message": "Name must be at least 2 characters long"
    }
  ]
}
```

#### Error No Encontrado (404)
```json
{
  "message": "Company not found",
  "statusCode": 404
}
```

#### Error de Conflicto (409)
```json
{
  "message": "A company with this WhatsApp Phone ID already exists",
  "statusCode": 409
}
```

## Ventajas de Swagger

✅ **Documentación siempre actualizada**: Se genera automáticamente del código  
✅ **Pruebas interactivas**: No necesitas Postman o curl  
✅ **Validación en tiempo real**: Ves los errores inmediatamente  
✅ **Compartir con el equipo**: URL fácil de compartir  
✅ **Ejemplos integrados**: Cada endpoint tiene ejemplos de uso  

## Comparación con api-examples.http

| Característica | Swagger UI | api-examples.http |
|----------------|------------|-------------------|
| Interfaz visual | ✅ Sí | ❌ No |
| Documentación | ✅ Completa | ⚠️ Básica |
| Validación | ✅ Automática | ❌ Manual |
| Compartir | ✅ URL | ⚠️ Archivo |
| Ejemplos | ✅ Interactivos | ✅ Estáticos |

Ambas herramientas son útiles:
- **Swagger**: Para explorar, documentar y compartir
- **api-examples.http**: Para pruebas rápidas en VS Code/Cursor

## Tips

1. **Usa "Try it out"** para probar cada endpoint
2. **Revisa los Schemas** para entender la estructura de datos
3. **Lee las descripciones** de cada endpoint para entender su propósito
4. **Observa los códigos de estado** para entender qué significa cada respuesta
5. **Copia los ejemplos** para usarlos en tu código cliente



