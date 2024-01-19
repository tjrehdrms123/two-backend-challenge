import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderTypeEntity } from "./order-type.entity";

@Injectable()
export class OrderTypeRepository {
  constructor(
      @InjectRepository(OrderTypeEntity)
      private readonly OrderTypeRepository: Repository<OrderTypeEntity>
  ){}

  async findByOrderType(type){
    return await this.OrderTypeRepository.findOneBy({ 'type': type }); 
  }

  async createOrderType(orderTypeData): Promise<OrderTypeEntity | null>{
    return await this.OrderTypeRepository.save(orderTypeData);
  }

  async deleteOrderType(){
    return await this.OrderTypeRepository.delete({});
  }
}