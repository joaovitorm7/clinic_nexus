import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'joao123', // Senha do meu MySQL
      database: 'clinic_nexus', // Nome do banco de dados 
      autoLoadEntities: true,
      synchronize: true, // Só em desenvolvimento!
      logging: true, // Ativa logs de queries para encontrar o erro de conexão com o banco
    }),
  ],
})
export class AppModule {}
