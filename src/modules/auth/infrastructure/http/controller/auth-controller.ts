import type { LoginInput } from "@modules/auth/infrastructure/http/contract/login";
import type { RegisterInput } from "@modules/auth/infrastructure/http/contract/register";
import HttpStatus from "@shared/common/enums/http-status";
import { BaseController } from "@shared/infrastructure/http/utils/base-controller";
import { type Request, type Response, Router } from "express";
import { inject, injectable } from "tsyringe";

import { ForgotPasswordUseCase } from "@modules/auth/application/usecase/forgot-password-usecase";
import { LoginUserCase } from "@modules/auth/application/usecase/login-usercase";
import { RegisterUserCase } from "@modules/auth/application/usecase/register-usecase";
import { ResetPasswordUseCase } from "@modules/auth/application/usecase/reset-password-usecase";
import { VerifyEmailUseCase } from "@modules/auth/application/usecase/verify-email-usecase";
import type { ForgotPasswordInput, ResetPasswordInput } from "../contract/forgot-password";
import type { VerifyEmailInput } from "../contract/verify-email";

@injectable()
export class AuthController extends BaseController {
  private router: Router;

  constructor(
    @inject(LoginUserCase) private loginUseCase: LoginUserCase,
    @inject(RegisterUserCase) private registerUseCase: RegisterUserCase,
    @inject(VerifyEmailUseCase) private verifyEmailUseCase: VerifyEmailUseCase,
    @inject(ForgotPasswordUseCase) private forgotPasswordUseCase: ForgotPasswordUseCase,
    @inject(ResetPasswordUseCase) private resetPasswordUseCase: ResetPasswordUseCase,
  ) {
    super();
    this.router = Router();
  }

  register(): Router {
    this.router.post("/login", this.login);
    this.router.post("/register", this.registerHandler);

    this.router.post("/forgot-password", this.forgetPassword);
    this.router.post("/reset-password", this.resetPassword);

    this.router.post("/verify-email", this.verifyEmail);

    return this.router;
  }

  login = async (req: Request, res: Response) => {
    const payload = <LoginInput>req.body;

    const result = await this.loginUseCase.execute(payload);

    // if (result.isFail()) {
    //   res.status(HttpStatus.BAD_REQUEST);
    //   res.json({
    //     error: result.error(),
    //   });

    //   return;
    // }

    res.status(HttpStatus.OK);
    res.json(result);
  };

  registerHandler = async (req: Request, res: Response) => {
    const payload = <RegisterInput>req.body;

    const result = await this.registerUseCase.execute(payload);

    // if (result.isFail()) {
    //   res.status(HttpStatus.BAD_REQUEST);
    //   res.json({
    //     error: result.error(),
    //   });

    //   return;
    // }

    res.status(HttpStatus.CREATED);
    res.json(result);
  };

  forgetPassword = async (req: Request, res: Response) => {
    const payload = <ForgotPasswordInput>req.body;

    const result = await this.forgotPasswordUseCase.execute(payload);

    // if (result.isFail()) {
    //   res.status(HttpStatus.BAD_REQUEST);
    //   res.json({
    //     error: result.error(),
    //   });

    //   return;
    // }

    res.status(HttpStatus.NO_CONTENT);
    res.json(result);
  };

  resetPassword = async (req: Request, res: Response) => {
    const payload = <ResetPasswordInput>req.body;

    const result = await this.resetPasswordUseCase.execute(payload);

    res.status(HttpStatus.OK);
    res.json(result);
  };

  verifyEmail = async (req: Request, res: Response) => {
    const payload = <VerifyEmailInput>req.body;

    const result = await this.verifyEmailUseCase.execute(payload);

    res.status(HttpStatus.OK);
    res.json(result);
  };
}
