import bcrypt from "bcrypt";

export class PasswordService {
  public hash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * Compares the given password with the hash
   * @param {string} password Plain text password
   * @param {string} hash Hashed password
   * @returns
   */
  public compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
