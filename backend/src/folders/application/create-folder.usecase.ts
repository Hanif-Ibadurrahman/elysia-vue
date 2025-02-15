import { Folder } from '../domain/folder.type';
import { FolderRepository } from '../infrastructure/folder.repository';

export const createFolderUseCase = async (
  name: string,
  folder_id?: number | null,
): Promise<Folder> => {
  return await FolderRepository.create({ name, folder_id });
};
