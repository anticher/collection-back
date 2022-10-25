import { Item } from 'src/items/entities/item.entity';
import { Theme } from 'src/themes/theme.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { CustomFieldTitle } from './custom-field-title.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ fulltext: true })
  @Column()
  name: string;

  @Index({ fulltext: true })
  @Column('text')
  description: string;

  @ManyToOne(() => Theme, (theme) => theme.collections)
  theme: Theme;

  @Column({ default: null })
  image: string | null;

  @OneToMany(
    () => CustomFieldTitle,
    (customFieldTitle) => customFieldTitle.collection,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  customFieldTitles: CustomFieldTitle[];

  @OneToMany(() => Item, (item) => item.collection, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  items: Item[];

  @ManyToOne(() => User, (user) => user.username)
  owner: User;
  @Column()
  ownerName: string;

  @Column()
  creatorName: string;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: null })
  updateDate: string | null;

  @Column({ default: null })
  updatedBy: string | null;
}
