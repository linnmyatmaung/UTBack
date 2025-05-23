import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UTSelection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  profileImg: string;

  @Column({ nullable: true })
  major: string;

  @Column({ nullable: true })
  hobby: string;
}
