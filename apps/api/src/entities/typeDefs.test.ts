import { Kind } from 'graphql/language';
import { GraphQLPhoneNumber, GraphQLEmailAddress } from 'graphql-scalars';
import { describe, expect, test } from 'vitest';

describe('PhoneNumber', () => {
  describe('valid', () => {
    test('serialize', () => {
      expect(GraphQLPhoneNumber.serialize('+16075551234')).toBe('+16075551234');
    });

    test('parseValue', () => {
      expect(GraphQLPhoneNumber.parseValue('+16075551234')).toBe('+16075551234');
    });

    test('parseLiteral', () => {
      expect(
        GraphQLPhoneNumber.parseLiteral({ kind: Kind.STRING, value: '+16075551234' }, {})
      ).toBe('+16075551234');
    });
  });

  describe('invalid', () => {
    describe('not a phone number', () => {
      test('serialize', () => {
        expect(() => GraphQLPhoneNumber.serialize('this is not a phone number')).toThrow(
          /^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/
        );
      });

      test('parseValue', () => {
        expect(() => GraphQLPhoneNumber.parseValue('this is not a phone number')).toThrow(
          /^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          GraphQLPhoneNumber.parseLiteral(
            { kind: Kind.STRING, value: 'this is not a phone number' },
            {}
          )
        ).toThrow(/^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/);
      });
    });

    describe('not a string', () => {
      test('serialize', () => {
        expect(() => GraphQLPhoneNumber.serialize(123)).toThrow(/Value is not string/);
      });

      test('parseValue', () => {
        expect(() => GraphQLPhoneNumber.parseValue(123)).toThrow(/Value is not string/);
      });

      test('parseLiteral', () => {
        expect(() => GraphQLPhoneNumber.parseLiteral({ kind: Kind.INT, value: '123' }, {})).toThrow(
          /Can only validate strings as phone numbers but got a/
        );
      });
    });

    describe('too long', () => {
      test('serialize', () => {
        expect(() => GraphQLPhoneNumber.serialize('+1789555123456789')).toThrow(
          /^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/
        );
      });

      test('parseValue', () => {
        expect(() => GraphQLPhoneNumber.parseValue('+1789555123456789')).toThrow(
          /^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          GraphQLPhoneNumber.parseLiteral({ kind: Kind.STRING, value: '+1789555123456789' }, {})
        ).toThrow(/^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/);
      });
    });

    describe('too small', () => {
      test('serialize', () => {
        expect(() => GraphQLPhoneNumber.serialize('+123')).toThrow(
          /^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/
        );
      });

      test('parseValue', () => {
        expect(() => GraphQLPhoneNumber.parseValue('+123')).toThrow(
          /^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          GraphQLPhoneNumber.parseLiteral({ kind: Kind.STRING, value: '+123' }, {})
        ).toThrow(/^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/);
      });
    });

    describe('no plus sign', () => {
      test('serialize', () => {
        expect(() => GraphQLPhoneNumber.serialize('17895551234')).toThrow(
          /^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/
        );
      });

      test('parseValue', () => {
        expect(() => GraphQLPhoneNumber.parseValue('17895551234')).toThrow(
          /^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          GraphQLPhoneNumber.parseLiteral({ kind: Kind.STRING, value: '17895551234' }, {})
        ).toThrow(/^Value is not a valid phone number of the form \+17895551234 \(7-15 digits\)/);
      });
    });
    describe('support more countries', () => {
      test('support Singapore numbers - 10 digits', () => {
        expect(() => {
          GraphQLPhoneNumber.parseValue('+6569701665');
        }).not.toThrow();
      });
      test('support Solomon Islands numbers - 8 digits', () => {
        expect(() => {
          GraphQLPhoneNumber.parseValue('+67734700');
        }).not.toThrow();
      });
      test('support Niue numbers - 7 digits', () => {
        expect(() => {
          GraphQLPhoneNumber.parseValue('+6834999');
        }).not.toThrow();
      });
    });
  });
});

describe('EmailAddress', () => {
  describe('valid', () => {
    test('serialize', () => {
      expect(GraphQLEmailAddress.serialize('test@test.com')).toBe('test@test.com');
    });

    test('parseValue', () => {
      expect(GraphQLEmailAddress.parseValue('test@test.com')).toBe('test@test.com');
    });

    test('parseValue', () => {
      expect(GraphQLEmailAddress.parseValue('test@test')).toBe('test@test');
      expect(GraphQLEmailAddress.parseValue('test@test')).toBe('test@test');
    });

    test('parseLiteral', () => {
      expect(
        GraphQLEmailAddress.parseLiteral(
          {
            kind: Kind.STRING,
            value: 'test@test.com',
          },
          {}
        )
      ).toBe('test@test.com');
    });

    test('parseLiteral', () => {
      expect(
        GraphQLEmailAddress.parseLiteral(
          {
            kind: Kind.STRING,
            value: 'test@test',
          },
          {}
        )
      ).toBe('test@test');
    });
  });

  describe('invalid', () => {
    describe('not an email address', () => {
      test('serialize', () => {
        expect(() => GraphQLEmailAddress.serialize('this is not an email address')).toThrow(
          /Value is not a valid email address/
        );
      });

      test('parseValue', () => {
        expect(() => GraphQLEmailAddress.parseValue('this is not an email address')).toThrow(
          /Value is not a valid email address/
        );
      });

      test('parseLiteral', () => {
        expect(() =>
          GraphQLEmailAddress.parseLiteral(
            {
              kind: Kind.STRING,
              value: 'this is not an email address',
            },
            {}
          )
        ).toThrow(/Value is not a valid email address/);
      });
    });

    describe('not a string', () => {
      test('serialize', () => {
        expect(() => GraphQLEmailAddress.serialize(123)).toThrow(/Value is not string/);
      });

      test('parseValue', () => {
        expect(() => GraphQLEmailAddress.parseValue(123)).toThrow(/Value is not string/);
      });

      test('parseLiteral', () => {
        expect(() =>
          GraphQLEmailAddress.parseLiteral({ kind: Kind.INT, value: '123' }, {})
        ).toThrow(/Can only validate strings as email addresses but got a/);
      });
    });
  });
});
