"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const configService = app.get(config_1.ConfigService);
    logger.log('=== CONFIGURAÇÃO DO AMBIENTE ===');
    logger.log(`DB_HOST: ${configService.get('DB_HOST')}`);
    logger.log(`DB_PORT: ${configService.get('DB_PORT')}`);
    logger.log(`DB_USER: ${configService.get('DB_USER')}`);
    logger.log(`DB_PASS: ${configService.get('DB_PASS')}`);
    logger.log(`DB_NAME: ${configService.get('DB_NAME')}`);
    logger.log(`DB_SYNC: ${configService.get('DB_SYNC')}`);
    logger.log('================================');
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`Aplicação rodando na porta ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map