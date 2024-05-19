import dotenv from 'dotenv';
dotenv.config()

import { scopePerRequest } from 'awilix-express';
import express, { Request, Response } from 'express';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';

import routes from './api/routes';
import { PostgresDataSource } from './persistence/data-sources/postgres.data-source';
import swaggerDocument from './swagger';
import container from './utils/context';
import { ApiError } from './utils/error';

// Get the PostgresDataSource instance from the container
const postgresDataSource = container.resolve<PostgresDataSource>('postgresDataSource');

const main = async () => {
    postgresDataSource.init();
};

main().catch(err => {
    console.error(err);
    process.exit(1);
});

const app = express();

app.use(scopePerRequest(container));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

// health check endpoint
app.get('/health', (_req, res) => {
    res.send('API is up and running');
});

// swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch-all route
app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' });
});

// error handling middleware
app.use((err: ApiError, _req: Request, res: Response) => {
    res.status(err.statusCode || 500).json({ message: err.message })
})

export default app;
