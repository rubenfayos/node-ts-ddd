import { CreateTicketUseCase } from "@modules/customer-service/application/usecase/create-ticket-usecase";
import { GetTicketsUseCase } from "@modules/customer-service/application/usecase/get-tickets-usecase";
import HttpStatus from "@shared/common/enums/http-status";
import { GlobalRoleGuard } from "@shared/domain/authorization/user-role-guard";
import { JwtMiddleware } from "@shared/infrastructure/http/middleware/jwt-middleware";
import { uploadMiddleware } from "@shared/infrastructure/http/middleware/multer";
import { BaseController } from "@shared/infrastructure/http/utils/base-controller";
import { type NextFunction, type Request, type Response, Router } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class CustomerServiceController extends BaseController {
  private router: Router;

  constructor(
    @inject(CreateTicketUseCase) private createTicketUseCase: CreateTicketUseCase,
    @inject(GetTicketsUseCase) private getTicketsUseCase: GetTicketsUseCase,
    @inject(JwtMiddleware) private jwtMiddleware: JwtMiddleware,
    @inject(GlobalRoleGuard) private globalRoleGuard: GlobalRoleGuard,
  ) {
    super();
    this.router = Router();
  }

  register(): Router {
    this.router.post("/tickets", uploadMiddleware.array("attachments"), this.createTicket);

    this.router.use("/", this.jwtMiddleware.handle, this.checkAccess);

    this.router.get("/tickets", this.getTickets);

    return this.router;
  }

  checkAccess = async (req: Request, res: Response, next: NextFunction) => {
    await this.globalRoleGuard.check(res.locals.user, ["ADMIN"]);

    next();
  };

  createTicket = async (req: Request, res: Response) => {
    try {
      const attachments = req.files as Express.Multer.File[];

      const result = await this.createTicketUseCase.execute({
        ...req.body,
        attachments,
      });

      res.status(HttpStatus.CREATED).end();
    } catch (err) {
      console.log(err);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while creating the ticket.",
      });
    }
  };

  getTickets = async (req: Request, res: Response) => {
    const result = await this.getTicketsUseCase.execute(req.query);

    res.status(HttpStatus.OK).json(result);
  };
}
