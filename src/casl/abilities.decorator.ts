import { SetMetadata } from '@nestjs/common';
import { Actions } from './actions.enum';
import { Subjects } from './casl-ability.factory';

export interface RequiredRule {
  action: Actions;
  subject: Subjects;
}

export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata('check_ability', requirements);
