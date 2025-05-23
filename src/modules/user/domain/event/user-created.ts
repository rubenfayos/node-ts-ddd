import { User } from "@modules/user/domain/entity/user";
import { DomainEvent } from "@shared/domain/event/domain-event";

export class UserCreated extends DomainEvent {
  static readonly EVENT_NAME = "user.created";
  version = 0;

  // static readonly NAME = "core.user_created";
  // $names = UserCreated.NAME;
  // $version = 0;

  // constructor(
  //   @inject(TwigTemplateRenderer)
  //   private readonly templateRenderer: TwigTemplateRenderer,

  //   @inject(NodemailerService)
  //   private readonly mailerService: NodemailerService,

  //   userId: string,
  //   public readonly email: string,
  // ) {
  //   super();
  // }

  public static create(userId: string): UserCreated {
    return new UserCreated(userId);
  }

  public getRelatedFQN(): string {
    return User.name;
  }

  public getName(): string {
    return UserCreated.EVENT_NAME;
  }
}
