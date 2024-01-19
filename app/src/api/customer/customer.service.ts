import { Injectable } from '@nestjs/common';
import { CusomerRepository } from './customer.repository';
import { CusomerGradeRepository } from '../customer-grade/customer-grade.repository';

@Injectable()
export class CustomerService {
  constructor(
    // private readonly cusomerRepository: CusomerRepository,
  ) {}
}
