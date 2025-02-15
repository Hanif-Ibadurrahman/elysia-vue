import sql from '../../shared/infrastructure/db';

export interface FolderRecord {
  id: number;
  name: string;
  folder_id: number | null;
  sub_folders: string[];
  created_at: Date;
  updated_at: Date;
}

export interface CreateFolderParms {
  name: string;
  folder_id?: number | null;
}

export interface UpdateFolderParms {
  name?: string;
  folder_id?: number | null;
}

export class FolderRepository {
  static async create(folder: CreateFolderParms): Promise<FolderRecord> {
    return sql.begin(async (transaction) => {
      const folderId = folder?.folder_id || null;
      const [newFolder] = await transaction<FolderRecord[]>`
        INSERT INTO folders (name, folder_id)
        VALUES (${folder.name}, ${folderId})
        RETURNING *
      `;

      return newFolder;
    });
  }

  static async getAll(): Promise<FolderRecord[]> {
    return sql.begin(async (transaction) => {
      const folders = await transaction<FolderRecord[]>`
        SELECT f.*, array_remove(array_agg(sf.*), NULL) as sub_folders
        FROM folders f
        LEFT JOIN folders sf ON f.id = sf.folder_id
        WHERE f.folder_id IS NULL
        GROUP BY f.id
        ORDER BY f.created_at DESC
      `;

      return folders;
    });
  }

  static async getById(id: number): Promise<FolderRecord | undefined> {
    const [folder] = await sql<FolderRecord[]>`
      SELECT f.*, array_remove(array_agg(sf.*), NULL) as sub_folders
      FROM folders f
      LEFT JOIN folders sf ON f.id = sf.folder_id
      WHERE f.id = ${id}
      GROUP BY f.id
    `;
    return folder;
  }

  static async update(
    id: number,
    folder: UpdateFolderParms,
  ): Promise<FolderRecord | undefined> {
    return sql.begin(async (transaction) => {
      const [updatedFolder] = await transaction<FolderRecord[]>`
        UPDATE folders
        SET 
          name = COALESCE(${folder.name!}, name), 
          folder_id = COALESCE(${folder.folder_id!}, folder_id), 
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
      `;

      if (!updatedFolder) {
        return undefined;
      }

      return updatedFolder;
    });
  }

  static async delete(id: number): Promise<FolderRecord | undefined> {
    const [deletedFolder] = await sql<FolderRecord[]>`
      DELETE FROM folders
      WHERE id = ${id}
      RETURNING *
    `;
    return deletedFolder;
  }
}
