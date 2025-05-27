import { User } from "@modules/user/domain/entity/user";
import type { User as PrismaUser } from "@prisma/client";

export const UserMapper = {
  toDomain(raw: PrismaUser): User {
    return new User({
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      id: raw.id,
      email: raw.email,
      password: raw.password,
      name: raw.name,
      phone: raw.phone,
      verified: raw.verified,
      verifiedAt: raw.verified_at ?? undefined,
      verifyCode: raw.verify_code ?? undefined,
      roles: raw.roles,
    });
  },

  toPersistence(user: User): PrismaUser {
    return {
      id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
      name: user.getName() ?? null,
      phone: user.getPhone() ?? null,
      verified: user.getVerified(),
      verified_at: user.getVerifiedAt() ?? null,
      verify_code: user.getVerifyCode() ?? null,
      created_at: user.getCreatedAt() ?? new Date(),
      updated_at: user.getUpdatedAt() ?? new Date(),
      deleted_at: null,
      roles: user.getRoles(),
    };
  },

  toResponseDTO(user: User) {
    return {
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      phone: user.getPhone(),
      createdAt: user.getCreatedAt().toISOString(),
      updatedAt: user.getUpdatedAt().toISOString(),
      verified: user.getVerified(),
    };
  },
};
