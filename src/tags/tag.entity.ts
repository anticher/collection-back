import { CollectionItem } from 'src/collection-items/collection-item.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: null })
  createDate: string | null;

  @ManyToMany(() => CollectionItem, (collectionItem) => collectionItem.tags)
  collectionItems: CollectionItem[];
}
