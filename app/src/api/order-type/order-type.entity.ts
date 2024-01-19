import { Column, Entity, Unique } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "../../common/entities/common.entity";

enum Type {
  order,
  refund
}

@Entity({ name: "order_type" })
@Unique(['type'])
export class OrderTypeEntity extends CommonEntity {
    @ApiProperty({ description: "주문 타입" })
    @IsString()
    @IsNotEmpty()
    @Column({ type: 'varchar', comment: "타입", nullable: false, length: 10 })
    type: Type;
}