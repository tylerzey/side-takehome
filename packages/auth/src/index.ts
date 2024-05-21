import type { MongoAbility } from '@casl/ability';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';

import type { Permissions } from './types';

type Favorite = 'favorite' | { userEmail: string; kind: 'favorite' };
type User = 'user' | { email: string; kind: 'user' };
type Listing = 'listing' | { kind: 'listing' };

type AppAbilities =
  | Permissions<['read'], User>
  | Permissions<['read', 'create', 'delete'], Favorite>
  | Permissions<['read'], Listing>;

export type AppAbility = MongoAbility<AppAbilities>;

export const defineAbilityFor = (user: { email: string }) => {
  const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

  builder.can('read', 'favorite', undefined);
  builder.can('read', 'listing', undefined);
  builder.can('create', 'favorite', undefined, { userEmail: { $eq: user.email } });
  builder.can('delete', 'favorite', undefined, { userEmail: { $eq: user.email } });
  builder.can('read', 'user', undefined, { email: { $eq: user.email } });

  return builder.build({
    anyAction: 'any',
    detectSubjectType: (o) => {
      if (!o || typeof o === 'string') {
        return o;
      }

      return o.kind;
    },
  });
};
