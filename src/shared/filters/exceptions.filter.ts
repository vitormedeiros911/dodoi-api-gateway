import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const req = ctx.getRequest();
    const res = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
      message: response['message'],
      statusCode,
      path: req.url,
      method: req.method,
    });
  }
}
