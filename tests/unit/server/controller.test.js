import { jest, expect, describe, test, beforeEach } from '@jest/globals';
import config from '../../../server/config.js';
import { Controller } from '../../../server/controller.js';
import { Service } from '../../../server/service';
import TestUtil from '../_util/testUtil.js';

const {
  pages,
} = config


describe('#Controller - receive file stream', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should be able get the file stream', async () => {
    const mockFileStream = TestUtil.generateReadableStream(['data']);
    const controller = new Controller();
    jest.spyOn(
      Service.prototype,
      Service.prototype.getFileStream.name,
    ).mockResolvedValue({
      stream: mockFileStream,
    });

    const { stream } = await controller.getFileStream(pages.homeHTML);

    expect(Service.prototype.getFileStream).toBeCalledWith(pages.homeHTML);
    expect(stream).toEqual(mockFileStream);
  });
});