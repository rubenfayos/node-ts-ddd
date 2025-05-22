import type { LoginInput } from "@modules/auth/infraestructure/http/contract/login";
import type { RegisterInput } from "@modules/auth/infraestructure/http/contract/register";
import HttpStatus from "@shared/common/enums/http-status";
import { BaseController } from "@shared/infraestructure/http/utils/base-controller";
import { type Request, type Response, Router } from "express";
import { inject, injectable } from "tsyringe";

import { ForgetPasswordUseCase } from "@modules/auth/application/usecase/forget-password-usecase";
import { LoginUserCase } from "@modules/auth/application/usecase/login-usercase";
import { RegisterUserCase } from "@modules/auth/application/usecase/register-usecase";
import { ResetPasswordUseCase } from "@modules/auth/application/usecase/reset-password-usecase";
import { VerifyEmailUseCase } from "@modules/auth/application/usecase/verify-email-usecase";
import type { ForgetPasswordInput, ResetPasswordInput } from "../contract/forget-password";
import type { VerifyEmailInput } from "../contract/verify-email";

@injectable()
export class AuthController extends BaseController {
  private router: Router;

  constructor(
    @inject(LoginUserCase) private loginUseCase: LoginUserCase,
    @inject(RegisterUserCase) private registerUseCase: RegisterUserCase,
    @inject(VerifyEmailUseCase) private verifyEmailUseCase: VerifyEmailUseCase,
    @inject(ForgetPasswordUseCase) private forgetPasswordUseCase: ForgetPasswordUseCase,
    @inject(ResetPasswordUseCase) private resetPasswordUseCase: ResetPasswordUseCase,
  ) {
    super();
    this.router = Router();
  }

  register(): Router {
    this.router.post("/login", this.login);
    this.router.post("/register", this.registerHandler);

    this.router.post("/forget-password", this.forgetPassword);
    this.router.post("/reset-password", this.resetPassword);

    this.router.post("/verify-email", this.verifyEmail);

    return this.router;
  }

  login = async (req: Request, res: Response) => {
    const payload = <LoginInput>req.body;

    const result = await this.loginUseCase.execute(payload);

    if (result.isFail()) {
      res.status(HttpStatus.BAD_REQUEST);
      res.json({
        error: result.error(),
      });

      return;
    }

    const response = result.value();

    res.status(HttpStatus.OK);
    res.json(response);
  };

  registerHandler = async (req: Request, res: Response) => {
    const payload = <RegisterInput>req.body;

    const result = await this.registerUseCase.execute(payload);

    if (result.isFail()) {
      res.status(HttpStatus.BAD_REQUEST);
      res.json({
        error: result.error(),
      });

      return;
    }

    const response = result.value();

    res.status(HttpStatus.CREATED);
    res.json(response);
  };

  forgetPassword = async (req: Request, res: Response) => {
    const payload = <ForgetPasswordInput>req.body;

    const result = await this.forgetPasswordUseCase.execute(payload);

    if (result.isFail()) {
      res.status(HttpStatus.BAD_REQUEST);
      res.json({
        error: result.error(),
      });

      return;
    }

    const response = result.value();

    res.status(HttpStatus.CREATED);
    res.json(response);
  };

  resetPassword = async (req: Request, res: Response) => {
    const payload = <ResetPasswordInput>req.body;

    const result = await this.resetPasswordUseCase.execute(payload);

    if (result.isFail()) {
      res.status(HttpStatus.BAD_REQUEST);
      res.json({
        error: result.error(),
      });

      return;
    }

    const response = result.value();

    res.status(HttpStatus.CREATED);
    res.json(response);
  };

  verifyEmail = async (req: Request, res: Response) => {
    const payload = <VerifyEmailInput>req.body;

    const result = await this.verifyEmailUseCase.execute(payload);

    if (result.isFail()) {
      res.status(HttpStatus.BAD_REQUEST);
      res.json({
        error: result.error(),
      });

      return;
    }

    const response = result.value();

    res.status(HttpStatus.CREATED);
    res.json(response);
  };
}
