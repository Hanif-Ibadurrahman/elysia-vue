import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';

import { FolderController } from '../src/folders/infrastructure/folder.controller';
import { FolderRepository } from '../src/folders/infrastructure/folder.repository';

describe('Folder Routes', () => {
  let app: Elysia;

  beforeAll(async () => {
    app = new Elysia().use(FolderController);
  });

  it('should create a new folder', async () => {
    const dataInput = {
      name: 'Test Folder',
      folder_id: null,
    };

    const response = await app.handle(
      new Request('http://localhost/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: dataInput.name,
          folder_id: dataInput.folder_id,
        }),
      }),
    );

    expect(response.status).toBe(201);
    const folder = await response.json();
    expect(folder.data.name).toBe(dataInput.name);
    expect(folder.data.folder_id).toBeNull();
  });

  it('should create a new folder with folder_id not null', async () => {
    const dataInput = {
      name: 'Another Test Folder',
      folder_id: 1,
    };

    const response = await app.handle(
      new Request('http://localhost/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: dataInput.name,
          folder_id: dataInput.folder_id,
        }),
      }),
    );

    expect(response.status).toBe(201);
    const folder = await response.json();
    expect(folder.data.name).toBe(dataInput.name);
    expect(folder.data.folder_id).toBe(dataInput.folder_id);
  });

  it('should get a folder by id', async () => {
    const createResponse = await app.handle(
      new Request('http://localhost/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Another Test Folder For Get By Id',
        }),
      }),
    );
    const createdFolder = await createResponse.json();

    const response = await app.handle(
      new Request(`http://localhost/folders/${createdFolder.data.id}`),
    );

    expect(response.status).toBe(200);
    const folder = await response.json();
    expect(folder.data.name).toBe('Another Test Folder For Get By Id');
    expect(folder.data.folder_id).toBeNull();
  });

  it('should get all folders', async () => {
    const response = await app.handle(new Request('http://localhost/folders'));

    expect(response.status).toBe(200);
    const folders = await response.json();
    expect(Array.isArray(folders.data)).toBe(true);
  });

  afterAll(async () => {
    // Clean up: Delete test user and their folders
    await FolderRepository.delete(1);
    await FolderRepository.delete(2);
    await FolderRepository.delete(3);
  });
});
