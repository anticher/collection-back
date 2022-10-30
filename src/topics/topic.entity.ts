import { Collection } from 'src/collections/entities/collection.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: null })
  createDate: string | null;

  @OneToMany(() => Collection, (collection) => collection.topic, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  collections: Collection[];
}
