import { Item } from 'src/items/item.entity';
import { Theme } from 'src/themes/theme.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Theme, (theme) => theme.collections)
  @JoinTable({
    name: 'collection_theme',
  })
  theme: Theme;

  @Column({ default: null })
  image: string | null;

  @OneToMany(() => Item, (item) => item.collection)
  items: Item[];

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
