import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { CusomerRepository } from '../customer/customer.repository';
import { CusomerGradeRepository } from '../customer-grade/customer-grade.repository';
import { OrderRepository } from '../order/order.repository';
import { OrderTypeRepository } from '../order-type/order-type.repository';
import { keyMatchColumn, uniqueValue } from 'src/utils/global';

@Injectable()
export class UploadService {
  constructor(
    private readonly cusomerRepository: CusomerRepository,
    private readonly cusomerGradeRepository: CusomerGradeRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderTypeRepository: OrderTypeRepository,
  ) {}

  /**
   * 엑셀 파일 읽기
   * @param file 엑셀 파일
   */
  readFile(file) {
    const workbook = XLSX.read(file.buffer, {   cellText:false, 
      cellDates:true });
    return workbook;
  }

  /**
   * 업로드된 파일의 시트 내용 JSON 포맷으로 변경
   * @param file 
   */
  convertFile(file){
    const workbook = this.readFile(file);
    let result = [];
    for(let i = 0; i < workbook.SheetNames.length; i++){
      let sheet = workbook.Sheets[workbook.SheetNames[i]]; // ['customer', 'order']
      result.push(XLSX.utils.sheet_to_json(sheet));
    }
    return result;
  }

  /**
   * 엑셀 파일 업로드
   * @param file 
   */
  async uploadFile(file){
    const [ customer, order ] = this.convertFile(file);
    await this.uploadGrade(customer);
    await this.uploadCustomer(customer);
    await this.uploadOrderType(order);
    await this.uploadOrder(order);    
    return true;
  }

  // Read: ===================== 등급 저장 =====================    
  async uploadGrade(customer){
    try{
      // Read: 고유한 등급 추출
      const uniqueGradeData = uniqueValue(customer,'grade', '고객등급');
      await this.cusomerGradeRepository.deleteGrade();
      await this.cusomerGradeRepository.createCustomerGrade(uniqueGradeData);
      return true;
    } catch(err){
      console.log('err:',err);
    }
  }

  // Read: ===================== 회원 저장 =====================
  async uploadCustomer(customer){
    try{
      // Read: key 값 컬럼과 맞춰주기
      const customerData = keyMatchColumn(customer, { '고객 id': 'cid', '고객명': 'name', '고객등급': 'grade' })

      // Read: API호출해서 Grade FK 연결 시키기
      const customerGradeData = async () => {
        const result = [];
      
        for(let i = 0; i < customerData.length; i++) {
          const gradeObj = await this.cusomerGradeRepository.findByGrade(customerData[i].grade);
          result.push({
            ...customerData[i],
            customer_grade_id: gradeObj.id
          });
        }
      
        return result;
      }
      await this.cusomerRepository.deleteCustomer();
      await this.cusomerRepository.createCustomerAndGrade(await customerGradeData());
      return true;
    } catch(err){
      console.log('err:',err);
    }
  }

   // Read: ===================== 등급 저장 =====================   
  async uploadOrderType(order){
    try{
      const uniqueTypeData = uniqueValue(order, 'type','주문타입');
      await this.orderTypeRepository.deleteOrderType();
      await this.orderTypeRepository.createOrderType(uniqueTypeData);
      return true;
    } catch(err){
      console.log('err:',err);
    }
  }

  async uploadOrder(order){
    // Read: ===================== 주문 저장 =====================
    try{
      // Read: key 값 컬럼과 맞춰주기
      const orderData = keyMatchColumn(order, { '주문고객 id': 'customer', '주문일자': 'orderDate', '주문타입': 'type', '주문금액': 'amount' })

      // ERROR: xlsx에서 날짜 파싱시 1일 추가되어서 1일을 빼는 로직 추가
      orderData.forEach(orderItem => {
        const orderDate = new Date(orderItem.orderDate);
        orderDate.setDate(orderDate.getDate() + 1);
        orderItem.orderDate = orderDate.toISOString();
      });

      // Read: API호출해서 Customer FK(주문고객), OrderType FK(주문타입), 연결 시키기
      const orderTypeCustomerData = async () => {
        const result = [];
      
        for(let i = 0; i < orderData.length; i++) {
          const cusomterObj = await this.cusomerRepository.findByCid(orderData[i].customer);
          const typeObj = await this.orderTypeRepository.findByOrderType(orderData[i].type);
          result.push({
            ...orderData[i],
            customer_id: cusomterObj.id,
            order_type_id: typeObj.id
          });
        }
        return result;
      }
      await this.orderRepository.deleteOrder();
      await this.orderRepository.createOrder(await orderTypeCustomerData());
    } catch(err){
      console.log('err:',err);
    }
  }
}