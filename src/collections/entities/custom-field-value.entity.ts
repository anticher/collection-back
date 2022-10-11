import { Item } from 'src/items/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CustomFieldTitle } from './custom-field-title.entity';

@Entity()
export class CustomFieldValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fieldValue: string;

  @ManyToOne(() => Item, (item) => item.customFieldValues)
  item: Item;
  @Column()
  itemId: string;

  @ManyToOne(
    () => CustomFieldTitle,
    (customFieldTitle) => customFieldTitle.customFieldValues,
  )
  customFieldTitle: CustomFieldTitle;
  @Column()
  customFieldTitleId: string;

  @Column()
  creatorName: string;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: null })
  updateDate: string | null;

  @Column({ default: null })
  updatedBy: string | null;
}
