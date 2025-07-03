import { definePolicy } from "@shared/domain/authorization/ability-checker";
import type { Organization } from "../domain/entity/organization";

definePolicy<Organization>("update", (user, organization) => {
  return user
    .getMemberships()
    .some((m) => m.getOrganizationId() === organization.getId() && m.getRole() === "owner");
});

definePolicy<Organization>("view", (user, organization) => {
  return user.getMemberships().some((m) => m.getOrganizationId() === organization.getId());
});
