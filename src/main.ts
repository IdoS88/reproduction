import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './exception-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,   // for development we want to see the error messages. but for production we may with to disable error
    transform: true,
  }));
 
  const config = new DocumentBuilder()
    .setTitle('GESHEM openAPI documentation')
    .setDescription(' TODO description')
    .setVersion('1.0')
    //.addTag('Crop','projects', 'plots')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT);
}
bootstrap();
