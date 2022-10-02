import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  theme: string;

  @Column({ default: null })
  image: string | null;

  @Column()
  owner: string;

  @Column()
  creator: string;

  @Column({ default: null })
  items: string | null;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: null })
  updateDate: string | null;

  @Column({ default: null })
  updatedBy: string | null;
}
