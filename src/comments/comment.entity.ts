import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ fulltext: true })
  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
  @Column()
  public userId: string;

  @ManyToOne(() => Item, (item) => item.id)
  item: Item;
  @Column()
  public itemId: string;

  @Column({ default: null })
  createDate: string | null;
}
