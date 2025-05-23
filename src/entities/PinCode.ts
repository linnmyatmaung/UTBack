import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PinCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  status: number;
}
