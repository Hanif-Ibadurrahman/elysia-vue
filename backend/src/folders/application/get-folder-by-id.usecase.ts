import { Folder } from '../domain/folder.type';
import { FolderRepository } from '../infrastructure/folder.repository';

export const getFolderByIdUseCase = async (
  id: number,
): Promise<Folder | null> => {
  const folder = await FolderRepository.getById(id);
  return folder || null;
};
