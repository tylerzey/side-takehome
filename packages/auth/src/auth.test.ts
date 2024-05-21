import { defineAbilityFor } from './index';
import { describe, it, expect } from 'vitest';
import { uuid } from '@side/utils/src/lang/uuid';

describe('defineAbilityFor', () => {
  const _id = uuid();

  it('should allow reading listings', () => {
    const user = { email: 'test@example.com' };

    const ability = defineAbilityFor(user);

    expect(ability.can('read', { kind: 'listing' })).toBe(true);
  });

  it('should allow reading favorite with matching email', () => {
    const user = { email: 'test@example.com' };
    const favorite = { _id, kind: 'favorite', userEmail: user.email } as const;
    const ability = defineAbilityFor(user);

    expect(ability.can('read', favorite)).toBe(true);
  });

  it('should handle invalid resource gracefully', () => {
    const user = { email: 'test@example.com' };
    const ability = defineAbilityFor(user);

    expect(ability.can('read', {} as any)).toBe(false);
  });

  it('should not allow reading user with case mismatch in email', () => {
    const user = { email: 'TEST@example.com' };
    const ability = defineAbilityFor(user);

    expect(ability.can('read', { kind: 'user', email: 'test@example.com' })).toBe(false);
  });

  it('should allow creating favorite with matching email', () => {
    const user = { email: 'test@example.com' };
    const favorite = { _id, kind: 'favorite', userEmail: user.email } as const;
    const ability = defineAbilityFor(user);

    expect(ability.can('create', favorite)).toBe(true);
    expect(ability.can('delete', favorite)).toBe(true);
  });

  it('should allow reading user with matching email', () => {
    const user = { kind: 'user', email: 'test@example.com' } as const;
    const ability = defineAbilityFor(user);

    expect(ability.can('read', user)).toBe(true);
  });

  it('should allow reading favorite with non-matching email', () => {
    const user = { email: 'test@example.com' };
    const ability = defineAbilityFor(user);

    expect(ability.can('read', { kind: 'favorite', userEmail: 'other@example.com' })).toBe(true);
  });

  it('should not allow creating or deleting favorite with non-matching email', () => {
    const user = { _id, email: 'test@example.com' };
    const ability = defineAbilityFor(user);

    expect(ability.can('create', { kind: 'favorite', userEmail: 'other@example.com' })).toBe(false);
    expect(ability.can('delete', { kind: 'favorite', userEmail: 'other@example.com' })).toBe(false);
  });

  it('should not allow reading user with non-matching email', () => {
    const user = { email: 'test@example.com' };
    const ability = defineAbilityFor(user);

    expect(ability.can('read', { kind: 'user', email: 'other@example.com' })).toBe(false);
  });
});
