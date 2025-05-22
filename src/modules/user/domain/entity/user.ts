import { Result } from "types-ddd";

import crypto from "node:crypto";
import type { CreateUserDTO } from "@modules/user/application/dto/create-user-dto";
import { AggregateRoot } from "@shared/domain/aggregate/aggregate-root";
import { CodeGenerator } from "@shared/security/code-generator-service";
import { UserCreated } from "../event/user-created";
import { UserForgotPasswordEvent } from "../event/user-forgot-password-event";
import { UserResetPasswordEvent } from "../event/user-reset-password-event";
import { UserValidated } from "../event/user-validated";

export type UserProps = {
  id: string;
  email: string;
  password: string;
  name?: string | null;
  phone?: string | null;
  verified: boolean;
  verifiedAt?: Date;
  verifyCode?: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  static create(props: UserProps): Result<User> {
    return Result.Ok(
      new User({
        ...props,
      }),
    );
  }

  static register(props: CreateUserDTO): Result<User> {
    const userData: UserProps = {
      id: crypto.randomUUID().toString(),
      email: props.email,
      password: props.password,
      phone: props.phone ?? null,
      verifyCode: CodeGenerator.generateAlphanumericCode(),
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = User.create(userData);

    if (result.isFail()) return Result.fail(result.error());

    const user = result.value();

    user.addEvent(new UserCreated(user.id.value(), props.email));
    return Result.Ok(user);
  }

  validateAccount() {
    this.props.verified = true;
    this.props.verifiedAt = new Date();
    this.props.verifyCode = undefined;

    this.addEvent(new UserValidated(this.id.value(), this.props.email));

    return this;
  }

  forgotPassword() {
    this.props.verifyCode = CodeGenerator.generateAlphanumericCode();

    this.addEvent(new UserForgotPasswordEvent(this.id.value(), this.props.email));

    return this;
  }

  resetPassword(password: string) {
    this.props.password = password;
    this.props.verifyCode = undefined;

    this.addEvent(new UserResetPasswordEvent(this.id.value(), this.props.email));

    return this;
  }

  toSafeObject() {
    return {
      id: this.id.value(),
      email: this.props.email,
      name: this.props.name,
      phone: this.props.phone,
      createdAt: this.props.createdAt.toISOString(),
      updatedAt: this.props.updatedAt.toISOString(),
      verified: this.props.verified,
      verifiedAt: this.props.verifiedAt?.toISOString(),
    };
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.props.email;
  }

  getPassword() {
    return this.props.password;
  }

  getName() {
    return this.props.name;
  }

  getPhone() {
    return this.props.phone;
  }

  getCreatedAt() {
    return this.props.createdAt;
  }

  getUpdatedAt() {
    return this.props.updatedAt;
  }

  getVerified() {
    return this.props.verified;
  }

  getVerifiedAt() {
    return this.props.verifiedAt;
  }

  getVerifyCode() {
    return this.props.verifyCode;
  }
}
