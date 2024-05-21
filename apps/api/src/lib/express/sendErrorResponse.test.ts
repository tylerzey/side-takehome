import { StatusCodes } from '@side/utils/src/http/httpsConstants';
import { sendErrorResponse } from './sendErrorResponse';
import { describe, test, vi, expect } from 'vitest';
import { fromPartial } from '@total-typescript/shoehorn';

describe('sendErrorResponse', () => {
  test('should send a CORS response with the provided status code and response object', () => {
    const response = { error: 'Something went wrong' };
    const statusCode = StatusCodes.ServerError;
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    sendErrorResponse(fromPartial(res), response, statusCode);

    expect(res.status).toHaveBeenCalledWith(statusCode);
    expect(res.send).toHaveBeenCalledWith(JSON.stringify(response));
  });

  test('should send a CORS response with the default status code and response object', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    const response = { error: 'Something went wrong' };

    sendErrorResponse(fromPartial(res), response);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.ServerError);
    expect(res.send).toHaveBeenCalledWith(JSON.stringify(response));
  });
});
