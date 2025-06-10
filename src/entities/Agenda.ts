import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  info: string;

  @Column()
  time: string;

  @Column({ default: false })
  current: boolean;
}
