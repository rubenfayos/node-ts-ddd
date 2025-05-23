import path from "node:path";
// shared/template/TwigTemplateRenderer.ts
import type { TemplateRenderer } from "@shared/domain/template/template-renderer";
import { injectable } from "tsyringe";
import { renderFile } from "twig";

@injectable()
export class TwigTemplateRenderer implements TemplateRenderer {
  static readonly TEMPLATES_PATH = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "modules",
    "**",
    "infraestructure",
    "persistence",
    "mapper",
    "templates",
  );

  async render(templateName: string, variables: Record<string, unknown>): Promise<string> {
    const filePath = path.join(TwigTemplateRenderer.TEMPLATES_PATH, `${templateName}.twig`);
    return new Promise((resolve, reject) => {
      renderFile(filePath, variables, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
  }
}
