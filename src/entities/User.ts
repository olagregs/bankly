import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity("users")
export class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column({
    length: 11
  })
  cpf: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}