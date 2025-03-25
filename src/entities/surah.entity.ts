import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

export enum SurahCategory {
  STARTER = "8-12",
  INTERMEDIATE = "13-18",
  ADVANCE = "19-25"
}

@Entity("surah")
export class Surah {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "enum", enum: SurahCategory })
  category: SurahCategory;

  @ManyToOne(() => User, user => user)
  user: User;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}