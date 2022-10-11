import { Item } from 'src/items/item.entity';
import { Theme } from 'src/themes/theme.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { customFieldTypeEnum } from '../enum/custom-field-type.enum';
import { CustomFieldTitle } from './custom-field-title.entity';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Theme, (theme) => theme.collections)
  theme: Theme;

  @Column({ default: null })
  image: string | null;

  @OneToMany(
    () => CustomFieldTitle,
    (customFieldTitle) => customFieldTitle.collectionId,
  )
  customFieldTitles: CustomFieldTitle[];

  // @Column()
  // customFields: { fieldType: customFieldTypeEnum; title: string }[];

  @OneToMany(() => Item, (item) => item.collection)
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
