import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public card_number: string;

  @Column()
  public cvv: string;

  @Column()
  public expiration_month: string;

  @Column()
  public expiration_year: string;

  @Column()
  public email: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
