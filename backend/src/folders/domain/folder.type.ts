import { Static, t } from 'elysia';

export const FolderSchema = t.Object({
  id: t.Number(),
  name: t.String(),
  folder_id: t.Nullable(t.Number()),
  sub_folders: t.Optional(t.Array(t.String())),
  created_at: t.Date(),
  updated_at: t.Date(),
});

export type Folder = Static<typeof FolderSchema>;
