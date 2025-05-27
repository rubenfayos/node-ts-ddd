import { Ticket } from "@modules/customer-service/domain/entity/ticket";
import type { ITicketWriteRepository } from "@modules/customer-service/domain/interface/repository";
import type { CreateTicketInput } from "@modules/customer-service/infraestructure/http/contract/ticket.contract";
import { TicketWriteRepository } from "@modules/customer-service/infraestructure/persistence/ticket/write";
import { File } from "@modules/file/domain/entity/file";
import type { IFileWriteRepository } from "@modules/file/domain/interface/repository";
import { FileWriteRepository } from "@modules/file/infraestructure/persistence/repository/write";
import { LocalStorageService } from "@modules/file/infraestructure/storage/local-storage.service";
import type { IUserReadRepository } from "@modules/user/domain/interface/repository";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import type { UseCaseInterface } from "@shared/application/usecase/usecase-interface";
import { inject, injectable } from "tsyringe";

type CreateTicketUseCaseInput = CreateTicketInput & {
  userId?: string;
  attachments?: Express.Multer.File[];
};

@injectable()
export class CreateTicketUseCase implements UseCaseInterface<CreateTicketUseCaseInput, void> {
  constructor(
    @inject(UserReadRepository)
    private userReadRepository: IUserReadRepository,

    @inject(TicketWriteRepository)
    private ticketWriteRepository: ITicketWriteRepository,

    @inject(LocalStorageService)
    private readonly storage: LocalStorageService,

    @inject(FileWriteRepository)
    private readonly fileWriteRepository: IFileWriteRepository,
  ) {}

  async execute(data: CreateTicketUseCaseInput): Promise<void> {
    if (data.userId) {
      const user = await this.userReadRepository.getByUserId(data.userId);

      if (!user) {
        throw new Error("user_not_found");
      }
    }

    const attachments: string[] = [];

    if (data.attachments) {
      for (const attachment of data.attachments) {
        const upload = await this.storage.upload(
          `customer-service/tickets/${attachment.originalname}`,
          attachment.buffer,
          false,
        );

        const fileInstance = File.create({
          path: upload.url,
          isPublic: false,
          filename: attachment.originalname,
          mimetype: attachment.mimetype,
          size: attachment.size,
          relativePath: upload.relativePath,
          userId: data.userId,
        });

        await this.fileWriteRepository.create(fileInstance);

        attachments.push(fileInstance.getId());
      }
    }

    const ticket = Ticket.create({
      ...data,
      attachments,
    });

    await this.ticketWriteRepository.create(ticket);
  }
}
