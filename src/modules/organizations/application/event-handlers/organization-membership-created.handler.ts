import { EventHandler } from "@core/domain/event/event-handler";
import { NodemailerService } from "@modules/mail/infrastructure/services/node-mailer-service";
import type { OrganizationMembershipCreated } from "@modules/organizations/domain/event/organization-memberhip/organization-membership-created.event";
import { UserForgotPasswordEvent } from "@modules/user/domain/event/user-forgot-password-event";
import { TwigTemplateRenderer } from "@shared/application/service/twig-template-renderer";
import { SubscribeTo } from "@shared/domain/event/decorators";
import { inject, injectable } from "tsyringe";

@injectable()
@SubscribeTo(UserForgotPasswordEvent.EVENT_NAME)
export class OrganizationMembershipCreatedHandler extends EventHandler<OrganizationMembershipCreated> {
  constructor(
    @inject(TwigTemplateRenderer)
    private readonly templateRenderer: TwigTemplateRenderer,

    @inject(NodemailerService)
    private readonly mailerService: NodemailerService,
  ) {
    super();
  }

  async handle(event: OrganizationMembershipCreated): Promise<void> {
    console.log(`Handling event for organizationId: ${event.relatedId}`);
    // Email logic, logging, metrics, etc.
  }
}
