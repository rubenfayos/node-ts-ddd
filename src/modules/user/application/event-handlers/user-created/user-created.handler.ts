import { EventHandler } from "@core/domain/event/event-handler";
import { NodemailerService } from "@modules/mail/infrastructure/services/node-mailer-service";
import { UserCreated } from "@modules/user/domain/event/user-created";
import { UserReadRepository } from "@modules/user/infrastructure/persistence/repository/read";
import { TwigTemplateRenderer } from "@shared/application/service/twig-template-renderer";
import { SubscribeTo } from "@shared/domain/event/decorators";
import { inject, injectable } from "tsyringe";

@injectable()
@SubscribeTo(UserCreated.EVENT_NAME)
export class UserCreatedHandler extends EventHandler<UserCreated> {
  constructor(
    @inject(TwigTemplateRenderer)
    private readonly templateRenderer: TwigTemplateRenderer,

    @inject(NodemailerService)
    private readonly mailerService: NodemailerService,

    @inject(UserReadRepository)
    private readonly userReadRepository: UserReadRepository,
  ) {
    super();
  }

  async handle(event: UserCreated): Promise<void> {
    const user = await this.userReadRepository.getByUserId(event.relatedId);

    if (!user) {
      return;
    }

    const template = await this.templateRenderer.render("emails/welcome", {
      user_name: user.getName(),
      app_name: "MyApp",
      year: new Date().getFullYear(),
    });

    await this.mailerService.sendMail({
      to: user.getEmail(),
      subject: "Welcome to MyApp",
      body: template,
    });
  }
}
