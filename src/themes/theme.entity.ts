import { Collection } from 'src/collections/collection.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: null })
  createDate: string | null;

  @OneToMany(() => Collection, (collection) => collection.theme)
  collections: Collection[];
}
