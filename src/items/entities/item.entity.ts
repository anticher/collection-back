import { Collection } from 'src/collections/entities/collection.entity';
import { CustomFieldValue } from 'src/items/entities/custom-field-value.entity';
import { Comment } from 'src/comments/comment.entity';
import { Tag } from 'src/tags/tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Like } from 'src/likes/like.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ fulltext: true })
  @Column()
  name: string;

  @ManyToMany(() => Tag, (tag) => tag.collectionItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'item_tag',
  })
  tagNames: Tag[];

  @Column({ default: null })
  image: string | null;

  @ManyToOne(() => Collection, (collection) => collection.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  collection: Collection;
  @Column()
  collectionId: string;

  @OneToMany(
    () => CustomFieldValue,
    (customFieldValue) => customFieldValue.item,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  customFieldValues: CustomFieldValue[];

  @OneToMany(() => Like, (like) => like.item)
  likes: Like[];

  @Column()
  ownerName: string;

  @OneToMany(() => Comment, (comment) => comment.item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comments: Comment[];

  @Column()
  creatorName: string;

  @Column({ default: null })
  createDate: string | null;
}
