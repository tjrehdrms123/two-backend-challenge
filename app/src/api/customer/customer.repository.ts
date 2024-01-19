import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "src/api/customer/customer.entity";
import { Repository } from "typeorm";

@Injectable()
export class CusomerRepository {
  constructor(
      @InjectRepository(CustomerEntity)
      private readonly CustomerRepository: Repository<CustomerEntity>
  ){}

  async findByCid(cid){
    return await this.CustomerRepository.findOneBy({ 'cid': cid }); 
  }

  async createCustomerAndGrade(CustomerData){
    return await this.CustomerRepository.save(CustomerData);
  }

  async deleteCustomer(){
    return await this.CustomerRepository.delete({});
  }
}