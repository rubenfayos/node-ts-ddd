import { NodemailerService } from "@modules/mail/infraestructure/services/node-mailer-service";
import { UserCreated } from "@modules/user/domain/event/user-created";
import { TwigTemplateRenderer } from "@shared/application/service/twig-template-renderer";
import { SubscribeTo } from "@shared/domain/event/decorators";
import { EventHandler } from "@shared/domain/event/event-handler";
import { inject, injectable } from "tsyringe";

@injectable()
@SubscribeTo(UserCreated.EVENT_NAME)
export class UserCreatedHandler extends EventHandler<UserCreated> {
  constructor(
    @inject(TwigTemplateRenderer)
    private readonly templateRenderer: TwigTemplateRenderer,

    @inject(NodemailerService)
    private readonly mailerService: NodemailerService,
  ) {
    super();
  }

  async handle(event: UserCreated): Promise<void> {
    console.log(`Handling event for userId: ${event.relatedId}`);
    // Email logic, logging, metrics, etc.
  }
}
