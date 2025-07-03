import { EventHandler } from "@core/domain/event/event-handler";
import { NodemailerService } from "@modules/mail/infrastructure/services/node-mailer-service";
import { UserResetPasswordEvent } from "@modules/user/domain/event/user-reset-password-event";
import { TwigTemplateRenderer } from "@shared/application/service/twig-template-renderer";
import { SubscribeTo } from "@shared/domain/event/decorators";
import { inject, injectable } from "tsyringe";

@injectable()
@SubscribeTo(UserResetPasswordEvent.EVENT_NAME)
export class UserResetPasswordHandler extends EventHandler<UserResetPasswordEvent> {
  constructor(
    @inject(TwigTemplateRenderer)
    private readonly templateRenderer: TwigTemplateRenderer,

    @inject(NodemailerService)
    private readonly mailerService: NodemailerService,
  ) {
    super();
  }

  async handle(event: UserResetPasswordEvent): Promise<void> {
    console.log(`Handling event for userId: ${event.relatedId}`);
    // Email logic, logging, metrics, etc.
  }
}
