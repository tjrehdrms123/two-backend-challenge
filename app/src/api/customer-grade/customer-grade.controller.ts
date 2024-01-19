import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerGradeService } from './customer-grade.service';

@Controller('customer-grade')
export class CustomerGradeController {
  constructor(private readonly customerGradeService: CustomerGradeService) {}
}
