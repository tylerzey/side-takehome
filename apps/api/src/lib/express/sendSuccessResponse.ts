import { StatusCodes } from '@side/utils/src/http/httpsConstants';
import type { Response } from 'express';

/**
 * Sends a CORS response with a success status code and a response object
 */
export const sendSuccessResponse = (res: Response, response: Record<any, any>) => {
  return res.status(StatusCodes.Success).send(JSON.stringify(response));
};
