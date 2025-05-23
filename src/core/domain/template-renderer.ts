export interface TemplateRenderer {
  render(templateName: string, variables: Record<string, unknown>): Promise<string>;
}
