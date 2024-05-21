import type { Middleware } from './types';

/**
 * Logs the arguments of a GraphQL operation.
 */
export const loggerMiddleware: Middleware = async (resolve, root, args, context, info) => {
  try {
    if (info.operation.name?.value === info.fieldName) {
      console.log(`${info.fieldName} resolving with: ${JSON.stringify(args)}`);

      context && console.log('user: ', JSON.stringify(context.user.email));
    }
  } catch (err) {
    console.error('Error in loggerMiddleware', err);
  }
  return await resolve(root, args, context, info);
};
