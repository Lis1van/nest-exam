import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Request, Response } from 'express';

interface CustomErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number;
    let message: string | string[];
    let error: string;

    if (exception instanceof HttpException) {
      // Если это HttpException (например, NotFound, Unauthorized и т.д.)
      const responseBody = exception.getResponse();
      statusCode = exception.getStatus();

      if (typeof responseBody === 'string') {
        message = responseBody;
        error = exception.name;
      } else if (typeof responseBody === 'object') {
        const responseObject = responseBody as Record<string, any>;
        message = responseObject.message || 'Произошла ошибка';
        error = responseObject.error || exception.name;
      }
    } else if (Array.isArray((exception as any).constraints)) {
      // Обработка ошибок валидации
      statusCode = HttpStatus.BAD_REQUEST;
      const errors = (exception as ValidationError).constraints;

      // Преобразуем в сообщения на русском
      const translatedErrors = Object.values(errors).map((error) => {
        if (error.includes('must be longer than or equal to')) {
          return 'Минимальная длина должна быть соблюдена';
        }
        return error; // Для остальных оставляем как есть
      });

      message = [...new Set(translatedErrors)]; // Убираем дубликаты
      error = 'Ошибка валидации';
    } else {
      // Для остальных ошибок
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Внутренняя ошибка сервера';
      error = (exception as Error).name || 'Неизвестная ошибка';
    }

    const errorResponse: CustomErrorResponse = {
      statusCode,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(statusCode).json(errorResponse);
  }
}
