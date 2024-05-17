import swaggerJsdoc from 'swagger-jsdoc';

const routeFilesExtension = 'js';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'A simple Express API',
        },
    },
    apis: [`./src/api/routes/*.routes.${routeFilesExtension}`],
};

const specs = swaggerJsdoc(options);

export default specs;