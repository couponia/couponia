import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { graphqlHTTP } from 'express-graphql';
import { appRouter,graphqlSchema, graphqlRoot, restRouter  } from './routes';
import dotenv from 'dotenv';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';

dotenv.config();

// Express app setup
const app = express();
const PORT = process.env.PORT || 4000;

app.disable('x-powered-by');
app.disable('etag');
// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true,
}));
app.use(express.json());

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Home page route
app.get('/', (req, res) => {
    res.render('home');
});

// Status page route
app.get('/status', (req, res) => {
    res.render('status');
});

// REST routes
app.use('/api/rest', restRouter);

// tRPC routes
app.use(
    '/api/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext: () => ({}),
    })
);

// GraphQL route
app.use(
    '/v1/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlRoot,
        graphiql: true, // Enable GraphiQL interface for testing
    })
);

// Start server
app.listen(PORT, () => {
    console.log({
        home: `http://localhost:${PORT}`,
        restApi: `http://localhost:${PORT}/api/rest`,
        trpcApi: `http://localhost:${PORT}/api/trpc`,
        graphqlApi: `http://localhost:${PORT}/api/graphql`,
    });
});
