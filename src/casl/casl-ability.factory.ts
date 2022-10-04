import {
  AbilityBuilder,
  InferSubjects,
  createMongoAbility,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/auth/role.enum';
import { Collection } from 'src/collections/collection.entity';
import { User } from 'src/users/user.entity';
import { Actions } from './actions.enum';

export type Subjects = InferSubjects<typeof User | typeof Collection> | 'all';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
    if (!user) {
      can(Actions.Read, 'all');
    }
    if (user.role === Role.Admin) {
      can(Actions.Manage, 'all');
    } else {
      can(Actions.Manage, 'all', { ownerId: user.id });
      cannot(Actions.Manage, User);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
