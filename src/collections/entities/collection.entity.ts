import { Item } from 'src/items/entities/item.entity';
import { Topic } from 'src/topics/topic.entity';
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

  @ManyToOne(() => Topic, (topic) => topic.collections)
  topic: Topic;

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

  @Column()
  ownerName: string;

  @Column()
  creatorName: string;

  @Column({ default: null })
  createDate: string | null;
}
