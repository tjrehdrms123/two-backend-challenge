import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerEntity } from 'src/api/customer/customer.entity';
import { CusomerRepository } from './customer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity])
  ],  
  controllers: [CustomerController],
  providers: [CustomerService,CusomerRepository],
  exports: [CusomerRepository]
})
export class CustomerModule {}
             