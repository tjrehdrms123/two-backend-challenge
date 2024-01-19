import { Column, Entity, JoinColumn, ManyToOne, OneToOne, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "../../common/entities/common.entity";
import { CustomerEntity } from "../customer/customer.entity";
import { OrderTypeEntity } from "../order-type/order-type.entity";

@Entity({ name: "order" })
export class OrderEntity extends CommonEntity {
    @ApiProperty({ description: "주문금액" })
    @IsNumber()
    @IsNotEmpty()
    @Column({ type: 'int', comment: "주문금액", nullable: false })
    amount: number;

    @ApiProperty({ description: "주문일자" })
    @IsNotEmpty()
    @UpdateDateColumn({ type: 'timestamp' })
    @ApiProperty({
      example: '2023-07-13T06:28:32.525Z',
      description: '주문일자',
      required: true,
      type: String
    })
    orderDate: Date;

    @ManyToOne(() => CustomerEntity, { eager: true })
    @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
    @IsUUID(4,{
      message: "입력한 ID가 옳바르지 않습니다."
    })
    @IsNotEmpty({ message: 'ID를 입력해주세요.' })
    @ApiProperty({
      example: "09995694-ccba-4a6b-a5be-5a4bdf7133db",
      description: 'customer_id',
      required: true
    })
    @IsNotEmpty({ message: 'ID를 입력해주세요.' })
    customer_id: CustomerEntity

    @ManyToOne(() => OrderTypeEntity, { eager: true })
    @JoinColumn({ name: 'order_type_id', referencedColumnName: 'id' })
    @IsUUID(4,{
      message: "입력한 ID가 옳바르지 않습니다."
    })
    @IsNotEmpty({ message: 'ID를 입력해주세요.' })
    @ApiProperty({
      example: "09995694-ccba-4a6b-a5be-5a4bdf7133db",
      description: 'order_type_id',
      required: true
    })
    @IsNotEmpty({ message: 'ID를 입력해주세요.' })
    order_type_id: OrderTypeEntity
}