import { Folder } from '../domain/folder.type';
import { FolderRepository } from '../infrastructure/folder.repository';

export const getAllFoldersUseCase = async (): Promise<Folder[]> => {
  return await FolderRepository.getAll();
};
