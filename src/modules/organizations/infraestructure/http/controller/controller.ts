import { CreateOrganizationUseCase } from "@modules/organizations/application/usecase/create-organization-usecase";
import { BaseController } from "@shared/infrastructure/http/utils/base-controller";
import { type NextFunction, type Request, type Response, Router } from "express";
import { inject, injectable } from "tsyringe";
import type { CreateOrganizationInput } from "../contract/organization/create-organization.contract";
import type { CreateOrganizationMembershipInput } from "../contract/organization-membership/create-organization-membership.contract";
import { CreateOrganizationMembershipUseCase } from "@modules/organizations/application/usecase/create-organization-membership-usecase";
import { GetOrganizationMembershipsUseCase } from "@modules/organizations/application/usecase/get-organization-memberships-usecase";
import type { DeleteOrganizationMembershipInput } from "../contract/organization-membership/delete-organization-membership.contract";
import { DeleteOrganizationMembershipUseCase } from "@modules/organizations/application/usecase/delete-organization-membership-usecase";
import { MembershipGuard } from "@modules/organizations/domain/guard/membership.guard";
import { GetOrganizationMembershipUseCase } from "@modules/organizations/application/usecase/get-organization-membership-usecase";

@injectable()
export class OrganizationController extends BaseController {
  private router: Router;

  constructor(
    @inject(CreateOrganizationUseCase) private createOrganizationUseCase: CreateOrganizationUseCase,

    @inject(CreateOrganizationMembershipUseCase)
    private createOrganizationMembershipUseCase: CreateOrganizationMembershipUseCase,

    @inject(GetOrganizationMembershipsUseCase)
    private getOrganizationMembershipsUseCase: GetOrganizationMembershipsUseCase,

    @inject(GetOrganizationMembershipUseCase)
    private getOrganizationMembershipUseCase: GetOrganizationMembershipUseCase,

    @inject(DeleteOrganizationMembershipUseCase)
    private deleteOrganizationMembershipUseCase: DeleteOrganizationMembershipUseCase,

    @inject(MembershipGuard)
    private membershipGuard: MembershipGuard,
  ) {
    super();
    this.router = Router();
  }

  register(): Router {
    this.router.post("/", this.create);

    this.router.post("/:organizationId/memberships", this.createMembership);

    this.router.use("/:organizationId", this.checkAccess(["admin"]));

    this.router.get("/:organizationId/memberships", this.getMemberships);

    this.router.delete("/:organizationId/memberships/:membershipId", this.deleteMembership);

    return this.router;
  }

  checkAccess =
    (allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
      const membership = await this.getOrganizationMembershipUseCase.execute({
        organizationId: req.params.organizationId,
        userId: res.locals.user.id,
      });

      await this.membershipGuard.check(res.locals.user, {
        role: membership.getRole(),
        allowedRoles: allowedRoles,
      });

      next();
    };

  create = async (req: Request<unknown, unknown, CreateOrganizationInput>, res: Response) => {
    try {
      const organization = await this.createOrganizationUseCase.execute({
        ...req.body,
        userId: res.locals.user.id,
      });

      res.status(201).json(organization);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "error_creating_organization" });
    }
  };

  getMemberships = async (
    req: Request<{ organizationId: string }, unknown, unknown, Record<string, string>>,
    res: Response,
  ) => {
    try {
      const memberships = await this.getOrganizationMembershipsUseCase.execute({
        organizationId: req.params.organizationId,
        query: req.query,
      });

      res.status(200).json(memberships);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "error_getting_organization_memberships" });
    }
  };

  createMembership = async (
    req: Request<{ organizationId: string }, unknown, CreateOrganizationMembershipInput>,
    res: Response,
  ) => {
    try {
      const organizationMembership = await this.createOrganizationMembershipUseCase.execute({
        ...req.body,
        organizationId: req.params.organizationId,
      });

      res.status(201).json(organizationMembership);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "error_creating_organization_membership" });
    }
  };

  deleteMembership = async (req: Request<DeleteOrganizationMembershipInput>, res: Response) => {
    try {
      await this.deleteOrganizationMembershipUseCase.execute({
        membershipId: req.params.membershipId,
        organizationId: req.params.organizationId,
      });

      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "error_deleting_organization_membership" });
    }
  };
}
