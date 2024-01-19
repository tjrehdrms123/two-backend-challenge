import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CustomerModule } from '../customer/customer.module';
import { CustomerGradeModule } from '../customer-grade/customer-grade.module';
import { OrderModule } from '../order/order.module';
import { OrderTypeModule } from '../order-type/order-type.module';

@Module({
  imports: [
    CustomerModule,
    CustomerGradeModule,
    OrderModule,
    OrderTypeModule
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
