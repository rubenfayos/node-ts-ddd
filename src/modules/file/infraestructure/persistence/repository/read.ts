import type { File } from "@modules/file/domain/entity/file";
import type { IFileReadRepository } from "@modules/file/domain/interface/repository";
import {PrismaService} from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import {FileMapper} from "../mapper/file-mapper";

@singleton()
export class FileReadRepository implements IFileReadRepository {

  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async getById(id: string): Promise<File | null> {
    
    const prismaFile = await this.db.client.file.findUnique({
      where: { id: id },
    });

    return prismaFile ? FileMapper.toDomain(prismaFile) : null;

  }
  getByPath(path: string): Promise<File> {
    throw new Error("Method not implemented.");
  }
}
