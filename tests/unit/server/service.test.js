import { jest, expect, describe, test, beforeEach } from '@jest/globals';
import config from '../../../server/config.js';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { Service } from '../../../server/service';
import TestUtil from '../_util/testUtil.js';

const {
  dir: {
    publicDirectory
  }
} = config


describe('#Controller - receive file stream', () => {
  const service = new Service();

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('getFileInfo - should be able execute getFileInfo', async () => {
   const filename = '/index.html';
   const mockReadableStream = TestUtil.generateReadableStream(['data']);
   const expectedType = '.html';
   const expectedFullFilePath = publicDirectory + filename;

    jest
    .spyOn(fsPromises, fsPromises.access.name)
    .mockResolvedValue();

   jest
   .spyOn(Service.prototype, Service.prototype.createFileStream.name)
   .mockReturnValue(mockReadableStream);

   const result = await service.getFileStream(filename);

   expect(Service.prototype.createFileStream).toHaveBeenCalledWith(expectedFullFilePath);
   expect(result).toEqual({
     stream: mockReadableStream,
     type: expectedType,
   });
  });

  test('createFileStream - should create a file stream and return it', async () => {
    const file ='/index.html';
    const mockFileStream = TestUtil.generateReadableStream(['data']);

    const createReadStream = jest
    .spyOn(fs, fs.createReadStream.name)
    .mockReturnValue(mockFileStream);

    const serviceReturn = service.createFileStream(file);

    expect(createReadStream).toBeCalledWith(file);
    expect(serviceReturn).toStrictEqual(mockFileStream);
  })
});