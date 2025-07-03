import { ForbiddenError } from "@shared/infrastructure/error";

export type AuthenticatedUser = {
  id: string;
  roles: string[];
};

export abstract class AccessGuard<TContext = any> {
  abstract canAccess(user: AuthenticatedUser, context: TContext): boolean | Promise<boolean>;

  async check(user: AuthenticatedUser, context: TContext): Promise<void> {
    const allowed = await this.canAccess(user, context);
    if (!allowed) {
      throw new ForbiddenError("Access denied");
    }
  }
}
