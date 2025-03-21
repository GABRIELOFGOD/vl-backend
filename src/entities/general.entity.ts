import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("general")
export class General {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", default: true })
  applicationOpen: boolean;

  @Column({ type: "boolean", default: true })
  allowVideoUpload: boolean;

  @Column({ type: "boolean", default: true })
  allowAdminRegistration: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}