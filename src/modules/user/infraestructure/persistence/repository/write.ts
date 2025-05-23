import type { User } from "@modules/user/domain/entity/user";
import type { IUserWriteRepository } from "@modules/user/domain/interface/repository";
import { PrismaService } from "@shared/infraestructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { UserMapper } from "../mapper/user-mapper";

@singleton()
export class UserWriteRepository implements IUserWriteRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async create(user: User): Promise<User> {
    const prismaUser = UserMapper.toPersistence(user);

    const createdUser = await this.db.client.user.create({
      data: prismaUser,
    });

    return UserMapper.toDomain(createdUser);
  }

  async update(user: User): Promise<User> {
    const prismaUser = UserMapper.toPersistence(user);

    const updatedUser = await this.db.client.user.update({
      where: { id: user.getId() },
      data: prismaUser,
    });

    return UserMapper.toDomain(updatedUser);
  }
}
