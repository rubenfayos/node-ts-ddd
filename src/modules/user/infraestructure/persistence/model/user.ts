export class UserModel {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public name: string | null,
    public phone: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt?: Date,
  ) {}

  static create(props: Omit<UserModel, "id" | "createdAt" | "updatedAt">): UserModel {
    const id = crypto.randomUUID();
    return new UserModel(id, props.email, props.password, props.name, props.phone, new Date());
  }

  updateEmail(newEmail: string) {
    // Add business rules here
    this.email = newEmail;
  }

  updatePhone(phone: string | null) {
    this.phone = phone;
  }
}
