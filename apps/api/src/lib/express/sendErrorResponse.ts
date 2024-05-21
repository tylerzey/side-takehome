import { StatusCodes } from '@side/utils/src/http/httpsConstants';
import type { Response } from 'express';

/**
 * Sends a CORS response with an error status code and a response object
 */
export const sendErrorResponse = (
  res: Response,
  response: Record<string, unknown>,
  statusCode?: number
) => {
  return res.status(statusCode ?? StatusCodes.ServerError).send(JSON.stringify(response));
};
