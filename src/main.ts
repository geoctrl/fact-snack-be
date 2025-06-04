import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? [
          "https://admin.getfactsnacks.com",
          "exp://localhost:8081",
          "http://localhost:8081",
        ]
      : [
          "http://localhost:3000",
          "exp://localhost:8081",
          "http://localhost:8081",
        ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  const port = process.env.PORT ?? 3333;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
