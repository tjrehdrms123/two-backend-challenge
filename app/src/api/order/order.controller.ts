import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: '2. 월별 매출 통계 API' })
  @Post()
  monthlySalesAvg() {
    return this.orderService.monthlySalesAvg();
  }

  @ApiOperation({ summary: '3. 주문 목록 조회 API' })
  @Get()
  orderList(
      @Query('startDate') startDate: string, 
      @Query('endDate') endDate: string,
      @Query('orderType') orderType: number,
      @Query('customerId') customerId: number,
      @Query('pageSize') pageSize: number,
      @Query('pageNo') pageNo: number,
    ) {
    return this.orderService.orderList({
      'startDate':startDate,
      'endDate':endDate,
      'orderType':orderType,
      'customerId':customerId,
      'pageSize':pageSize,
      'pageNo':pageNo
    });
  }
}
