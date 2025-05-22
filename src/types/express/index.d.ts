declare global {
  namespace Express {
    interface Locals {
      user: {
        id: string;
        role?: string;
        [key: string]: any;
      };
    }
  }
}

export {};
