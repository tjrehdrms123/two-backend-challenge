import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderTypeService } from './order-type.service';

@Controller('order-type')
export class OrderTypeController {
  constructor(private readonly orderTypeService: OrderTypeService) {}

}
