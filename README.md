# Prueba Tecnica - Backend Junior (Node.js + Express)

## Objetivo
Construir una API REST en Node.js que consuma una API externa, transforme los datos y los exponga por un endpoint propio, incluyendo base de datos, autenticacion, testing, Docker y lineamientos de despliegue real.

## Que hace este proyecto
- Expone `GET /external-data`.
- Consume Alpha Vantage (tasa USD/COP).
- Transforma la respuesta externa a un formato interno.
- Persiste los datos transformados en PostgreSQL usando TypeORM + entities.
- Protege el endpoint con autenticacion JWT.

## Stack tecnico implementado
- Node.js + Express.js
- TypeORM + PostgreSQL
- Auth con JWT + bcrypt
- async/await + try/catch
- Testing con Jest
- Docker + Docker Compose
- Arquitectura modular: module -> controller -> service -> entity

## API externa utilizada
- API: Alpha Vantage
- Endpoint: `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=COP&apikey=...`

## Estructura del proyecto
```text
src/
  config/
    data-source.js
  controllers/
    auth.controller.js
    external-data.controller.js
  entities/
    user.entity.js
    external-data.entity.js
  middleware/
    auth.middleware.js
  module/
    auth.module.js
    external-data.module.js
  services/
    auth.service.js
    external-data.service.js
  app.js
  server.js
tests/
  auth.middleware.test.js
  external-data.service.test.js
```

## Endpoints
### 1) Registro de usuario
`POST /auth/register`

Body:
```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

### 2) Login
`POST /auth/login`

Body:
```json
{
  "email": "user@mail.com",
  "password": "123456"
}
```

Respuesta:
```json
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "email": "user@mail.com"
  }
}
```

### 3) Consulta de datos externos (protegido)
`GET /external-data`

Header requerido:
`Authorization: Bearer <token>`

Respuesta de ejemplo:
```json
[
  {
    "id": 1,
    "base": "USD",
    "currency": "COP",
    "rate": "3988.120000",
    "lastUpdate": "2026-04-16T14:40:01.000Z",
    "createdAt": "2026-04-16T15:30:10.123Z"
  }
]
```

### 4) Health check
`GET /health`

## Swagger (probar todos los endpoints)
La API expone Swagger UI en:

- `GET /api-docs`
- URL local: `http://localhost:3000/api-docs`

Flujo recomendado para pruebas:
1. Ejecutar `POST /auth/register` para crear usuario.
2. Ejecutar `POST /auth/login` y copiar el `token`.
3. En Swagger, usar **Authorize** y pegar preferiblemente solo el token JWT (sin el prefijo Bearer).
4. Ejecutar `GET /external-data`.
5. Ejecutar `GET /health` para validar estado del servicio.

## Variables de entorno
Usar `.env` basado en `.env.example`:

```env
PORT=3000
EXTERNAL_API_BASE_URL=https://www.alphavantage.co
EXTERNAL_API_PATH=/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=COP
ALPHA_VANTAGE_API_KEY=your_api_key_here
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=external_data_db
DB_SSL=false
DB_SSL_REJECT_UNAUTHORIZED=true
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=1h
```

## Ejecucion local
1. Instalar dependencias:
```bash
npm install
```

2. Levantar PostgreSQL local (o por Docker).

3. Ejecutar API:
```bash
npm run dev
```

## Testing
Ejecutar tests:
```bash
npm test
```

## Docker
Levantar app + base de datos:
```bash
docker compose up --build
```

## Despliegue real (Azure)
Implementacion recomendada para cumplimiento real:
1. Crear Azure Database for PostgreSQL.
2. Crear Azure App Service para Node.js.
3. Configurar variables de entorno en App Service.
4. Conectar despliegue continuo desde GitHub Actions o Deployment Center.
5. Publicar URL final de la API.

Variables minimas en Azure:
- `PORT`
- `EXTERNAL_API_BASE_URL`
- `EXTERNAL_API_PATH`
- `ALPHA_VANTAGE_API_KEY`
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `DB_SSL`, `DB_SSL_REJECT_UNAUTHORIZED`
- `JWT_SECRET`, `JWT_EXPIRES_IN`

## Estado de requisitos obligatorios
- Base de datos: Implementado (PostgreSQL + TypeORM entities)
- Autenticacion: Implementado (JWT)
- Testing: Implementado (Jest)
- Docker: Implementado (`Dockerfile` + `docker-compose.yml`)
- Despliegue real: Preparado con guia y configuracion para Azure
- Separacion modular y TypeORM entities: Implementado
