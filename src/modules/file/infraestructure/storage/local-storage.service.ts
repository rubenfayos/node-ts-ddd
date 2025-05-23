// modules/file/infraestructure/storage/local-storage.service.ts
import fs from "node:fs/promises";
import path from "node:path";
import type { FileStorage } from "@modules/file/domain/services/file-storage";

export class LocalStorageService implements FileStorage {
    private basePath = path.resolve(__dirname, path.join("..", "..", "..", "..", ".."));

  async upload(p: string, content: Buffer, isPublic = false): Promise<{ url: string, relativePath: string }> {
    
    const relativePath = path.join(isPublic ? "public" : "uploads", p);
    const fullPath = path.join(this.basePath, relativePath);

    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content);
    return {
      url: fullPath,
      relativePath,
    };
  }

  async delete(p: string): Promise<void> {
    await fs.unlink(p).catch(() => undefined);
  }

  getUrl(p: string): string {
    return `/uploads/${p}`;
  }
}
