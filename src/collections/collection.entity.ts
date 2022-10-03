import { CollectionItem } from 'src/collection-items/collection-item.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

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

  @OneToMany(
    () => CollectionItem,
    (collectionItem) => collectionItem.collection,
  )
  collectionItems: CollectionItem[];

  @ManyToOne(() => User, (user) => user.id)
  owner: User;
  @Column()
  ownerId: string;

  @Column()
  creator: string;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: null })
  updateDate: string | null;

  @Column({ default: null })
  updatedBy: string | null;
}
