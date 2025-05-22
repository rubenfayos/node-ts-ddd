import { PrismaClient } from "@prisma/client";
import { singleton } from "tsyringe";

@singleton()
export class PrismaService {
  public readonly client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }
}
