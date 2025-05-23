import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PinCode } from "./PinCode";
import { UTSelection } from "./Selection";

@Entity()
export class VoteLog {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => PinCode)
  @JoinColumn({ name: "pinCodeId" })
  pinCode: PinCode;

  @ManyToOne(() => UTSelection)
  @JoinColumn({ name: "maleId" })
  maleSelection: UTSelection;

  @ManyToOne(() => UTSelection)
  @JoinColumn({ name: "femaleId" })
  femaleSelection: UTSelection;
}
