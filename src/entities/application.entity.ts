import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SurahCategory } from "./surah.entity";

@Entity({ name: "application" })
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: SurahCategory })
  ageGroup: SurahCategory;
  
  @Column()
  applicationId: string;

  @Column()
  fname: string;

  @Column()
  email: string;

  @Column()
  lname: string;

  @Column()
  dob: string;

  @Column()
  age: number;

  @Column()
  state: string;

  @Column()
  lga: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  tiktok: string;

  @Column()
  madrasah: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  passport: string;

  @Column({ nullable: true })
  birthCert: string;

  @Column({ nullable: true })
  hafizCert: string;

  @Column({ nullable: true })
  appVideo: string;
}