import { Column, Entity, Unique } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CommonEntity } from "../../common/entities/common.entity";

enum Grade {
  A,
  B,
  C,
}

@Entity({ name: "customer_grade" })
@Unique(['grade'])
export class CustomerGradeEntity extends CommonEntity {
    @ApiProperty({ description: "고객 등급" })
    @IsString()
    @IsNotEmpty()
    @Column({ type: 'varchar', comment: "등급", nullable: false, length: 10 })
    grade: Grade;
}