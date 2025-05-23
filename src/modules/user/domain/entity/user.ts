import crypto from "node:crypto";
import type { CreateUserDTO } from "@modules/user/application/dto/create-user-dto";
import { CodeGenerator } from "@shared/security/code-generator-service";
import { UserCreated } from "../event/user-created";
import { UserForgotPasswordEvent } from "../event/user-forgot-password-event";
import { UserResetPasswordEvent } from "../event/user-reset-password-event";
import { UserValidated } from "../event/user-validated";
import {AggregateRoot} from "@core/domain/aggregate/aggregate-root";

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
  roles: string[];
};

export class User extends AggregateRoot {
  private id: string;
  private email: string;
  private password: string;
  private name?: string | null;
  private phone?: string | null;
  private verified: boolean;
  private verifiedAt?: Date;
  private verifyCode?: string;
  private createdAt: Date;
  private updatedAt: Date;
  private roles: string[];

  private constructor(props: UserProps) {
    super();
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.name = props.name;
    this.phone = props.phone;
    this.verified = props.verified;
    this.verifiedAt = props.verifiedAt;
    this.verifyCode = props.verifyCode;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.roles = props.roles;
  }

  static create(props: UserProps): User {
    return new User({
      ...props,
    });
  }

  static register(props: CreateUserDTO): User {
    const userData: UserProps = {
      id: crypto.randomUUID().toString(),
      email: props.email,
      password: props.password,
      phone: props.phone ?? null,
      verifyCode: CodeGenerator.generateAlphanumericCode(),
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [],
    };

    const user = User.create(userData);

    user.registerEvent(UserCreated.create(user.id));
    return user;
  }

  validateAccount() {
    this.verified = true;
    this.verifiedAt = new Date();
    this.verifyCode = undefined;

    this.registerEvent(UserValidated.create(this.id));

    return this;
  }

  forgotPassword() {
    this.verifyCode = CodeGenerator.generateAlphanumericCode();

    this.registerEvent(UserForgotPasswordEvent.create(this.id));

    return this;
  }

  resetPassword(password: string) {
    this.password = password;
    this.verifyCode = undefined;

    this.registerEvent(new UserResetPasswordEvent(this.id));

    return this;
  }

  toSafeObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      phone: this.phone,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      verified: this.verified,
      verifiedAt: this.verifiedAt?.toISOString(),
    };
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getName() {
    return this.name;
  }

  getPhone() {
    return this.phone;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getVerified() {
    return this.verified;
  }

  getVerifiedAt() {
    return this.verifiedAt;
  }

  getVerifyCode() {
    return this.verifyCode;
  }

  getRoles() {
    return this.roles;
  }
}
