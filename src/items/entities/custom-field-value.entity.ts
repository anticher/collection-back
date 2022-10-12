import { Item } from 'src/items/entities/item.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CustomFieldTitle } from '../../collections/entities/custom-field-title.entity';

@Entity()
export class CustomFieldValue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fieldValue: string;

  @ManyToOne(() => Item, (item) => item.customFieldValues)
  item: Item;

  @ManyToOne(
    () => CustomFieldTitle,
    (customFieldTitle) => customFieldTitle.customFieldValues,
  )
  customFieldTitle: CustomFieldTitle;

  @Column()
  creatorName: string;

  @Column({ default: null })
  createDate: string | null;

  @Column({ default: null })
  updateDate: string | null;

  @Column({ default: null })
  updatedBy: string | null;
}
