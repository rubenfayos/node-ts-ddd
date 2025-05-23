import type {
  IFileReadRepository,
  IFileWriteRepository,
} from "@modules/file/domain/interface/repository";
import type { GetFileInput } from "@modules/file/infraestructure/http/contract/get-file.contract";
import { FileReadRepository } from "@modules/file/infraestructure/persistence/repository/read";
import { FileWriteRepository } from "@modules/file/infraestructure/persistence/repository/write";
import { LocalStorageService } from "@modules/file/infraestructure/storage/local-storage.service";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteFileUseCase implements UseCaseInterface<GetFileInput, void> {
  constructor(
    @inject(FileReadRepository)
    private readonly fileReadRepository: IFileReadRepository,

    @inject(FileWriteRepository)
    private readonly fileWriteRepository: IFileWriteRepository,

    @inject(LocalStorageService)
    private readonly storage: LocalStorageService,
  ) {}

  async execute({fileId, userId}: GetFileInput): Promise<void> {

    const file = await this.fileReadRepository.getById(fileId);

    if (!file) throw new Error("File not found");

    if (file.getUserId() !== userId) throw new Error("Forbidden");

    await this.fileWriteRepository.delete(file);

    await this.storage.delete(file.getPath());
  }
}
