import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
