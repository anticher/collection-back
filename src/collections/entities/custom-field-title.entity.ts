import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { customFieldTypeEnum } from '../enum/custom-field-type.enum';
import { Collection } from './collection.entity';
import { CustomFieldValue } from '../../items/entities/custom-field-value.entity';

@Entity()
export class CustomFieldTitle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: customFieldTypeEnum,
  })
  fieldType: customFieldTypeEnum;

  @Column()
  fieldName: string;

  @Column()
  fieldIndex: number;

  @OneToMany(
    () => CustomFieldValue,
    (customFieldValue) => customFieldValue.customFieldTitle,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  customFieldValues: CustomFieldValue[];

  @ManyToOne(() => Collection, (Collection) => Collection.customFieldTitles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  collection: Collection;
  @Column()
  collectionId: string;

  @Column()
  creatorName: string;

  @Column({ default: null })
  createDate: string | null;
}
