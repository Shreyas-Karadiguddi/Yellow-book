import swaggerJSDoc from "swagger-jsdoc";
import { userApiDocs } from "./api/users/apiDefination.js";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Yellow book API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your **JWT Bearer token** here. Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...`",
                },
            },
        },
        security: [{ bearerAuth: [] }],
        paths: { ...userApiDocs }
    },
    apis: ['./api/**.js'],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions)
