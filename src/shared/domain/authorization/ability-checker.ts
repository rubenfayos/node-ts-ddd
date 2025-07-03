// shared/domain/authorization/ability-checker.ts
import type { User } from "@modules/user/domain/entity/user";

type PolicyFunction = (user: User, resource: any) => boolean;

const policies: Record<string, PolicyFunction> = {};

export function definePolicy<T>(action: string, handler: (user: User, resource: T) => boolean) {
  policies[action] = handler as PolicyFunction;
}

export function can(user: User) {
  return {
    view: (resource: any) => check("view", user, resource),
    update: (resource: any) => check("update", user, resource),
    delete: (resource: any) => check("delete", user, resource),
    create: (resource: any) => check("create", user, resource),
  };
}

function check(action: string, user: User, resource: any): boolean {
  const policy = policies[action];
  if (!policy) throw new Error(`Policy "${action}" not defined`);
  return policy(user, resource);
}
