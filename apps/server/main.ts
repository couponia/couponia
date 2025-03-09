import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { graphqlHTTP } from 'express-graphql';
import { appRouter,graphqlSchema, graphqlRoot  } from './routes';
import dotenv from 'dotenv';

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

// REST routes
app.get('/api/rest/hello', (req, res) => {
    const name = req.query.name as string | undefined;
    res.json({ message: `Hello ${name ?? 'World'} from REST!` });
});

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
    '/api/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlRoot,
        graphiql: true, // Enable GraphiQL interface for testing
    })
);

// Start server
app.listen(PORT, () => {
    console.log({
        server: `http://localhost:${PORT}`,
        rest: `http://localhost:${PORT}/api/rest`,
        trpc: `http://localhost:${PORT}/api/trpc`,
        graphql: `http://localhost:${PORT}/api/graphql`,
    });
});
