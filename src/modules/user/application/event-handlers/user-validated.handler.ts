import { NodemailerService } from "@modules/mail/infraestructure/services/node-mailer-service";
import { UserValidated } from "@modules/user/domain/event/user-validated";
import { TwigTemplateRenderer } from "@shared/application/service/twig-template-renderer";
import { SubscribeTo } from "@shared/domain/event/decorators";
import { EventHandler } from "@shared/domain/event/event-handler";
import { inject, injectable } from "tsyringe";

@injectable()
@SubscribeTo(UserValidated.EVENT_NAME)
export class UserValidatedHandler extends EventHandler<UserValidated> {
  constructor(
    @inject(TwigTemplateRenderer)
    private readonly templateRenderer: TwigTemplateRenderer,

    @inject(NodemailerService)
    private readonly mailerService: NodemailerService,
  ) {
    super();
  }

  async handle(event: UserValidated): Promise<void> {
    console.log(`Handling event for userId: ${event.relatedId}`);
    // Email logic, logging, metrics, etc.
  }
}
