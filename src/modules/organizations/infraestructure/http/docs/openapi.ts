import { registry } from "@shared/infrastructure/http/docs/openapi-registry";
import { createOrganizationSchema } from "../contract/organization/create-organization.contract";
import { createOrganizationMembershipSchema } from "../contract/organization-membership/create-organization-membership.contract";
import { z } from "zod";
import { deleteOrganizationMembershipSchema } from "../contract/organization-membership/delete-organization-membership.contract";

registry.registerPath({
  method: "post",
  path: "/v1/organizations",
  summary: "Create an organization",
  tags: ["Organizations"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createOrganizationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Organization created",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/v1/organizations/{organizationId}/memberships",
  summary: "Create an organization membership",
  tags: ["Organizations"],
  request: {
    params: z.object({
      organizationId: z.string(),
    }),
    body: {
      content: {
        "application/json": {
          schema: createOrganizationMembershipSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Organization membership created",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/v1/organizations/{organizationId}/memberships",
  summary: "Get organization memberships",
  tags: ["Organizations"],
  request: {
    params: z.object({
      organizationId: z.string(),
    }),
    query: z.object({
      role: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Organization memberships",
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/v1/organizations/{organizationId}/memberships/{membershipId}",
  summary: "Delete an organization membership",
  tags: ["Organizations"],
  request: {
    params: deleteOrganizationMembershipSchema,
  },
  responses: {
    204: {
      description: "Organization membership deleted",
    },
  },
});
