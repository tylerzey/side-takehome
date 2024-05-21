import { StatusCodes } from '@side/utils/src/http/httpsConstants';
import { sendSuccessResponse } from './sendSuccessResponse';
import { describe, test, vi, expect } from 'vitest';
import { fromPartial } from '@total-typescript/shoehorn';

describe('sendSuccessResponse', () => {
  test('should send a success response with the provided response object', () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    const response = { message: 'Success' };

    sendSuccessResponse(fromPartial(res), response);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.Success);
    expect(res.send).toHaveBeenCalledWith(JSON.stringify(response));
  });
});
