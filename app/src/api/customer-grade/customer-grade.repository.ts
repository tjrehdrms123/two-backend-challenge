import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "src/api/customer/customer.entity";
import { CustomerGradeEntity } from "src/api/customer-grade/customer-grade.entity";
import { Repository } from "typeorm";

@Injectable()
export class CusomerGradeRepository {
  constructor(
      @InjectRepository(CustomerGradeEntity)
      private readonly CustomerGradeRepository: Repository<CustomerGradeEntity>
  ){}

 async createCustomerGrade(CustomerGradeData): Promise<CustomerGradeEntity | null>{
    return await this.CustomerGradeRepository.save(CustomerGradeData);
  }

  async findByGrade(grade){
    return await this.CustomerGradeRepository.findOneBy({ 'grade': grade }); 
  }

  async deleteGrade(){
    return await this.CustomerGradeRepository.delete({});
  }
}