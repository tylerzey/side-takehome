import { AsyncAuthorizer } from 'express-basic-auth';
import { z } from 'zod';
import { mongoModels } from './mongoModels';

/**
 * Validate that the strings are an email and a uuid. This helps unsure we aren't passing
 * unsanitized data to the database.
 */
const authValidator = z.object({
  email: z.string().email(),
  token: z.string().uuid(),
});
/**
 * Authorizes a user to access the API by looking up the user in the database.
 */
export const userAuthorizer: AsyncAuthorizer = async (username, password, cb) => {
  try {
    console.log('user authorizer starting');
    const { email, token } = authValidator.parse({ email: username, token: password });
    console.log('user authorizer parsed: ', email);
    const user = await mongoModels.userModel.findOne({ email, token });
    console.log('user authorizer found user: ', user);
    return cb(null, !!user);
  } catch (err) {
    return cb(null, false);
  }
};
