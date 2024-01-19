import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "../../common/entities/common.entity";
import { CustomerGradeEntity } from "../customer-grade/customer-grade.entity";

@Entity({ name: "customer" })
export class CustomerEntity extends CommonEntity {
    @ApiProperty({ description: "고객 ID" })
    @IsNumber()
    @IsNotEmpty()
    @Column({ type: 'int', comment: "고객 ID", nullable: false })
    cid: number;

    @ApiProperty({ description: "고객명" })
    @IsString()
    @IsNotEmpty()
    @Column({ type: 'varchar', comment: "고객명", nullable: false, length: 30 })
    name: string;

    @ManyToOne(() => CustomerGradeEntity, { eager: true })
    @JoinColumn({ name: 'customer_grade_id', referencedColumnName: 'id' })
    @IsUUID(4,{
      message: "입력한 Card ID가 옳바르지 않습니다."
    })
    @IsNotEmpty({ message: 'Card ID를 입력해주세요.' })
    @ApiProperty({
      example: "09995694-ccba-4a6b-a5be-5a4bdf7133db",
      description: 'Card ID',
      required: true
    })
    @IsNotEmpty({ message: 'ID를 입력해주세요.' })
    customer_grade_id: CustomerGradeEntity
}