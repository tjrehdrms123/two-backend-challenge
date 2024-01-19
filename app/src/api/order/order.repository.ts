import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "./order.entity";

@Injectable()
export class OrderRepository {
  constructor(
      @InjectRepository(OrderEntity)
      private readonly OrderRepository: Repository<OrderEntity>
  ){}

 async createOrder(orderData): Promise<OrderEntity | null>{
    return await this.OrderRepository.save(orderData);
  }

  async deleteOrder(){
    return await this.OrderRepository.delete({});
  }

  /**
   * POST: 월별 매출 통계
   */
  async monthlySalesAvg(){
    const result =  await this.OrderRepository.createQueryBuilder('order')
    .select([
      "DATE_FORMAT(order.order_date, '%Y-%m') AS month",
      "SUM(CASE WHEN ot.type = 'order' THEN order.amount ELSE 0 END) AS 주문액",
      "SUM(CASE WHEN ot.type = 'refund' THEN order.amount ELSE 0 END) AS 반품액",
      "SUM(CASE WHEN ot.type = 'order' THEN order.amount ELSE -order.amount END) AS '월 매출'"
    ])
    .leftJoin('order.order_type_id', 'ot')
    .groupBy('month')
    .orderBy('month')
    .getRawMany();

    return result;
  }

  /**
   * 
   */
  async orderList(searchOption) {
    const { startDate, endDate, orderType, customerId, pageSize, pageNo } = searchOption;

    const queryBuilder = await this.OrderRepository.createQueryBuilder('order')
    .select([
        "order.order_date as '주문일자'",
        "c.name as '주문고객명'",
        "cg.grade as '주문고객 등급'",
        "ot.type as '주문타입'",
        "order.amount as '주문금액'"
    ])
    .leftJoin('order.customer_id', 'c')
    .leftJoin('c.customer_grade_id', 'cg')
    .leftJoin('order.order_type_id', 'ot')
    .orderBy('order.order_date', 'DESC')
    .limit(pageSize) // 페이지당 보여줄 행의 갯수
    .offset(pageSize * (pageNo - 1)) // 페이지에 따라 건너뛸 행의 수 계산
    // Read: 문기간(시작일, 종료일) 내의 주문만 조회
    if(startDate && endDate){
      queryBuilder.where('order.order_date >= :startDate', { startDate })
      queryBuilder.andWhere('order.order_date <= :endDate', { endDate })
    }
    // Read: 주문 또는 반품만을 조회 또는 둘 다 조회
    if(orderType){
      queryBuilder.andWhere('ot.type = :type', { type: orderType })
    }
    // Read: 특정 고객의 주문(또는 반품, 또는 둘 다)만을 조회
    if(customerId){
      queryBuilder.andWhere('c.cid = :cid', { cid: customerId })
    }
    const result = await queryBuilder.getRawMany();

    return result;
  }

}