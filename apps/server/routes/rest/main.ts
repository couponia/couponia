import Router from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

interface HealthStatus {
    status: 'healthy' | 'degraded' | 'unhealthy';
    services: {
        [key: string]: {
            status: 'up' | 'down';
            responseTime?: number;
            lastChecked: string;
        };
    };
}

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.get('/health', async (req, res) => {
    const startTime = Date.now();
    const health: HealthStatus = {
        status: 'healthy',
        services: {}
    };

    // Check database connection
    try {
        const dbStart = Date.now();
        await prisma.$queryRaw`SELECT 1`;
        health.services.database = {
            status: 'up',
            responseTime: Date.now() - dbStart,
            lastChecked: new Date().toISOString()
        };
    } catch (error) {
        health.services.database = {
            status: 'down',
            lastChecked: new Date().toISOString()
        };
        health.status = 'degraded';
    }

    // Check REST API
    health.services.rest = {
        status: 'up',
        responseTime: Date.now() - startTime,
        lastChecked: new Date().toISOString()
    };

    // Check GraphQL
    try {
        const gqlStart = Date.now();
        await fetch(`${process.env.APP_URL || 'http://localhost:4000'}/api/graphql?query={__schema{types{name}}}`);
        health.services.graphql = {
            status: 'up',
            responseTime: Date.now() - gqlStart,
            lastChecked: new Date().toISOString()
        };
    } catch (error) {
        health.services.graphql = {
            status: 'down',
            lastChecked: new Date().toISOString()
        };
        health.status = 'degraded';
    }

    // Check tRPC
    try {
        const trpcStart = Date.now();
        await fetch(`${process.env.APP_URL || 'http://localhost:4000'}/api/trpc/hello`);
        health.services.trpc = {
            status: 'up',
            responseTime: Date.now() - trpcStart,
            lastChecked: new Date().toISOString()
        };
    } catch (error) {
        health.services.trpc = {
            status: 'down',
            lastChecked: new Date().toISOString()
        };
        health.status = 'degraded';
    }

    res.json(health);
});

export { router as restRouter };