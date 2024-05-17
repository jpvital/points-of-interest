import { scopePerRequest } from 'awilix-express';
import express, { Request, Response } from 'express';
import 'reflect-metadata';

import routes from './api/routes';
import container from './utils/context';
import { CustomError } from './utils/error';

const app = express();
const port = 3000;

app.use(scopePerRequest(container));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

// health check endpoint
app.get('/health', (req, res) => {
    res.send('API is up and running');
});

// error handling middleware
app.use((err: CustomError, _req: Request, res: Response) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ message: err.message })

})

// catch-all route
app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' });
});

export default app;


// createConnection().then(async connection => {}).catch(error => console.log(error));