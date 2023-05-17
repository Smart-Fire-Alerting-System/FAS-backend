import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
    swagger: '3.0.0',
    info: {
      title: 'Express API for JSONPlaceholder',
      version: '1.0.0',
      description: 'Swagger API docs for FAS project'
    },
    servers: [
        {
            url: 'http://localhost:5000'
        }
    ]
  };
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
  };
  
export const swaggerSpec = swaggerJSDoc(options);