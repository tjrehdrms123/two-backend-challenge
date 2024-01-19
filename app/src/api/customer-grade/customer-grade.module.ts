import { Module } from '@nestjs/common';
import { CustomerGradeService } from './customer-grade.service';
import { CustomerGradeController } from './customer-grade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerGradeEntity } from './customer-grade.entity';
import { CusomerGradeRepository } from './customer-grade.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerGradeEntity])
  ],  
  controllers: [CustomerGradeController],
  providers: [CustomerGradeService, CusomerGradeRepository],
  exports: [CusomerGradeRepository]
})
export class CustomerGradeModule {}
