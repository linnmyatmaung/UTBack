import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  songTitle: string;

  @Column()
  studentName: string;

  @Column()
  studentInfo: string;

  @Column()
  time: string;

  @Column({ default: false })
  current: boolean;
}
