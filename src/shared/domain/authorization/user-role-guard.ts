import { AccessGuard, type AuthenticatedUser } from "@shared/domain/authorization/access-guard";
import { singleton } from "tsyringe";

@singleton()
export class GlobalRoleGuard extends AccessGuard {
  canAccess(user: AuthenticatedUser, allowedRoles: string[]): boolean {
    return allowedRoles.some((role) => user.roles.includes(role));
  }
}
