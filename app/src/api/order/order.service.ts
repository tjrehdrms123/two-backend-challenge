import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  monthlySalesAvg() {
    return this.orderRepository.monthlySalesAvg();
  }

  orderList(searchOption){
    const { pageSize, pageNo, orderType } = searchOption;
    //Read: 페이지 네이션 기본 값 추가
    if(pageNo == ''){
      searchOption.pageNo = 1
    }
    if(pageSize == ''){
      searchOption.pageSize = 50
    }
    if(orderType != ''){
      orderType == 0 ? searchOption.orderType = 'order' : searchOption.orderType = 'refund'
    }
    return this.orderRepository.orderList(searchOption);
  }
}
