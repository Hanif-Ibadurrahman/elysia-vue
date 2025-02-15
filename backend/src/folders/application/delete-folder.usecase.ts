import { FolderRepository } from '../infrastructure/folder.repository';

export const deleteFolderUsecase = async (id: number): Promise<boolean> => {
  const deleted = await FolderRepository.delete(id);

  return deleted ? true : false;
};
