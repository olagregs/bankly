import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Account } from './Account';

@Entity("statements")
export class Statement {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  operation: string;

  @Column()
  description: string;

  @Column()
  amount: number;

  @ManyToOne(() => Account)
  @JoinColumn()
  account: Account;

  @Column()
  account_id: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}