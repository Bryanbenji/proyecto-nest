import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './config/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from './producto/producto.module';
import { dirname } from 'path';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { UsuarioEntity } from './usuario/usuario.entity';
import { RolEntity } from './rol/rol.entity';
import { ProductoEntity } from './producto/producto.entity';
import { AuthModule } from './auth/auth.module';
import { CategoriaEntity } from './categoria/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ProveedorEntity } from './proveedor/proveedor.entity';
import { ContratoEntity } from './contrato/contrato.entity';
import { ContratoModule } from './contrato/contrato.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: [UsuarioEntity,ProductoEntity,RolEntity, CategoriaEntity, ProveedorEntity, ContratoEntity],
        synchronize: true,
        logging: false
      }),
      inject: [ConfigService],
    }),
    ProductoModule,
    UsuarioModule,
    CategoriaModule,
    ProveedorModule,
    ContratoModule,
    RolModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
