import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmConfigService } from './typeorm.config.service';
import { CustomerModule } from './api/customer/customer.module';
import { OrderModule } from './api/order/order.module';
import { UploadModule } from './api/upload/upload.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as Joi from 'joi'

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<Object> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: configService.get('DB_TYPE'),
    host: configService.get('DB_HOST'), // process.env.DB_HOST
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: process.env.NODE_ENV === 'development' ? configService.get('DB_PASSWORD') : configService.get('DB_PASSWORD_PRO'),
    database: configService.get('DB_NAME'),
    entities: ['dist/**/*.entity.js'],
    synchronize: true, //! set 'false' in production
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
    charset: 'utf8mb4_general_ci',
  }),
  inject: [ConfigService],
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    CustomerModule,
    OrderModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
