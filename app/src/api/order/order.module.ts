import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/api/order/order.entity';
import { OrderRepository } from './order.repository';
import { OrderTypeModule } from '../order-type/order-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity])
  ],  
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderRepository]
})
export class OrderModule {}
