import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

//TODO handle erro log in files
const filename="TODO-ServerLog"

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: `logs/${filename}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export default logger;