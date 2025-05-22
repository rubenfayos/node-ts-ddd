import type { CreateUserDTO } from "@modules/user/application/dto/create-user-dto";
import { UserCreateUseCase } from "@modules/user/application/usecase/create";
import { UserGetUseCase } from "@modules/user/application/usecase/get";
import { UserGetAllUseCase } from "@modules/user/application/usecase/get-all";
import { UserMapper } from "@modules/user/infraestructure/persistence/mapper/user-mapper";
import HttpStatus from "@shared/common/enums/http-status";
import { BaseController } from "@shared/infraestructure/http/utils/base-controller";
import { NextFunction, type Request, RequestHandler, type Response, Router } from "express";
import { inject, injectable } from "tsyringe";
import { type GetAllResponse, GetAllResponseSchema } from "../contract/api";

@injectable()
export class UserController extends BaseController {
  private router: Router;

  constructor(
    @inject(UserCreateUseCase) private userCreateUseCase: UserCreateUseCase,
    @inject(UserGetUseCase) private userGetUseCase: UserGetUseCase,
    @inject(UserGetAllUseCase) private userGetAllUseCase: UserGetAllUseCase,
  ) {
    super();
    this.router = Router();
  }

  register(): Router {
    this.router.get("/", this.getAll);

    this.router.get("/me", this.get);

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

  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.userGetUseCase.execute(res.locals.user.id);

      if (result.isFail()) {
        return res.status(HttpStatus.NOT_FOUND).json({ error: result.error() });
      }

      const user = result.value();
      const dto = UserMapper.toResponseDTO(user);

      return res.status(HttpStatus.OK).json(dto);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while retrieving the user.",
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const payload = <CreateUserDTO>req.body;
      const useCase = await this.userCreateUseCase.execute(payload);

      if (useCase.isFail()) {
        console.log(useCase.error());

        res.status(HttpStatus.BAD_REQUEST);
        res.json({
          error: useCase.error(),
        });

        return;
      }

      const user = useCase.value();
      const dto = UserMapper.toResponseDTO(user);

      res.status(HttpStatus.CREATED);
      res.json({
        user: dto,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST);
      res.json({
        error: "An error occurred while creating the user.",
      });
    }
  };
}
