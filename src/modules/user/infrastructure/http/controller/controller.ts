import { UserGetUseCase } from "@modules/user/application/usecase/get";
import { UserGetAllUseCase } from "@modules/user/application/usecase/get-all";
import { UserMapper } from "@modules/user/infrastructure/persistence/mapper/user-mapper";
import HttpStatus from "@shared/common/enums/http-status";
import { BaseController } from "@shared/infrastructure/http/utils/base-controller";
import { type Request, type Response, Router } from "express";
import { inject, injectable } from "tsyringe";
import { type GetAllResponse, GetAllResponseSchema } from "../contract/api";

@injectable()
export class UserController extends BaseController {
  private router: Router;

  constructor(
    @inject(UserGetUseCase) private userGetUseCase: UserGetUseCase,
    @inject(UserGetAllUseCase) private userGetAllUseCase: UserGetAllUseCase,
  ) {
    super();
    this.router = Router();
  }

  register(): Router {
    this.router.get("/", this.getAll);

    this.router.get("/me", this.getMe);

    // Middleware to preload user by ID
    // this.router.use("/:userId", this.preloadUser);

    return this.router;
  }

  // preloadUser = async (req: Request, res: Response, next: NextFunction) => {
  //   const userId = req.params.userId;

  //   if (!userId) return next();

  //   try {
  //     const user = await this.userGetUseCase.execute(userId);

  //     if(user.isFail()) return res.status(HttpStatus.NOT_FOUND).json({
  //       error: user.error(),
  //     });

  //     next();
  //   } catch (err) {
  //     return res.status(HttpStatus.NOT_FOUND).json({
  //       error: "User not found",
  //     });
  //   }
  // };

  getAll = async (req: Request, res: Response) => {
    const users = await this.userGetAllUseCase.execute();

    const response = {
      users: users.map(UserMapper.toResponseDTO),
    };

    res.status(HttpStatus.OK);
    res.json(this.generateResponse<GetAllResponse>(GetAllResponseSchema, response));
  };

  getMe = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await this.userGetUseCase.execute(res.locals.user.id);

      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while retrieving the user.",
      });
    }
  };
}
