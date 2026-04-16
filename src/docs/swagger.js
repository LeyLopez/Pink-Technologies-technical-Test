const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

function createSwaggerServerUrl() {
  if (process.env.SWAGGER_SERVER_URL) {
    return process.env.SWAGGER_SERVER_URL;
  }

  if (process.env.APP_BASE_URL) {
    return process.env.APP_BASE_URL;
  }

  if (process.env.WEBSITE_HOSTNAME) {
    return `https://${process.env.WEBSITE_HOSTNAME}`;
  }

  const protocol = isProduction ? "https" : "http";
  const host = process.env.HOST || "localhost";

  return `${protocol}://${host}:${PORT}`;
}

const swaggerServerUrl = createSwaggerServerUrl();

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Prueba Tecnica Backend API",
      version: "1.0.0",
      description:
        "Documentacion de endpoints para autenticacion y consulta de datos externos.",
    },
    servers: [
      {
        url: swaggerServerUrl,
        description: "Servidor de la API",
      },
    ],
    tags: [
      { name: "Health", description: "Estado del servicio" },
      { name: "Auth", description: "Registro e inicio de sesion" },
      { name: "External Data", description: "Consulta protegida de datos externos" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@mail.com",
            },
            password: {
              type: "string",
              minLength: 6,
              example: "123456",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@mail.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            email: {
              type: "string",
              format: "email",
              example: "user@mail.com",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidXNlckBtYWlsLmNvbSIsImlhdCI6MTcxMzI2NTQ1MCwiZXhwIjoxNzEzMjY5MDUwfQ.example",
            },
            user: {
              $ref: "#/components/schemas/UserResponse",
            },
          },
        },
        ExternalDataItem: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            base: {
              type: "string",
              example: "USD",
            },
            currency: {
              type: "string",
              example: "COP",
            },
            rate: {
              type: "string",
              example: "3988.120000",
              description: "Valor decimal guardado en PostgreSQL (decimal -> string en JSON)",
            },
            lastUpdate: {
              type: "string",
              format: "date-time",
              example: "2026-04-16T14:40:01.000Z",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-04-16T15:30:10.123Z",
            },
          },
        },
        HealthResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "ok",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Error message",
            },
            detail: {
              type: "string",
              example: "Internal error detail",
            },
          },
        },
      },
    },
    paths: {
      "/health": {
        get: {
          tags: ["Health"],
          summary: "Verificar estado del servicio",
          responses: {
            200: {
              description: "Servicio activo",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/HealthResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Registrar un usuario",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterRequest",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Usuario creado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/UserResponse",
                  },
                },
              },
            },
            400: {
              description: "Faltan campos requeridos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            409: {
              description: "Email ya registrado",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            500: {
              description: "Error interno",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Iniciar sesion",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login exitoso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/LoginResponse",
                  },
                },
              },
            },
            400: {
              description: "Faltan campos requeridos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            401: {
              description: "Credenciales invalidas",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            500: {
              description: "Error interno",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/external-data": {
        get: {
          tags: ["External Data"],
          summary: "Obtener y persistir dato externo transformado",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Datos consultados y guardados",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/ExternalDataItem",
                    },
                  },
                },
              },
            },
            401: {
              description: "Token invalido o ausente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
            500: {
              description: "Error interno",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec,
};
