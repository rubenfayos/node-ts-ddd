import { File } from "@modules/file/domain/entity/file";
import type { Prisma, File as PrismaFile } from "@prisma/client";

export const FileMapper = {
  toPersistence(file: File): Prisma.FileCreateInput {
    return {
      path: file.getPath(),
      filename: file.getFilename(),
      mimetype: file.getMimetype(),
      size: file.getSize(),
      is_public: file.getIsPublic(),
      user: file.getUserId() ? { connect: { id: file.getUserId() } } : undefined,
      id: file.getId(),
      relative_path: file.getRelativePath(),
    };
  },

  toDomain(raw: PrismaFile): File {
    return new File({
      id: raw.id,
      path: raw.path,
      filename: raw.filename,
      mimetype: raw.mimetype,
      size: raw.size,
      isPublic: raw.is_public,
      userId: raw.user_id ?? undefined,
      relativePath: raw.relative_path,
    });
  },
};
