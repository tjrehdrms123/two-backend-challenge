import { Module } from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { OrderTypeController } from './order-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTypeEntity } from './order-type.entity';
import { OrderTypeRepository } from './order-type.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderTypeEntity])
  ],  
  controllers: [OrderTypeController],
  providers: [OrderTypeService, OrderTypeRepository],
  exports: [OrderTypeRepository]
})
export class OrderTypeModule {}
