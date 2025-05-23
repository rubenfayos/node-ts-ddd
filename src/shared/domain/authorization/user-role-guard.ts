import { AccessGuard, type AuthenticatedUser } from "@shared/domain/authorization/access-guard";

export class GlobalRoleGuard extends AccessGuard {
  constructor(private readonly allowedRoles: string[]) {
    super();
  }

  canAccess(user: AuthenticatedUser): boolean {
    return this.allowedRoles.some((role) => user.roles.includes(role));
  }
}
