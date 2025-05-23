import type { File } from "@modules/file/domain/entity/file";

export interface IFileReadRepository {
  getById(id: string): Promise<File | null>;
  getByPath(path: string): Promise<File>;
}

export interface IFileWriteRepository {
  create(file: File): Promise<void>;
  update(file: File): Promise<File>;
  delete(file: File): Promise<void>;
}
