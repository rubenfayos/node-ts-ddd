import { File } from "@modules/file/domain/entity/file";
import type { IFileWriteRepository } from "@modules/file/domain/interface/repository";
import type { UploadFileResponse } from "@modules/file/infraestructure/http/contract/upload-file.contract";
import { FileWriteRepository } from "@modules/file/infraestructure/persistence/repository/write";
import { LocalStorageService } from "@modules/file/infraestructure/storage/local-storage.service";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { inject, injectable } from "tsyringe";

type UploadFileInput = {
  file: Express.Multer.File;
  isPublic: boolean;
  userId: string;
};

@injectable()
export class UploadFileUseCase implements UseCaseInterface<UploadFileInput, UploadFileResponse> {
  constructor(
    @inject(LocalStorageService)
    private readonly storage: LocalStorageService,

    @inject(FileWriteRepository)
    private readonly fileWriteRepository: IFileWriteRepository,
  ) {}

  async execute(data: UploadFileInput): Promise<UploadFileResponse> {
    const { file, isPublic, userId } = data;

    const upload = await this.storage.upload(
      `${userId}/${file.originalname}`,
      file.buffer,
      isPublic,
    );

    const fileInstance = File.create({
      path: upload.url,
      isPublic,
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      relativePath: upload.relativePath,
      userId,
    });

    await this.fileWriteRepository.create(fileInstance);

    return {
      id: fileInstance.getId(),
      path: fileInstance.getPath(),
    };
  }
}
