import { Item } from 'src/items/item.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  author: string;

  @ManyToOne(() => User, (user) => user.id)
  owner: User;
  @Column()
  ownerId: string;

  @ManyToOne(() => Item, (item) => item.id)
  item: Item;
  @Column()
  itemId: string;

  @Column({ default: null })
  createDate: string | null;
}
