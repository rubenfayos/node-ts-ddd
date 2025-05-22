export function removeNulls<T>(obj: T, { stripNull = true }: { stripNull?: boolean } = {}): T {
  if (obj === null || obj === undefined) return undefined as any;

  if (Array.isArray(obj)) {
    return obj.map((item) => removeNulls(item, { stripNull })) as any;
  }

  if (typeof obj === "object" && obj !== null) {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = (obj as any)[key];
        newObj[key] = stripNull && value === null ? undefined : removeNulls(value, { stripNull });
      }
    }
    return newObj;
  }

  return obj;
}
