import type { File } from "@modules/file/domain/entity/file";
import type { IFileWriteRepository } from "@modules/file/domain/interface/repository";
import {PrismaService} from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import {FileMapper} from "@modules/file/infraestructure/persistence/mapper/file-mapper";

@singleton()
export class FileWriteRepository implements IFileWriteRepository {

  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}


  async create(file: File): Promise<void> {

    const prismaFile = FileMapper.toPersistence(file);

    await this.db.client.file.create({
      data: prismaFile,
    });
  }

  async update(file: File): Promise<File> {
    throw new Error("Method not implemented.");
  }

  async delete(file: File): Promise<void> {
    
    await this.db.client.file.delete({
      where: { id: file.getId() },
    });

  }

}
