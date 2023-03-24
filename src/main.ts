import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './modules/pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('training-center')
    .setVersion(process.version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/api', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
}

bootstrap();
