import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';
import { cors } from '@elysiajs/cors';
import logger from 'logixlysia';

import { AppRoutes } from './app.routes';
import { env } from './shared/infrastructure/env';

const app = new Elysia()
  .use(logger())
  .use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
      allowedHeaders: ['Content-Type'], // Allowed headers
    }),
  )
  .use(
    swagger({
      exclude: ['/swagger'],
      autoDarkMode: true,
      documentation: {
        info: {
          title: '🦊 Elysia Clean Architecture',
          description:
            'Clean Architecture pattern for ElysiaJS + Bun + Postgres.js',
          version: '1.0.0',
        },
      },
    }),
  )
  .use(AppRoutes);

app.listen({ port: env.PORT });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
