import Elysia, { t } from 'elysia';

import { createFolderUseCase } from '../application/create-folder.usecase';
import { deleteFolderUsecase } from '../application/delete-folder.usecase';
import { getAllFoldersUseCase } from '../application/get-all-folders.usecase';
import { updateFolderUseCase } from '../application/update-folder.usecase';
import { FolderSchema } from '../domain/folder.type';
import { getFolderByIdUseCase } from '../application/get-folder-by-id.usecase';

export const FolderController = new Elysia()
  .get(
    'folders',
    async ({ set }) => {
      try {
        const folders = await getAllFoldersUseCase();
        return { status: 'success', data: folders };
      } catch (e) {
        console.error(e);
        set.status = 500;
        return { status: 'error', message: 'Internal Server Error' };
      }
    },
    {
      response: {
        200: t.Object({
          status: t.String(),
          data: t.Array(FolderSchema),
        }),
        500: t.Object({
          status: t.String(),
          message: t.String(),
        }),
      },
      detail: {
        tags: ['Folders'],
        summary: 'Get all folders',
        description: 'Retrieve a list of all folders',
      },
    },
  )
  .get(
    'folders/:id',
    async ({ params: { id }, set }) => {
      try {
        const folder = await getFolderByIdUseCase(Number(id));
        if (!folder) {
          set.status = 404;
          return { status: 'error', message: 'Folder not found' };
        }
        return { status: 'success', data: folder };
      } catch (e) {
        console.error(e);
        set.status = 500;
        return { status: 'error', message: 'Internal Server Error' };
      }
    },
    {
      response: {
        200: t.Object({
          status: t.String(),
          data: FolderSchema,
        }),
        404: t.Object({
          status: t.String(),
          message: t.String(),
        }),
        500: t.Object({
          status: t.String(),
          message: t.String(),
        }),
      },
      detail: {
        tags: ['Folders'],
        summary: 'Get a folder by ID',
        description: 'Retrieve a specific folder by its ID',
      },
    },
  )
  .post(
    'folders',
    async ({ body, set }) => {
      try {
        const folder = await createFolderUseCase(body.name, body.folder_id);
        set.status = 201;
        return { status: 'success', data: folder };
      } catch (e) {
        console.error(e);
        set.status = 500;
        return { status: 'error', message: 'Internal Server Error' };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        folder_id: t.Optional(t.Nullable(t.Number())),
      }),
      response: {
        201: t.Object({
          status: t.String(),
          data: FolderSchema,
        }),
        500: t.Object({
          status: t.String(),
          message: t.String(),
        }),
      },
      detail: {
        tags: ['Folders'],
        summary: 'Create a new folder',
        description: 'Create a new folder with the provided title and content',
      },
    },
  )
  .put(
    'folders/:id',
    async ({ params: { id }, body, set }) => {
      try {
        const folder = await updateFolderUseCase(
          Number(id),
          body.name,
          body.folder_id,
        );
        if (!folder) {
          set.status = 404;
          return { status: 'error', message: 'Folder not found' };
        }
        return { status: 'success', data: folder };
      } catch (e) {
        console.error(e);
        set.status = 500;
        return { status: 'error', message: 'Internal Server Error' };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        folder_id: t.Optional(t.Nullable(t.Number())),
      }),
      response: {
        200: t.Object({
          status: t.String(),
          data: FolderSchema,
        }),
        404: t.Object({
          status: t.String(),
          message: t.String(),
        }),
        500: t.Object({
          status: t.String(),
          message: t.String(),
        }),
      },
      detail: {
        tags: ['Folders'],
        summary: 'Update a folder',
        description: 'Update an existing folder with new title and content',
      },
    },
  )
  .delete(
    'folders/:id',
    async ({ params: { id }, set }) => {
      try {
        const deleted = await deleteFolderUsecase(Number(id));
        if (!deleted) {
          set.status = 404;
          return { status: 'error', message: 'Folder not found' };
        }
        return { status: 'success', message: 'Folder deleted successfully' };
      } catch (e) {
        console.error(e);
        set.status = 500;
        return { status: 'error', message: 'Internal Server Error' };
      }
    },
    {
      response: {
        200: t.Object({
          status: t.String(),
          message: t.String(),
        }),
        404: t.Object({
          status: t.String(),
          message: t.String(),
        }),
        500: t.Object({
          status: t.String(),
          message: t.String(),
        }),
      },
      detail: {
        tags: ['Folders'],
        summary: 'Delete a folder',
        description: 'Delete a specific folder by its ID',
      },
    },
  );
