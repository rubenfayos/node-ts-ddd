import type { IFileReadRepository } from "@modules/file/domain/interface/repository";
import type { GetFileInput } from "@modules/file/infraestructure/http/contract/get-file.contract";
import { FileReadRepository } from "@modules/file/infraestructure/persistence/repository/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import path from "node:path";
import { inject, injectable } from "tsyringe";

type GetFileResponse = {
  path: string;
  filename: string;
};

@injectable()
export class GetFileUseCase implements UseCaseInterface<GetFileInput, GetFileResponse> {
  constructor(
    @inject(FileReadRepository)
    private readonly fileReadRepository: IFileReadRepository,
  ) {}

  async execute({ fileId, userId }: GetFileInput): Promise<GetFileResponse> {
    const file = await this.fileReadRepository.getById(fileId);

    if (!file) throw new Error("File not found");

    if (file.getUserId() !== userId) throw new Error("Forbidden");

    return { path: file.getPath(), filename: file.getFilename() };
  }
}
