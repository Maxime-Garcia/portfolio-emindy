import pino from 'pino';
import * as fs from 'fs';
import * as path from 'path';

const logsDir = './logs';

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, `app-${new Date().toISOString().split('T')[0]}.log`);

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.transport({
    targets: [
      {
        level: process.env.LOG_LEVEL || 'info',
        target: 'pino/file',
        options: { destination: logFilePath },
      },
      {
        level: 'debug',
        target: 'pino-pretty',
      },
    ],
  })
);
