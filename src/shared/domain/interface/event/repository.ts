import type { Event } from "@shared/domain/event/event";
import type { Result } from "types-ddd";

export interface IEventWriteRepository {
  create(event: Event): Promise<Result<Event>>;
}
