// ability.factory.ts

import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder } from '@casl/ability';
import { UserDocument } from '../users/user.schema';

@Injectable()
export class AbilityFactory {
  createForUser(user: UserDocument) {
    const { can, build } = new AbilityBuilder(Ability);

    if (user.role === 'TEACHER') {
      can('read', 'teacher');
      can('update', 'teacher', { id: user.id });
      can('read', 'school');
    }

    if (user.role === 'PO_MANAGER') {
      can('read', 'teacher');
      can('read', 'school');
      can('update', 'school');
    }

    if (user.role === 'TEACHER_ASSISTANT') {
      can('read', 'teacher', { id: user.id });
      can('update', 'teacher', { id: user.id });
    }
    return build();
  }
}
