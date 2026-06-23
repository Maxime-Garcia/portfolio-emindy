import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { config } from 'dotenv';
import { contactRoutes } from './routes/contact.js';
import { logger } from './utils/logger.js';

config();

const fastify = Fastify({
  logger: logger,
});

// Register plugins
await fastify.register(helmet);
await fastify.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
});
await fastify.register(rateLimit, {
  max: 100,
  timeWindow: '15 minutes',
});

// Health check
fastify.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// API version
fastify.get('/api/version', async () => {
  return { version: '1.0.0' };
});

// Routes
await fastify.register(contactRoutes, { prefix: '/api/contact' });

// Start server
const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000', 10);
    const host = process.env.HOST || '0.0.0.0';
    await fastify.listen({ port, host });
    console.log(`🚀 Server running at http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
