export interface FileStorage {
  upload(path: string, content: Buffer, isPublic?: boolean): Promise<{ url: string }>;

  delete(path: string): Promise<void>;

  getUrl(path: string): string;
}
