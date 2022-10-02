import { Collection } from 'src/collections/collection.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class CollectionItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  tags: string;

  @ManyToOne(() => Collection, (collection) => collection.id)
  collection: Collection;
  @Column()
  public collectionId: string;

  @Column({ default: null })
  likes: string | null;

  @Column({ default: null })
  comments: string | null;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;
  @Column()
  public ownerId: string;

  @Column()
  creator: string;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: null })
  updateDate: string | null;

  @Column({ default: null })
  updatedBy: string | null;
}
