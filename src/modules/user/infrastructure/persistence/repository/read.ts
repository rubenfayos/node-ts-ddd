import type { User } from "@modules/user/domain/entity/user";
import type { IUserReadRepository } from "@modules/user/domain/interface/repository";
import { PrismaService } from "@shared/infrastructure/persistence/prisma/prisma-service";
import { inject, singleton } from "tsyringe";
import { UserMapper } from "../mapper/user-mapper";

@singleton()
export class UserReadRepository implements IUserReadRepository {
  constructor(
    @inject(PrismaService)
    private readonly db: PrismaService,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.db.client.user.findMany();
    return users.map(UserMapper.toDomain);
  }

  async getByUserId(userUuid: string): Promise<User> {
    const user = await this.db.client.user.findUnique({
      where: { id: userUuid },
    });

    if (!user) throw new Error("User not found");

    return UserMapper.toDomain(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.db.client.user.findUnique({
      where: { email },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async getUserByEmailOrThrow(email: string): Promise<User> {
    const user = await this.db.client.user.findUnique({
      where: { email: email },
    });

    if (!user) throw new Error("User not found");

    return UserMapper.toDomain(user);
  }

  async getUserByVerifyCode(code: string): Promise<User | null> {
    const user = await this.db.client.user.findFirst({
      where: { verify_code: code },
    });

    return user ? UserMapper.toDomain(user) : null;
  }
}
