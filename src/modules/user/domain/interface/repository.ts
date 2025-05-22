import type { User } from "@modules/user/domain/entity/user";
import type { Result } from "types-ddd";

export interface IUserReadRepository {
  getAll(): Promise<User[]>;
  getByUserId(userId: string): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByEmailOrThrow(email: string): Promise<User>;
  getUserByVerifyCode(code: string): Promise<User | null>;
}

export interface IUserCreateRepository {
  create(user: User): Promise<Result<User>>;
}

export interface IUserWriteRepository extends IUserCreateRepository {}
