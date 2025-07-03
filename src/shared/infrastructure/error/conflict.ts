import { ApplicationError } from "./application";

export class ConflictError<
  TName extends string = "ConflictError",
  TMessage extends string = string,
  TDetails = unknown,
> extends ApplicationError<TName, TMessage, TDetails> {
  constructor(message = "Conflict" as TMessage, details?: TDetails) {
    super(message, details);
    this.name = "ConflictError" as TName;
  }
}
