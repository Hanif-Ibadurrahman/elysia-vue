import { Folder } from '../domain/folder.type';
import { FolderRepository } from '../infrastructure/folder.repository';

export const updateFolderUseCase = async (
  id: number,
  name: string,
  folder_id?: number | null,
): Promise<Folder | null> => {
  const note = await FolderRepository.update(id, { name, folder_id });
  return note || null;
};
