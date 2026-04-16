# Prueba Técnica - Backend Junior (Node.js + Express)

## Objetivo
Construir una API REST mínima en Node.js con Express que consuma una API pública externa, transforme los datos y exponga un endpoint propio en formato JSON.

## Qué hace este proyecto
Este proyecto es una API REST que:
- Expone un endpoint `GET /external-data`
- Consulta una API externa pública (Alpha Vantage - datos financieros)
- Transforma la respuesta adaptando los datos a un formato propio (no devuelve los datos tal cual)
- Retorna JSON con una estructura simple y legible
- Implementa separación clara por módulos, controllers, services y entities

## API externa utilizada
- **API**: Alpha Vantage (información de tasas de cambio financiero)
- **Endpoint consumido**: `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=COP&apikey=TU_API_KEY`
- **Datos extraídos**: Información de tasas de cambio entre USD y COP
- **Transformación aplicada**: Los datos se adaptan a un formato simple con `base`, `currency`, `rate` y `lastUpdate`

## Endpoint propio
### `GET /external-data`

Ejemplo de respuesta:

```json
[
    {
        "base": "USD",
        "currency": "COP",
        "rate": 3900.5,
        "lastUpdate": "2026-04-16 14:40:01"
    }
]
```

## Requisitos técnicos implementados
- **Node.js** - Runtime de JavaScript del lado del servidor
- **Express.js** - Framework web minimalista
- **async/await** - Manejo asincrónico de operaciones (consumo de API externa)
- **try/catch** - Manejo básico de errores
- **Código funcional y legible** - Estructura clara y comprensible
- **Separación por módulos** - Controllers, Services y Entities para mejor organización
- **Estructura MVC** - Module → Controller → Service → Entity para separación de responsabilidades

## Estructura sugerida del proyecto
Separación clara por módulos, controllers, services y entities (TypeORM):

```text
src/
    app.js
    module/
        external-data.module.js
    controllers/
        external-data.controller.js
    services/
        external-data.service.js
    entities/
        external-data.entity.js
```

## Cómo ejecutar localmente
1. Clonar repositorio:
     ```bash
     git clone <URL_DEL_REPOSITORIO>
     cd <NOMBRE_DEL_PROYECTO>
     ```
2. Instalar dependencias:
     ```bash
     npm install
     ```
3. Configurar variables de entorno en `.env` (si aplica):
     ```env
     PORT=3000
    EXTERNAL_API_BASE_URL=https://www.alphavantage.co
    EXTERNAL_API_PATH=/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=COP
    ALPHA_VANTAGE_API_KEY=TU_API_KEY
     ```
4. Ejecutar proyecto:
     ```bash
     npm run dev
     ```
5. Probar endpoint:
     ```bash
     GET http://localhost:3000/external-data
     ```

## Requisitos NO implementados (No obligatorios)
Según los criterios de la prueba técnica, NO son requeridos en esta entrega:
- Base de datos
- Autenticación
- Testing
- Docker
- Despliegue real en Azure (solo se proporciona guía conceptual)
- Repositorio con estructura base del proyecto.
- Al menos 1 commit funcional.

## Azure - Cómo se desplegaría
Esta API podría desplegarse en Azure siguiendo estos pasos:

1. **Azure App Service**
   - Crear un Azure App Service configurado para Node.js
   - Seleccionar plan según necesidades (Free, Basic, Standard, Premium)

2. **Configuración de variables de entorno**
   - Establecer en App Service: `PORT`, `EXTERNAL_API_BASE_URL`, `ALPHA_VANTAGE_API_KEY`
   - Utilizar Azure Key Vault para secretos sensibles (API keys)

3. **Despliegue desde GitHub**
   - Conectar repositorio de GitHub a App Service
   - Habilitar despliegue continuo (CD) desde la rama principal
   - Cada push a GitHub dispara automáticamente el despliegue

4. **Acceso público a la API**
   - La API quedaría accesible mediante URL pública de App Service (ej: `https://mi-api.azurewebsites.net/external-data`)
   - Configurar CORS si es necesario

5. **Almacenamiento Azure (opcional - para carga de archivos)**
   - Usar Azure Blob Storage para almacenar archivos
   - Generar y validar SAS (Shared Access Signature) para acceso seguro
   - Consumir tokens SAS desde variables de entorno

## Entregables esperados
- Código funcionando localmente.
- Repositorio en GitHub.
- Endpoint operativo (`/external-data`).
- Despliegue en Azure.
- Documentación clara y breve.

## Criterios de evaluación
Se evalúa:
- **Comprensión básica de backend en Node.js** - Uso correcto de Express y conceptos fundamentales
- **Capacidad de consumir y adaptar APIs externas** - Integración con Alpha Vantage y transformación de datos
- **Claridad del código** - Código legible, bien estructurado y con separación de responsabilidades
- **Uso básico de Git/GitHub** - Commits funcionales y repositorio bien organizado
- **Entendimiento general de Azure** - Conocimiento conceptual del despliegue en Azure App Service
- **Capacidad de explicar lo que hizo** - Documentación clara y capacidad de comunicar la solución

## Notas
- No se evalúa perfección, se evalúa criterio, claridad y capacidad de resolver dentro del tiempo
- El foco está en demostrar comprensión de conceptos backend fundamentales
- La solución debe ser funcional y ejecutable localmente
- Capacidad de consumir y adaptar una API externa.
- Claridad del código.
- Uso básico de Git/GitHub.
- Entendimiento general de Azure.
- Capacidad de explicar lo implementado.