// src/services/logger.service.ts

enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
  }
  
  interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: Record<string, any>;
  }
  
  class Logger {
    private log(level: LogLevel, message: string, context?: Record<string, any>) {
      const logEntry: LogEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        context,
      };
  
      // For now, we'll just log to the console.
      // This can be expanded to send logs to a remote server.
      console[level.toLowerCase()]?.(JSON.stringify(logEntry, null, 2));
    }
  
    debug(message: string, context?: Record<string, any>) {
      this.log(LogLevel.DEBUG, message, context);
    }
  
    info(message: string, context?: Record<string, any>) {
      this.log(LogLevel.INFO, message, context);
    }
  
    warn(message: string, context?: Record<string, any>) {
      this.log(LogLevel.WARN, message, context);
    }
  
    error(message: string, error?: Error, context?: Record<string, any>) {
        const errorContext = {
            ...context,
            error: error ? { message: error.message, stack: error.stack } : undefined,
        };
      this.log(LogLevel.ERROR, message, errorContext);
    }
  }
  
  export const logger = new Logger(); 