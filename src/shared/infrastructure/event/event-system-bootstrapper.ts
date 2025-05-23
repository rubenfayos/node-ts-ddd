// src/shared/infrastructure/event/event-system-bootstrapper.ts
import path from "node:path";
import fg from "fast-glob";

export async function bootstrapEventSystem(): Promise<void> {
  const baseDir = path.resolve(__dirname, path.join("..", "..", "..", "modules"));

  const handlerPaths = await fg(`${baseDir}/**/application/event-handlers/**/*.ts`);

  for (const handlerPath of handlerPaths) {
    await import(handlerPath); // 👈 triggers decorators
  }
}
