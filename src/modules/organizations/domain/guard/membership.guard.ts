// modules/organizations/domain/guard/membership.guard.ts
import { AccessGuard, type AuthenticatedUser } from "@shared/domain/authorization/access-guard";
import { singleton } from "tsyringe";

@singleton()
export class MembershipGuard extends AccessGuard<{ role: string; allowedRoles: string[] }> {
  canAccess(user: AuthenticatedUser, context: { role: string; allowedRoles: string[] }): boolean {
    return context.allowedRoles.includes(context.role);
  }
}
