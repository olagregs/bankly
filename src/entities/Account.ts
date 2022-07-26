import { Entity, PrimaryColumn, ManyToOne, OneToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"

import { User } from "./User";
import { Category } from "./Category";

@Entity("accounts")
export class Account {

  @PrimaryColumn()
  readonly id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  user_id: string;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @Column()
  category_id: string;

  @Column()
  balance: number;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}